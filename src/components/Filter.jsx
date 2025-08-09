export default function CompanyFilter({ filterCompany, setFilterCompany }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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