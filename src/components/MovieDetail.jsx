// src/components/MovieDetail.jsx
import { useState } from "react";
import Video from "./Video";
import ReactPlayer from "react-player";

export default function MovieDetail({ movie, onClose, topRef }) {
    const [isEnglishPoster, setIsEnglishPoster] = useState(false);

    const [click, setClick] = useState(false);

    const companies =
        movie.companies.join(", ") || "情報なし";
    const releaseYear = movie.release_year || (movie.release_date?.split("-")[0] ?? "不明");
    const runtime = movie.runtime ? `${movie.runtime} 分` : "情報なし";
    const popularity = movie.popularity;
    const posterSrc = isEnglishPoster ? movie.posterEn : movie.posterJa;
    const overview = movie.overviewJa == "" ? "情報なし" : movie.overviewJa;

    const video = movie.video;

    return (
        <div ref={topRef}
            style={{
                top: 0,
                right: 0,
                height: "100%",
                padding: "2rem", // パディングを増やす
                backgroundColor: "#fff", // 白い背景
                borderLeft: "1px solid #eee",
                overflowY: "auto",
                boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)" // 左側に影を追加
            }}>

            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "transparent",
                    color: "#666",
                    border: "none",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: 0
                }}
            >×</button>

            <h2 style={{ textAlign: "center" }}>{movie.titleJa}</h2>
            <p style={{ textAlign: "center", fontSize: "14px", color: "#666", marginBottom: "1rem" }}>（英語タイトル: {movie.titleEn}）</p>

            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>

                {click ?
                    (video === "" ?
                        <p>情報なし</p> :
                        <ReactPlayer
                            src={movie.video}
                            width="100%"
                            height="100%"
                            muted
                            playsinline
                            playing={true}
                            loop={false}
                            controls={true}
                        />)
                    :
                    <img
                        src={posterSrc}
                        alt={movie.title}
                        style={{
                            width: "80%",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)" // ポスターにも影
                        }}
                    />
                }

                <div>
                    <button
                        onClick={() => {
                            setIsEnglishPoster(!isEnglishPoster);
                        }}
                        style={{
                            padding: "0.5rem 1rem",
                            fontSize: "14px",
                            cursor: "pointer",
                            backgroundColor: "#6c757d" // ボタンの色を変更
                        }}
                    >
                        ポスターを{isEnglishPoster ? "日本語" : "英語"}に切り替え
                    </button>
                    <button
                        onClick={() => setClick(!click)}
                    >
                        動画
                    </button>
                </div>
            </div>


            <p><strong>あらすじ：</strong>{overview}</p>

            <div style={{ marginTop: "2rem", fontSize: "14px", color: "#444" }}>
                <p><strong>制作年：</strong>{releaseYear}</p>
                <p><strong>制作会社：</strong>{companies}</p>
                <p><strong>上映時間：</strong>{runtime}</p>
                <p><strong>人気度（popularity）：</strong>{popularity}</p>
            </div>
        </div>
    );
}