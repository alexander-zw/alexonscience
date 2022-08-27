import "../../styles/subcomponents/RecentVideos.css";

import React from "react";

/**
 * The embedded video component displays my most recent videos from YouTube.
 * Unfortunately it is hardcoded, so I need to edit it every time a new video
 * is out.
 */
function RecentVideos() {
    const iframeAllowProp =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

    const videoRatio = 560 / 315;
    const videoHeight = 200;
    const videoWidth = videoHeight * videoRatio;

    const recentVideoLinks = [
        "https://www.youtube.com/embed/J_rw2Txr9i8",
        "https://www.youtube.com/embed/cHAVhoZx2os",
        "https://www.youtube.com/embed/cI5lkif-V1c",
        "https://www.youtube.com/embed/wuX_QyS0C3A",
        "https://www.youtube.com/embed/Vsgek3M1PZw",
    ];

    const recentVideoIframes = recentVideoLinks.map((link) => (
        <iframe
            key={link}
            className="embedded-video"
            width={videoWidth}
            height={videoHeight}
            src={link}
            title="Most recent video"
            frameBorder="0"
            allow={iframeAllowProp}
            allowFullScreen
        />
    ));

    return (
        <>
            <span className="videos-title">Recent Uploads</span>
            <div className="embedded-video-container">{recentVideoIframes}</div>
        </>
    );
}

export default RecentVideos;
