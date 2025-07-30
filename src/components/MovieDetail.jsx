export default function MovieDetail({ movie }) {
    return (
        <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "100%",
            padding: "1rem",
            backgroundColor: "#f8f8f8",
            borderLeft: "1px solid #ccc",
            overflowY: "auto"
        }}>
            <img
                src={movie.poster}
                alt={movie.title}
                style={{
                    width: "80%",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "8px"
                }}
            />            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <a href={`https://www.disneyplus.com/search/${encodeURIComponent(movie.title)}`} target="_blank" rel="noreferrer">
                Disney+で探す
            </a>
        </div>
    );
}
