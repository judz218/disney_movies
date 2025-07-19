import { useEffect, useState } from 'react';
import { DISNEY_MOVIES } from '../data/disneyList';
import { MoviesScore } from './MovieScorer';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieFetcher({ setData }) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        (async () => {
            const m = [];

            for (const movie of DISNEY_MOVIES) {
                try {
                    const detailRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
                    const keywordRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=${API_KEY}`);

                    const detail = await detailRes.json();
                    const keywordData = await keywordRes.json();
                    const keywords = (keywordData.keywords || []).map(k => k.name.toLowerCase());

                    const scored = {
                        id: detail.id,
                        title: detail.title,
                        overview: detail.overview,
                        genres: detail.genres.map(g => g.name.toLowerCase()),
                        poster: `https://image.tmdb.org/t/p/w200${detail.poster_path}`,
                        popularity: detail.popularity,
                        score: MoviesScore(detail, keywords)
                    };

                    m.push(scored);
                } catch (e) {
                    console.error(`Error fetching movie ID ${movie.id}:`, e);
                }
            }

            setData(m);
            setMovies(m);
        })();

    }, [setData]);

    return null;
}
