import ReactPlayer from "react-player";

import { useEffect, useState } from "react";

function useIdle(timeoutMs = 2000) {
    const [idle, setIdle] = useState(false);
    useEffect(() => {
        let timer;
        const reset = () => {
            setIdle(false);
            clearTimeout(timer);
            timer = setTimeout(() => setIdle(true), timeoutMs);
        };
        const events = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"];
        events.forEach(e => window.addEventListener(e, reset, { passive: true }));
        reset(); // 初期化
        return () => {
            clearTimeout(timer);
            events.forEach(e => window.removeEventListener(e, reset));
        };
    }, [timeoutMs]);
    return idle;
}

export default function Video({ video }) {
    const idle = useIdle(200); // 20秒
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {video != "" && (
                <iframe
                    width="200"
                    height="100"
                    title="idle-video"
                    src={video}

                    allow="autoplay; encrypted-media; picture-in-picture"
                />
            )}
        </div>
    );
}