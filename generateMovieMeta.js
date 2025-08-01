import fs from "fs";
import fetch from "node-fetch";
import { csvParse } from "d3-dsv";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_TMDB_API_KEY;
const INPUT_CSV_PATH = "./public/disney_plus_titles.csv";
const OUTPUT_JSON_PATH = "./src/data/movie_meta.json";

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

    const detailRes = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}?api_key=${API_KEY}&language=en-US`
    );
    const detail = await detailRes.json();

    // popularityが1未満の場合はスキップ
    if (!detail || detail.popularity < 1) continue;

    results.push({
      title,
      release_year,
      id: detail.id,
      popularity: detail.popularity,
      companies: (detail.production_companies || []).map((c) => c.name),
    });

    console.log(`ok ${title} (${release_year})`);
  } catch (err) {
    console.error(`ng ${title} (${release_year})`, err);
  }
}

// JSONとして保存
fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(results, null, 2), "utf-8");
console.log(`完了: ${results.length} 件を保存しました → ${OUTPUT_JSON_PATH}`);
