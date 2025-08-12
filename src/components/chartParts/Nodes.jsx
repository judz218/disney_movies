// src/components/chartParts/Nodes.jsx
import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Nodes({ data, w, h, padding, xScale, yScale, setSelectedMovie, zoomK, selectedMovieId, topRef }) {
    const [simData, setSimData] = useState([]);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);

    const validData = data.filter(d => typeof d.popularity === "number" && d.popularity > 0);

    const minPop = d3.min(validData, d => d.popularity);
    const maxPop = d3.max(validData, d => d.popularity);
    const rScale = d3.scalePow().domain([minPop, maxPop]).range([10, 70]);

    useEffect(() => {
        const node = data.map(d => ({ ...d }));
        const simulation =
            d3.forceSimulation(node)
                .force("x", d3.forceX(d => xScale(d.x)))
                .force("y", d3.forceY(d => yScale(d.y)))
                .force("collide", d3.forceCollide(d => rScale(d.popularity) / 2))
                .stop();

        simulation.tick(200);
        node.forEach(d => {
            const r = rScale(d.popularity) / 2;
            d.x = Math.max(padding + r, Math.min(w - padding - r, d.x));
            d.y = Math.max(padding + r, Math.min(h - padding - r, d.y));
        });



        setSimData(node);
    }, [data, xScale, yScale]);


    return (
        <g>
            {simData.map((d, i) => {
                const size = rScale(d.popularity);
                // const size = Math.max(30, Math.min(100, baseSize / Math.sqrt(zoomK)));
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
                            clipPath: "circle(50%)"
                        }}
                        onClick={() => {
                            setSelectedMovie(d);
                            topRef.current ? topRef.current.scrollTop = 0 : null;
                        }}
                        onMouseEnter={() => setHoveredMovieId(d.id)}
                        onMouseLeave={() => setHoveredMovieId(null)}
                    />
                );
            })}
        </g>
    );
}