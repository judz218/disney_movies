export function MoviesScore(movie, keywords) {
    const overview = movie.overview.toLowerCase();
    const genres = movie.genres;

    let x = 0; // ロマンス（-）⇔ ファミリー（+）
    let y = 0; // 泣ける（-）⇔ 笑える（+）

    // === X軸（ロマンス⇔ファミリー） ===
    if (genres.includes("romance")) x -= 2;
    if (keywords.includes("love")) x -= 1;
    if (keywords.includes("kiss")) x -= 1;
    if (keywords.includes("couple")) x -= 1;

    if (keywords.includes("family")) x += 2;
    if (keywords.includes("sibling") || keywords.includes("siblings")) x += 1;
    if (keywords.includes("friendship")) x += 1;
    if (overview.includes("sister") || overview.includes("brother") || overview.includes("parents")) x += 1;

    // === Y軸（泣ける⇔笑える） ===
    if (genres.includes("drama")) y -= 1;
    if (keywords.includes("death") || keywords.includes("loss") || keywords.includes("grief")) y -= 2;
    if (overview.includes("emotional") || overview.includes("touching") || overview.includes("heart")) y -= 1;

    if (genres.includes("comedy")) y += 1;
    if (overview.includes("funny") || overview.includes("laugh") || overview.includes("joke")) y += 1;

    return { x, y };
}
