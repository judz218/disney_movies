import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Nodes({ data, xScale, yScale }) {
    const [simData, setSimData] = useState([]);

    const minPop = d3.min(data, d => d.popularity);
    const maxPop = d3.max(data, d => d.popularity);
    const rScale = d3.scaleSqrt().domain([minPop, maxPop]).range([20, 60]); // 画像サイズ用

    useEffect(() => {
        const nodes = data.map(d => ({ ...d }));

        const simulation = d3.forceSimulation(nodes)
            .force("x", d3.forceX(d => xScale(d.score.x)).strength(0.5))
            .force("y", d3.forceY(d => yScale(d.score.y)).strength(0.5))
            .force("collide", d3.forceCollide(d => rScale(d.popularity) / 2 + 4)) // 半径 = サイズの半分
            .stop();

        for (let i = 0; i < 300; ++i) simulation.tick();

        setSimData(nodes);
    }, [data]);

    return (
        <g>
            {simData.map((d, i) => {
                const size = rScale(d.popularity);
                return (
                    <image
                        key={i}
                        href={d.poster}
                        x={d.x - size / 2}
                        y={d.y - size / 2}
                        width={size}
                        height={size}
                        preserveAspectRatio="xMidYMid slice"
                        style={{ cursor: "pointer" }}
                        onClick={() => onClick(d)}
                    />
                );
            })}
        </g>
    );
}
