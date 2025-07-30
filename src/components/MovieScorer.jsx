export function MoviesScore(movie) {
    // 映画の概要、タグライン、ジャンル、キーワードを取得
    const overview = movie.overview ? movie.overview.toLowerCase() : "";
    const tagline = movie.tagline ? movie.tagline.toLowerCase() : "";
    const genres = movie.genres ? movie.genres.map(genre => genre.name.toLowerCase()) : []; // ジャンル名を小文字で取得

    // TMDBのキーワードは movie.keywords.keywords 配列にあると仮定
    const tmdbKeywords = movie.keywords && movie.keywords.keywords
        ? movie.keywords.keywords.map(kw => kw.name.toLowerCase())
        : [];

    // スコア計算に使用するテキストを結合
    const text = `${overview} ${tagline} ${tmdbKeywords.join(" ")}`;

    let x = 0; // ロマンス（-）⇔ ファミリー・友情愛（+）
    let y = 0; // 泣ける（-）⇔ 笑える（+）

    // --- X軸（ロマンス ⇔ ファミリー・友情愛） ---

    // ロマンス関連の重み付け
    if (genres.includes("romance")) x -= 3;
    if (text.includes("love story") || text.includes("romantic relationship")) x -= 2.5;
    if (text.includes("couple") || text.includes("kiss") || text.includes("date") || text.includes("heartbreak")) x -= 1.5;
    if (text.includes("passion") || text.includes("lover") || text.includes("affair")) x -= 1;
    if (tmdbKeywords.some(kw => ["romance", "love", "heartbreak"].includes(kw))) x -= 1.5;

    // ファミリー・友情愛関連の重み付け
    if (genres.includes("family")) x += 3;
    if (genres.includes("animation")) x += 1; // アニメーションは家族向けが多い傾向
    if (text.includes("family bond") || text.includes("parent-child") || text.includes("sibling")) x += 2.5;
    if (text.includes("friendship") || text.includes("best friend") || text.includes("community") || text.includes("together")) x += 2;
    if (text.includes("teamwork") || text.includes("adventure group")) x += 1;
    if (tmdbKeywords.some(kw => ["family", "friendship", "siblings", "teamwork"].includes(kw))) x += 1.5;


    // --- Y軸（泣ける ⇔ 笑える） ---

    // 泣ける関連の重み付け
    if (genres.includes("drama")) y -= 2.5;
    if (genres.includes("tragedy") || genres.includes("sadness")) y -= 3; // 仮にこれらのジャンルがあるとすれば高い
    if (text.includes("death") || text.includes("loss") || text.includes("grief") || text.includes("sacrifice") || text.includes("farewell")) y -= 3;
    if (text.includes("emotional journey") || text.includes("tears") || text.includes("moving story") || text.includes("heartbreaking")) y -= 2;
    if (text.includes("struggle") || text.includes("pain") || text.includes("suffering")) y -= 1.5;
    if (tmdbKeywords.some(kw => ["sadness", "death", "grief", "sacrifice", "emotional"].includes(kw))) y -= 1.5;


    // 笑える関連の重み付け
    if (genres.includes("comedy")) y += 3;
    if (genres.includes("humor") || genres.includes("laugh")) y += 3; // 仮にこれらのジャンルがあるとすれば高い
    if (text.includes("funny moments") || text.includes("hilarious situations") || text.includes("laughter") || text.includes("joke")) y += 3;
    if (text.includes("silly") || text.includes("ridiculous") || text.includes("witty") || text.includes("slapstick")) y += 2;
    if (text.includes("humor") || text.includes("amusing") || text.includes("giggles")) y += 1.5;
    if (tmdbKeywords.some(kw => ["comedy", "funny", "humor", "laughter"].includes(kw))) y += 1.5;

    // スコアが0になりすぎないように微調整（オプション）
    // この部分は、映画の特性をより反映するように調整できます。
    // 例えば、全く関連するキーワードがない場合に、中央に集まりすぎないようにする。
    if (Math.abs(x) < 0.5 && !text.includes("love") && !text.includes("family") && !text.includes("friendship")) {
        x = (Math.random() - 0.5) * 0.5; // 小さなランダム値を加える
    }
    if (Math.abs(y) < 0.5 && !text.includes("cry") && !text.includes("laugh") && !text.includes("funny")) {
        y = (Math.random() - 0.5) * 0.5; // 小さなランダム値を加える
    }

    return { x, y };
}