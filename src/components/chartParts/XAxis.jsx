export default function XAxis({ xScale, h, padding }) {
    const ticks = xScale.ticks(10);
    const formatDate = d3.timeFormat("%Y");
    return (
        <g>
            <g>
                <line
                    x1={xScale.range()[0]}
                    y1={h - padding}
                    x2={xScale.range()[1]}
                    y2={h - padding}
                    stroke="black"
                />
            </g>
            {ticks.map((tick, i) => (
                <g key={i} transform={`translate(${xScale(tick)}, ${h - padding})`}>
                    <line x1="0" y1="0" x2="0" y2="5" stroke="black" />
                    <text x="0" y="5" dominantBaseline="hanging" textAnchor="middle">
                        {formatDate(tick)}
                    </text>
                </g>
            ))}
        </g>
    );
}