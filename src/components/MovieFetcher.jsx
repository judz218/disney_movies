//disneyList.jsのときに使った

import { useEffect, useState } from 'react';
import { DISNEY_MOVIES } from '../data/disneyList';
import { MoviesScore } from './MovieScorer';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieFetcher({ setData, language }) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        (async () => {
            const m = [];

            for (const movie of DISNEY_MOVIES) {
                try {
                    const detailEnRes = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
                    );
                    const detailRes = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=${language === "ja" ? "ja" : "en-US"}`
                    );
                    const keywordRes = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=${API_KEY}`
                    );

                    const detailEn = await detailEnRes.json();
                    const detail = await detailRes.json();
                    const keywordData = await keywordRes.json();
                    const keywords = (keywordData.keywords || []).map(k => k.name.toLowerCase());
                    const score = MoviesScore(detailEn, keywords);

                    const scored = {
                        id: detail.id,
                        title: detail.title,
                        overview: detail.overview,
                        genres: detail.genres.map(g => g.name.toLowerCase()),
                        posterThumb: `https://image.tmdb.org/t/p/w200${detail.poster_path}`,
                        poster: `https://image.tmdb.org/t/p/w500${detail.poster_path}`,
                        popularity: detail.popularity,
                        score: score
                    };

                    m.push(scored);
                } catch (e) {
                    console.error(`Error fetching movie ID ${movie.id}:`, e);
                }
            }

            setData(m);
            setMovies(m);
        })();

    }, [setData, language]);

    return null;
}
