import { useEffect } from "react";
import { MoviesScore } from "./MovieScorer";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


export default function MovieFetcherFromList({ movieList, setData, setIsLoading }) {
    useEffect(() => {
        if (!movieList) return;

        setIsLoading(true);

        (async () => {
            const result = await Promise.all(
                movieList.map(async (movie) => {
                    try {
                        // const searchRes = await fetch(
                        //     `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
                        // );
                        // const jsonData = await searchRes.json();
                        // const tmdbMovie = searchJson.results?.[0];
                        // if (!tmdbMovie) return null;

                        // 日本語データ取得（overview など）
                        const jaRes = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=ja`
                        );
                        const jaDetail = await jaRes.json();

                        if (!jaDetail.popularity || isNaN(jaDetail.popularity)) return null;

                        // 英語データ取得（title_en, poster 用）
                        const enRes = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
                        );
                        const enDetail = await enRes.json();

                        // キーワード取得（スコア用）
                        // const keywordRes = await fetch(
                        //     `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/keywords?api_key=${API_KEY}`
                        // );
                        // const keywordData = await keywordRes.json();
                        // const keywords = (keywordData.keywords || []).map(k => k.name.toLowerCase());

                        // const score = MoviesScore(enDetail, keywords); // スコアは英語ベース

                        return {
                            id: movie.id,
                            title: jaDetail.title,
                            title_en: enDetail.title,
                            overview: jaDetail.overview,
                            popularity: jaDetail.popularity,
                            genres: jaDetail.genres.map(g => g.name.toLowerCase()),
                            runtime: jaDetail.runtime,
                            release_date: jaDetail.release_date,
                            homepage: jaDetail.homepage,
                            posterThumb: `https://image.tmdb.org/t/p/w200${jaDetail.poster_path}`,
                            poster_en: `https://image.tmdb.org/t/p/w500${enDetail.poster_path}`,
                            poster_ja: `https://image.tmdb.org/t/p/w500${jaDetail.poster_path}`,
                            companies: jaDetail.production_companies,
                            // release_year: movie.release_year,
                            // score,
                            x: movie.x,
                            y: movie.y,
                        };
                    } catch (e) {
                        console.error("Error fetching TMDB info", e);
                        return null;
                    }
                })
            );
            setData(result);
            setIsLoading(false);
        })();
    }, [movieList]);

    return null;
}
