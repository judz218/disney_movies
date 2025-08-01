// src/components/chartParts/Nodes.jsx
import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Nodes({ data, w, h, padding, xScale, yScale, onClick, zoomK, selectedMovieId }) {
    const [simData, setSimData] = useState([]);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);

    const validData = data.filter(d => typeof d.popularity === "number" && d.popularity > 0);

    const minPop = d3.min(validData, d => d.popularity) || 0;
    const maxPop = d3.max(validData, d => d.popularity) || 1;
    const rScale = d3.scaleSqrt().domain([minPop, maxPop]).range([40, 90]);

    useEffect(() => {
        const nodes = data.map(d => ({ ...d }));

        const simulation = d3.forceSimulation(nodes)
            .force("x", d3.forceX(d => xScale(d.score.x)).strength(0.5))
            .force("y", d3.forceY(d => yScale(d.score.y)).strength(0.5))
            .force("collide", d3.forceCollide(d => (rScale(d.popularity) / 2 || 20) + 8))
            .stop();

        for (let i = 0; i < 300; ++i) simulation.tick();

        const minX = padding;
        const maxX = w - padding;
        const minY = padding;
        const maxY = h - padding;

        nodes.forEach(d => {
            const r = (rScale(d.popularity) / 2 || 20);
            d.x = Math.max(minX + r, Math.min(maxX - r, d.x));
            d.y = Math.max(minY + r, Math.min(maxY - r, d.y));
        });

        setSimData(nodes);
    }, [data, w, h, padding, xScale, yScale]);

    return (
        <g>
            {simData.map((d, i) => {
                const baseSize = rScale(d.popularity) || 40;
                const size = Math.max(30, Math.min(100, baseSize / Math.sqrt(zoomK)));
                if (!size || size <= 0) return null;

                const isSelected = d.id === selectedMovieId;
                const isHovered = d.id === hoveredMovieId;

                const filter = isSelected
                    ? "drop-shadow(0px 0px 8px rgba(255,0,0,0.8))"
                    : isHovered
                        ? "drop-shadow(0px 0px 5px rgba(0, 123, 255, 0.8))"
                        : "none";

                return (
                    <image
                        key={i}
                        href={d.posterThumb}
                        x={d.x - size / 2}
                        y={d.y - size / 2}
                        width={size}
                        height={size}
                        preserveAspectRatio="xMidYMid slice"
                        style={{
                            cursor: "pointer",
                            transition: "all 0.2s ease-out", // ホバー時のアニメーション
                            stroke: isSelected ? "#ff0000" : isHovered ? "#007bff" : "none",
                            strokeWidth: isSelected ? 4 : isHovered ? 2 : 0,
                            filter: filter,
                            // SVGではz-indexがないため、選択・ホバーされたノードを最後に描画する
                            // ここではシンプルに描画順で対応
                        }}
                        onClick={() => {
                            onClick(d);
                        }}
                        onMouseEnter={() => setHoveredMovieId(d.id)}
                        onMouseLeave={() => setHoveredMovieId(null)}
                    />
                );
            })}
        </g>
    );
}