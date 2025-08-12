import { useEffect } from "react";

// 会社分類関数
function classifyCompany(companies) {
    if (!companies || companies.length === 0) return "その他";
    const joined = companies.join(" ").toLowerCase();
    if (joined.includes("pixar")) return "ピクサー";
    if (joined.includes("marvel")) return "マーベル";
    if (joined.includes("disney")) return "ディズニー";
    return "その他";
}

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function MovieListFromMeta({ movieMeta, filterCompany, setMovieList, setSelectedMovie }) {
    const num = 50;

    useEffect(() => {
        setSelectedMovie(null);


        let filtered = [...movieMeta];

        // カテゴリ付与
        filtered.forEach(m => {
            m.category = classifyCompany(m.companies);
        });

        if (filterCompany !== "all") {
            filtered = filtered.filter(d => d.category === filterCompany);
        }

        filtered = shuffle(filtered).slice(0, num);

        setMovieList(filtered);
    }, [movieMeta, filterCompany]);

    return null;
}
