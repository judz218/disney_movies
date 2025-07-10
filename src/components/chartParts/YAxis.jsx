export default function YAxis({ yScale, padding }) {
    const ticks = yScale.ticks(12);
    return (
        <g>
            <g>
                <line
                    x1={padding}
                    y1={yScale.range()[0]}
                    x2={padding}
                    y2={yScale.range()[1]}
                    stroke="black"
                />
            </g>
            {ticks.map((tick, i) => (
                <g key={i} transform={`translate(${padding}, ${yScale(tick)})`}>
                    <line x1="-5" y1="0" x2="0" y2="0" stroke="black" />
                    <text x="-10" y="0" dominantBaseline="middle" textAnchor="end">{tick}</text>
                </g>
            ))}
        </g>
    );
}