export default function ScatterPlot({ data, xProperty, yProperty, xScale, yScale }) {
    const r = 5;
    return (
        <g>
            {data.map((d, i) => {
                const x = xScale(d[xProperty]);
                const y = yScale(d[yProperty]);

                return (
                    <circle
                        key={i}
                        className="dot"
                        cx={x}
                        cy={y}
                        r={r}
                        fill="steelblue"
                        opacity="0.5"
                        onClick={() => console.log(`Clicked point ${i}`, d)} // ← クリック時にログ出力
                    />
                );
            })}

        </g>
    );
}