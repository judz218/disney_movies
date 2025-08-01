// src/components/Header.jsx

export default function Header() {
    return (
        <div style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* ロゴエリア */}
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* メインタイトル */}
                <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#333", margin: 0 }}>
                    しんぷる映画選び
                </h1>
                {/* サブタイトル */}
                <p style={{ marginLeft: "1rem", fontSize: "1rem", color: "#666", margin: 0, paddingLeft: "1rem" }}>
                    - ディズニー映画 -
                </p>
            </div>
            {/* ナビゲーションや他の要素をここに追加できます */}
        </div>
    );
}