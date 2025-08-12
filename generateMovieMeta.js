import fs from "fs";
import fetch from "node-fetch";
import { csvParse } from "d3-dsv";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_TMDB_API_KEY;
const INPUT_CSV_PATH = "./public/disney_plus_titles.csv";
const OUTPUT_JSON_PATH = "./public/movie_text.json";

// CSVを読み込む
const rawCsv = fs.readFileSync(INPUT_CSV_PATH, "utf-8");
const rows = csvParse(rawCsv);

// 映画だけに絞る
const movies = rows.filter(
  (d) => d.type === "Movie" && d.title && d.release_year
);

// 検索して TMDB ID, popularity, companies を取得
const results = [];
for (const movie of movies) {
  const { title, release_year } = movie;
  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        title
      )}&year=${release_year}`
    );
    const searchJson = await searchRes.json();
    const tmdbMovie = searchJson.results?.[0];
    if (!tmdbMovie) continue;

    // const detailRes = await fetch(
    //   `https://api.themoviedb.org/3/movie/${tmdbMovie.id}?api_key=${API_KEY}&language=en-US`
    // );
    // const detail = await detailRes.json();

    // 日本語データ取得（overview など）
    const jaRes = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}?api_key=${API_KEY}&language=ja`
    );
    const detailJa = await jaRes.json();

    // popularityが1未満の場合はスキップ
    if (!detailJa || detailJa.popularity < 1) continue;

    // 英語データ取得（title_en, poster 用）
    const enRes = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}?api_key=${API_KEY}&language=en-US`
    );
    const detailEn = await enRes.json();
    const keywordRes = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/keywords?api_key=${API_KEY}&language=en-US`
    );
    const keywords = await keywordRes.json();

    const videoRes = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/videos?api_key=${API_KEY}&language=ja`
    );
    const v = await videoRes.json();
    const video = v.results.filter((v) => v.type === "Trailer");

    results.push({
      id: tmdbMovie.id,
      release_year,
      titleEn: detailEn.title,
      titleJa: detailJa.title,
      genresEn: detailEn.genres.map((g) => g.name.toLowerCase()),
      genresJa: detailJa.genres.map((g) => g.name.toLowerCase()),
      overviewEn: detailEn.overview,
      overviewJa: detailJa.overview,
      keywordsEn: keywords.keywords.map((g) => g.name),
      popularity: detailJa.popularity,
      companies: detailEn.production_companies.map((g) => g.name),
      posterThumb: `https://image.tmdb.org/t/p/w200${detailJa.poster_path}`,
      posterEn: `https://image.tmdb.org/t/p/w500${detailEn.poster_path}`,
      posterJa: `https://image.tmdb.org/t/p/w500${detailJa.poster_path}`,
      runtime: detailJa.runtime,
      video: video[0] ? `https://www.youtube.com/watch?v=${video[0].key}` : "",

      // popularity: detail.popularity,
      // companies: (detail.production_companies || []).map((c) => c.name),
    });

    console.log(`ok ${title} (${release_year})`);
  } catch (err) {
    console.error(`ng ${title} (${release_year})`, err);
  }
}

// JSONとして保存
fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(results, null, 2), "utf-8");
console.log(`完了: ${results.length} 件を保存しました → ${OUTPUT_JSON_PATH}`);
