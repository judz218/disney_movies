import { useState } from "react";

import MovieFetcher from "./MovieFetcher";
import MovieChart from "./chartParts/MovieChart";
import MovieDetail from "./MovieDetail";


export default function Main() {
	const [data, setData] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);

	console.log(data);

	return (
		<div>
			<MovieFetcher setData={setData} />
			{data ? <MovieChart data={data} onMovieClick={setSelectedMovie} /> : <p>読み込み中...</p>}
			{selectedMovie && <MovieDetail movie={selectedMovie} />}
		</div>
	)
}