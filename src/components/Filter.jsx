export default function CompanyFilter({ filterCompany, setFilterCompany, filterMethod, setFilterMethod }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* 抽出方法のセレクトボックス */}
            <label>
                抽出方法：
                <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)}>
                    <option value="random">ランダム30本</option>
                    <option value="popular">人気順30本</option>
                </select>
            </label>
            {/* 制作会社のセレクトボックス */}
            <label>
                制作会社：
                <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
                    <option value="all">すべて</option>
                    <option value="ディズニー">ディズニー</option>
                    <option value="ピクサー">ピクサー</option>
                    <option value="マーベル">マーベル</option>
                    <option value="その他">その他</option>
                </select>
            </label>
        </div>
    );
}