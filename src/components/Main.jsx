import { useState } from "react";

import MovieFetcher from "./MovieFetcher";
import MovieChart from "./chartParts/MovieChart";

export default function Main() {
	const [data, setData] = useState(null);
	console.log(data);

	return (
		<div>
			<MovieFetcher setData={setData} />
			{data ? <MovieChart data={data} /> : <p>読み込み中...</p>}
		</div>
	)
}