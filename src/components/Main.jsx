import XAxis from "./chartParts/XAxis";
import YAxis from "./chartParts/YAxis";
import ScatterPlot from "./chartParts/ScatterPlot";

export default function Main({ data, xProperty, yProperty }) {
	const w = 1000;
	const h = 600;

	const plotW = 800;
	const padding = 50;

	const xScale = d3
		.scaleTime()
		.domain(d3.extent(data, (d) => d[xProperty]))
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
				<ScatterPlot
					data={data}
					xProperty={xProperty}
					yProperty={yProperty}
					xScale={xScale}
					yScale={yScale}
				/>
				<XAxis xScale={xScale} h={h} padding={padding} />
				<YAxis yScale={yScale} padding={padding} />
			</g>
		</svg>
	);
}
