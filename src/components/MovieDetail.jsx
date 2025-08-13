// src/components/MovieDetail.jsx
import { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./MovieDetail.module.css"; // CSSモジュールをインポート

export default function MovieDetail({ movie, onClose, topRef }) {
    const [isEnglishPoster, setIsEnglishPoster] = useState(false);
    const [click, setClick] = useState(false);

    const companies = movie.companies.join(", ") || "情報なし";
    const releaseYear = movie.release_year || (movie.release_date?.split("-")[0] ?? "不明");
    const runtime = movie.runtime ? `${movie.runtime} 分` : "情報なし";
    const popularity = movie.popularity;
    const posterSrc = isEnglishPoster ? movie.posterEn : movie.posterJa;
    const overview = movie.overviewJa === "" ? "情報なし" : movie.overviewJa;
    const video = movie.video;

    return (
        <div ref={topRef} className={styles.movieDetailPanel}>
            <button onClick={onClose} className={styles.closeButton}>
                &times;
            </button>

            <h2 className={styles.title}>{movie.titleJa}</h2>
            <p className={styles.subtitle}>（英語タイトル: {movie.titleEn}）</p>

            <div className={styles.mediaContainer}>
                {click && video ? (
                    <ReactPlayer
                        src={video}
                        width="100%"
                        height="100%"
                        muted
                        playsinline
                        playing={true}
                        loop={false}
                        controls={true}
                        className={styles.reactPlayer}
                    />
                ) : (
                    <div className={styles.posterWrapper}>
                        <img
                            src={posterSrc}
                            alt={movie.title}
                            className={styles.posterImage}
                        />
                        {!video && click && <p>動画情報なし</p>}
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    <button onClick={() => setIsEnglishPoster(!isEnglishPoster)} className={styles.posterToggleButton}>
                        ポスターを{isEnglishPoster ? "日本語" : "英語"}に切り替え
                    </button>
                    <button onClick={() => setClick(!click)} className={styles.videoToggleButton}>
                        {click ? "ポスターに戻る" : "動画を再生"}
                    </button>
                </div>
            </div>

            <h3 className={styles.sectionTitle}>あらすじ</h3>
            <p className={styles.overviewText}>{overview}</p>

            <h3 className={styles.sectionTitle}>詳細情報</h3>
            <ul className={styles.infoList}>
                <li>
                    <strong>制作年：</strong>{releaseYear}
                </li>
                <li>
                    <strong>制作会社：</strong>{companies}
                </li>
                <li>
                    <strong>上映時間：</strong>{runtime}
                </li>
                <li>
                    <strong>人気度（popularity）：</strong>{popularity}
                </li>
            </ul>
        </div>
    );
}