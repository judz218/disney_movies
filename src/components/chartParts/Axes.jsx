export default function Axes({ xScale, yScale, w, h, padding }) {
    const gridCount = 7;

    const xStep = (w - padding * 2) / (gridCount - 1);
    const yStep = (h - padding * 2) / (gridCount - 1);
    return (
        <g>
            <g>
                <g>
                    <line
                        x1={padding}
                        y1={h / 2}
                        x2={w - padding}
                        y2={h / 2}
                        stroke="black"
                    />
                </g>
                <g>
                    {Array.from({ length: gridCount }).map((_, i) => {
                        const x = padding + i * xStep;
                        return (
                            <line
                                key={`v-${i}`}
                                x1={x}
                                y1={padding}
                                x2={x}
                                y2={h - padding}
                                stroke="#ccc"
                            />
                        );
                    })}
                </g>
                <g>
                    <text x={padding - 10} y={h / 2 + 5} textAnchor="end" fontSize="12">泣ける</text>
                    <text x={w - padding + 10} y={h / 2 + 5} textAnchor="start" fontSize="12">笑える</text>
                </g>
            </g>
            <g>
                <g>
                    <line
                        x1={w / 2}
                        y1={padding}
                        x2={w / 2}
                        y2={h - padding}
                        stroke="black"
                    />
                </g>
                <g>

                    {Array.from({ length: gridCount }).map((_, i) => {
                        const y = padding + i * yStep;
                        return (

                            <line
                                key={`h-${i}`}
                                x1={padding}
                                y1={y}
                                x2={w - padding}
                                y2={y}
                                stroke="#ccc"
                            />
                        );
                    })}
                </g>
                <g>
                    <text x={w / 2} y={padding - 10} textAnchor="middle" fontSize="12">家族愛・友情</text>
                    <text x={w / 2} y={h - padding + 20} textAnchor="middle" fontSize="12">ロマンス</text>
                </g>

            </g>
        </g>
    )
}