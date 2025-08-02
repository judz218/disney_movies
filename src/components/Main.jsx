import { useState, useEffect } from "react";
import MovieDetail from "./MovieDetail";
import MovieChart from "./chartParts/MovieChart";
import Filter from "./Filter";
import MovieListFromMeta from "./MovieListFromMeta";
import MovieFetcherFromList from "./MovieFetcherFromList";


export default function Main() {
	const [movieMeta, setMovieMeta] = useState([]);
	const [availableCompanies, setAvailableCompanies] = useState();
	const [movieList, setMovieList] = useState(null);
	const [data, setData] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const [filterMethod, setFilterMethod] = useState("random");
	const [filterCompany, setFilterCompany] = useState("all");

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("../../movie_meta.json");
				if (!response.ok) {
					throw new Error("映画データの取得に失敗しました");
				}
				const json = await response.json();
				setMovieMeta(json);

				const uniqueCompanes = [...new Set(
					json.flatMap(m => m.companies || [])
				)].sort();
				setAvailableCompanies(uniqueCompanes);
			} catch (error) {
				console.log("エラー発生", error);
			}
		})();
	}, []);

	return (
		<>
			{/* フィルター設定UI */}
			<div style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd", display: "flex", gap: "2rem", alignItems: "center" }}>
				<Filter
					filterMethod={filterMethod}
					setFilterMethod={setFilterMethod}
					filterCompany={filterCompany}
					setFilterCompany={setFilterCompany}
					availableCompanies={availableCompanies}
				/>
			</div>


			{/* メイン画面 */}
			<div style={{ flex: 1, display: "flex", position: "relative" }}>
				<div style={{ flex: "1", padding: "1rem", overflowY: "auto" }}>
					<MovieListFromMeta
						movieMeta={movieMeta}
						filterMethod={filterMethod}
						filterCompany={filterCompany}
						setMovieList={setMovieList}
					/>
					{movieList && (
						<MovieFetcherFromList
							movieList={movieList}
							setData={setData}
							setIsLoading={setIsLoading}
						/>
					)}
					{isLoading ? (
						<p style={{ textAlign: "center", padding: "2rem", fontSize: "1.2rem" }}>読み込み中...</p>
					) : data ? (
						<MovieChart
							data={data}
							onMovieClick={setSelectedMovie}
							selectedMovie={selectedMovie}
						/>
					) : (
						<p style={{ textAlign: "center", padding: "2rem", fontSize: "1.2rem" }}>映画リストを読み込み中...</p>
					)}
				</div>

				{/* 詳細パネル */}
				{selectedMovie && (
					<div style={{
						position: "absolute", // ここは absolute のままでOK
						top: 0,
						right: 0,
						width: "500px",
						height: "100%",
						backgroundColor: "#fff",
						boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)",
						zIndex: 10 // z-index を追加して、チャートの上に表示されるようにする
					}}>
						<MovieDetail
							movie={selectedMovie}
							onClose={() => setSelectedMovie(null)}
						/>
					</div>
				)}
			</div>
		</>
	);
}