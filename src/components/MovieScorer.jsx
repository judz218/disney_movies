export function MoviesScore(movie, keywords) {
    const overview = movie.overview.toLowerCase();
    const genres = movie.genres;
    const text = overview + " " + keywords.join(" ");

    let x = 0; // ロマンス（-）⇔ ファミリー（+）
    let y = 0; // 泣ける（-）⇔ 笑える（+）

    // === X軸（ロマンス⇔ファミリー） ===
    if (genres.includes("romance")) x -= 2;
    if (text.includes("love") || text.includes("couple") || text.includes("kiss")) x -= 1;
    if (text.includes("heartwarming") || text.includes("relationship")) x -= 1;

    if (genres.includes("family")) x += 2;
    if (text.includes("family") || text.includes("parents") || text.includes("siblings") || text.includes("sister") || text.includes("brother")) x += 1;
    if (text.includes("friendship") || text.includes("bond")) x += 1;

    // === Y軸（泣ける⇔笑える） ===
    if (genres.includes("drama")) y -= 1;
    if (text.includes("death") || text.includes("loss") || text.includes("grief") || text.includes("sacrifice")) y -= 2;
    if (text.includes("emotional") || text.includes("touching") || text.includes("heart")) y -= 1;

    if (genres.includes("comedy")) y += 2;
    if (text.includes("funny") || text.includes("laugh") || text.includes("joke") || text.includes("humor")) y += 1;
    if (text.includes("silly") || text.includes("hilarious") || text.includes("ridiculous")) y += 1;

    // === 最小スコア保証（中心に密集しすぎないように） ===
    if (x === 0) x = text.includes("romance") ? -1 : text.includes("family") ? 1 : 0;
    if (y === 0) y = text.includes("cry") ? -1 : text.includes("funny") ? 1 : 0;

    return { x, y };
}
