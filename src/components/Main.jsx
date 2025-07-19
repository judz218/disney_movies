import { useState } from "react";

import MovieFetcher from "./MovieFetcher";

export default function Main() {
	const [movie, setMovies] = useState(null);
	console.log(movie);
	return (
		<div>
			<MovieFetcher onDataLoaded={setMovies} />
		</div>
	)
}