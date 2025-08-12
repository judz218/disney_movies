import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Axes from "./Axes";
import Nodes from "./Nodes";

export default function MovieChart({ data, setSelectedMovie, selectedMovie, w, h, topRef }) {
    const padding = 20;

    const svgRef = useRef();
    const gRef = useRef();
    const zoomObjRef = useRef();

    const [zoomTransform, setZoomTransform] = useState(d3.zoomIdentity);

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
        .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
        .range([h - padding, padding]);

    useEffect(() => {
        const zoom = d3.zoom()
            .scaleExtent([0.5, 4])
            .translateExtent([
                [0, 0],
                [w, h]
            ])
            .on("zoom", (event) => {
                setZoomTransform(event.transform);
                d3.select(gRef.current).attr("transform", event.transform);
            });

        d3.select(svgRef.current).call(zoom);
        zoomObjRef.current = zoom;
    }, []);

    const handleZoomSlider = (e) => {
        const scale = parseFloat(e.target.value);
        if (zoomObjRef.current) {
            d3.select(svgRef.current)
                .transition()
                .duration(300)
                .call(zoomObjRef.current.scaleTo, scale);
        }
    };

    const resetZoom = () => {
        if (zoomObjRef.current) {
            d3.select(svgRef.current)
                .transition()
                .duration(300)
                .call(zoomObjRef.current.transform, d3.zoomIdentity);
        }
    };

    return (
        <div>
            <div style={{ margin: "1rem 2rem" }}>
                <label>
                    ズーム倍率: {zoomTransform.k.toFixed(2)}&nbsp;
                    <input
                        type="range"
                        min="0.5"
                        max="4"
                        step="0.01"
                        value={zoomTransform.k}
                        onChange={handleZoomSlider}
                        style={{ marginTop: "5px", width: "300px" }}
                    />
                </label>
                <button onClick={resetZoom} style={{ marginLeft: "1rem", padding: "0.3rem 0.6rem" }}>
                    ズームリセット
                </button>
            </div>
            <svg ref={svgRef} width={w} height={h}>
                <g ref={gRef}>
                    <Axes xScale={xScale} yScale={yScale} w={w} h={h} padding={padding} />
                    <Nodes
                        data={data}
                        w={w}
                        h={h}
                        padding={padding}
                        xScale={xScale}
                        yScale={yScale}
                        setSelectedMovie={setSelectedMovie}
                        zoomK={zoomTransform.k}
                        selectedMovieId={selectedMovie?.id}
                        topRef={topRef}
                    />
                </g>
            </svg>
        </div>
    );
}