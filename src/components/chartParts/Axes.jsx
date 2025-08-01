// src/components/chartParts/Axes.jsx
export default function Axes({ xScale, yScale, w, h, padding }) {
    const gridCount = 7;
    const xStep = (w - padding * 2) / (gridCount - 1);
    const yStep = (h - padding * 2) / (gridCount - 1);

    // 軸線の色と太さを変更
    const axisColor = "#666";
    const axisStrokeWidth = 1.5;

    // グリッド線の色と太さを変更
    const gridColor = "#e0e0e0";
    const gridStrokeWidth = 1;

    // ラベルのフォントサイズ
    const labelFontSize = 14;

    return (
        <g>
            {/* 垂直グリッド */}
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
                            stroke={gridColor}
                            strokeWidth={gridStrokeWidth}
                        />
                    );
                })}
            </g>

            {/* 水平グリッド */}
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
                            stroke={gridColor}
                            strokeWidth={gridStrokeWidth}
                        />
                    );
                })}
            </g>

            {/* 軸線 */}
            <g>
                {/* X軸 */}
                <line x1={padding} y1={h / 2} x2={w - padding} y2={h / 2} stroke={axisColor} strokeWidth={axisStrokeWidth} />
                {/* Y軸 */}
                <line x1={w / 2} y1={padding} x2={w / 2} y2={h - padding} stroke={axisColor} strokeWidth={axisStrokeWidth} />
            </g>

            {/* ラベル */}
            <g className="axis-labels">
                {/* X軸ラベル */}
                <text x={padding - 10} y={h / 2 + 5} textAnchor="end" fontSize={labelFontSize} fill={axisColor}>泣ける</text>
                <text x={w - padding + 10} y={h / 2 + 5} textAnchor="start" fontSize={labelFontSize} fill={axisColor}>笑える</text>

                {/* Y軸ラベル */}
                <text x={w / 2} y={padding - 10} textAnchor="middle" fontSize={labelFontSize} fill={axisColor}>家族愛・友情</text>
                <text x={w / 2} y={h - padding + 20} textAnchor="middle" fontSize={labelFontSize} fill={axisColor}>ロマンス</text>
            </g>
        </g>
    );
}