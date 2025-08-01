// src/components/Main.jsx
import { useEffect, useState } from "react";
import MovieDetail from "./MovieDetail";
import MovieChart from "./chartParts/MovieChart";
import CompanyFilter from "./CompanyFilter";
import MovieListFromMeta from "./MovieListFromMeta";
import MovieFetcherFromList from "./MovieFetcherFromList";

export default function Main() {
	const [movieList, setMovieList] = useState(null);
	const [data, setData] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const [filterMethod, setFilterMethod] = useState("random");
	const [filterCompany, setFilterCompany] = useState("all");

	const [meta, setMeta] = useState([]);
	const [availableCompanies, setAvailableCompanies] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetch("src/data/movie_meta.json")
			.then(res => res.json())
			.then(json => {
				setMeta(json);
				const uniqueCompanies = [...new Set(
					json.flatMap(m => m.companies || [])
				)].sort();
				setAvailableCompanies(uniqueCompanies);
			});
	}, []);

	return (
		<>
			{/* フィルター設定UI */}
			<div style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd", display: "flex", gap: "2rem", alignItems: "center" }}>
				<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
					<label>
						抽出方法：
						<select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)}>
							<option value="random">ランダム30本</option>
							<option value="popular">人気順30本</option>
						</select>
					</label>
					<CompanyFilter filterCompany={filterCompany} setFilterCompany={setFilterCompany} availableCompanies={availableCompanies} />
				</div>
			</div>


			{/* メイン画面 */}
			<div style={{ flex: 1, display: "flex", position: "relative", overflow: "hidden" }}>
				<div style={{ flex: "1", padding: "1rem", overflowY: "auto" }}>
					<MovieListFromMeta
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
					<MovieDetail
						movie={selectedMovie}
						onClose={() => setSelectedMovie(null)}
					/>
				)}
			</div>
		</>
	);
}