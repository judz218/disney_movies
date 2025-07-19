import Axes from "./Axes";
import Nodes from "./Nodes";

export default function MovieChart({ data }) {
    const w = 500;
    const h = 500;

    const padding = 50;

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.score.x), d3.max(data, d => d.score.x)])
        .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.score.y), d3.max(data, d => d.score.y)])
        .range([h - padding, padding]);

    return (
        <svg width={w} height={h}>
            <Axes xScale={xScale} yScale={yScale} w={w} h={h} padding={padding} />
            <Nodes data={data} xScale={xScale} yScale={yScale} />
        </svg>
    )
}