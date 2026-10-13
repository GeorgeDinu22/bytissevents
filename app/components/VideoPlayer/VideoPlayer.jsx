"use client";

import { useRef, useState } from "react";
import styles from "./videoPlayer.module.css";

// Video fără controalele browserului: un singur buton de play pe mijloc.
// Un click pe clip îl pune pe pauză și butonul reapare.
export default function VideoPlayer({ src, poster, label = "Redă clipul" }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  }

  return (
    <div className={styles.player}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster ?? undefined}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <button
        type="button"
        aria-label={label}
        onClick={toggle}
        className={`${styles.play} ${playing ? styles.playHidden : ""}`}
        tabIndex={playing ? -1 : 0}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
        </svg>
      </button>
    </div>
  );
}
