import { useState, useEffect, useRef } from "react";
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


	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight * 0.77
	});

	const topRef = useRef(null);

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

	useEffect(() => {
		selectedMovie ? setWindowSize({ width: window.innerWidth * 0.7, height: window.innerHeight }) : setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		const handleResize = () => selectedMovie ? setWindowSize({ width: window.innerWidth * 0.7, height: window.innerHeight }) : setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [selectedMovie]);


	return (
		<div>
			{/* フィルター設定UI */}
			<div style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd", display: "flex", gap: "2rem", alignItems: "center" }}>
				<Filter
					filterCompany={filterCompany}
					setFilterCompany={setFilterCompany}
				/>
			</div>


			{/* メイン画面 */}
			<div style={{ flex: 1, display: "flex", position: "relative" }}>
				<div style={{ flex: "1", overflowY: "auto" }}>
					<MovieListFromMeta
						movieMeta={movieMeta}
						filterCompany={filterCompany}
						setMovieList={setMovieList}
						setSelectedMovie={setSelectedMovie}

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
							setSelectedMovie={setSelectedMovie}
							selectedMovie={selectedMovie}
							w={windowSize.width}
							h={windowSize.height * 0.77}
							topRef={topRef}
						/>
					) : (
						<p style={{ textAlign: "center", padding: "2rem", fontSize: "1.2rem" }}>映画リストを読み込み中...</p>
					)}
				</div>

				{/* 詳細パネル */}
				{selectedMovie && (
					<div style={{
						position: "absolute",
						top: 0,
						right: 0,
						width: windowSize.width * 0.3,
						height: windowSize.height * 0.77,
						backgroundColor: "#fff",
						boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)",
					}}>
						<MovieDetail
							movie={selectedMovie}
							onClose={() => {
								setSelectedMovie(null);
							}}
							topRef={topRef}
						/>
					</div>
				)}
			</div>
		</div>
	);
}