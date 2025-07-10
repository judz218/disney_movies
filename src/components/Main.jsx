import XAxis from "./chartParts/XAxis";

export default function Main({ data, xProperty, yProperty }) {
	const w = 1000;
	const h = 600;

	const plotW = 500;
	const padding = 50;

	const xScale = d3
		.scaleLinear()
		.domain([
			d3.min(data, (d) => d[xProperty]),
			d3.max(data, (d) => d[xProperty]),
		])
		.range([padding, plotW - padding]);

	const yScale = d3
		.scaleLinear()
		.domain([
			d3.min(data, (d) => d[yProperty]),
			d3.max(data, (d) => d[yProperty]),
		])
		.range([h - padding, padding]);

	return (
		<svg width={w} height={h}>
			<g>
				<XAxis xScale={xScale} h={h} padding={padding} />
				<YAxis yScale={yScale} padding={padding} />
			</g>
		</svg>
	);
}
