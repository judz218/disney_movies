export default function Nodes({ data, xScale, yScale }) {
    const r = 5;

    const minPop = d3.min(data, d => d.popularity);
    const maxPop = d3.max(data, d => d.popularity);
    const rScale = d3.scaleSqrt().domain([minPop, maxPop]).range([10, 40]); // 半径調整

    return (
        <g>
            {data.map((d, i) => (
                <g>
                    <circle
                        key={i}
                        cx={xScale(d.score.x)}
                        cy={yScale(d.score.y)}
                        r={rScale(d.popularity)}
                        fill="green"
                        opacity={0.3}
                    />
                    <text x={xScale(d.score.x)} y={yScale(d.score.y)}>{d.title}</text>
                </g>
            ))}
        </g>
    );
}