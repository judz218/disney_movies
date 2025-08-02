export default function ChartControls({ zoomTransform, onZoomSliderChange, onResetZoom }) {
    return (
        <div style={{ margin: "0.5rem 0" }}>
            <label>
                ズーム倍率: {zoomTransform.k.toFixed(2)}&nbsp;
                <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.01"
                    value={zoomTransform.k}
                    onChange={onZoomSliderChange}
                    style={{ width: "300px" }}
                />
            </label>
            <button onClick={onResetZoom} style={{ marginLeft: "1rem", padding: "0.3rem 0.6rem" }}>
                ズームリセット
            </button>
        </div>
    );
}