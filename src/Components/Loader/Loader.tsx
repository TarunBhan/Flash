import React, { useEffect, useRef } from "react";

const Loader = () => {
  const videoRef = useRef<HTMLVideoElement | undefined>();
  useEffect(() => {}, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        width="320"
        height="240"
        autoPlay={true}
        loop={true}
        ref={videoRef as any}
        muted={true}
      >
        <source
          autoFocus
          src={require("../../Assets/Images/loader.mp4")}
          type={"video/mp4" as string}
        ></source>
      </video>
    </div>
  );
};

export default Loader;
