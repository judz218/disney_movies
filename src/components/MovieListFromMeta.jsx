import { useEffect } from "react";
import movieMeta from "../../public/movie_meta.json";

// shuffle を先に定義する
function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// 会社分類関数
function classifyCompany(companies) {
    if (!companies || companies.length === 0) return "その他";
    const joined = companies.join(" ").toLowerCase();
    if (joined.includes("pixar")) return "ピクサー";
    if (joined.includes("marvel")) return "マーベル";
    if (joined.includes("disney")) return "ディズニー";
    return "その他";
}

export default function MovieListFromMeta({ filterMethod, filterCompany, setMovieList }) {
    useEffect(() => {
        let filtered = [...movieMeta];

        // カテゴリ付与
        filtered.forEach(m => {
            m.category = classifyCompany(m.companies);
        });

        if (filterCompany !== "all") {
            filtered = filtered.filter(d => d.category === filterCompany);
        }

        if (filterMethod === "popular") {
            filtered = filtered.sort((a, b) => b.popularity - a.popularity).slice(0, 30);
        } else if (filterMethod === "random") {
            filtered = shuffle(filtered).slice(0, 30);
        }

        setMovieList(filtered);
    }, [filterMethod, filterCompany]);

    return null;
}
