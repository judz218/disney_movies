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

export default function MovieListFromMeta({ movieMeta, filterCompany, setMovieList, setSelectedMovie }) {
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


        setMovieList(filtered);
    }, [movieMeta, filterCompany]);

    return null;
}
