export default function Nodes({ data, xScale, yScale }) {
    const r = 5;

    return (
        <g>
            {data.map((d, i) => (
                <g>
                    <circle
                        key={i}
                        cx={xScale(d.score.x)}
                        cy={yScale(d.score.y)}
                        r={r}
                        fill="green"
                    />
                    <text x={xScale(d.score.x)} y={yScale(d.score.y)}>{d.title}</text>
                </g>
            ))}
        </g>
    );
}