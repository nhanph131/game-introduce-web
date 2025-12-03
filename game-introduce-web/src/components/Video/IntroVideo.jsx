import introVideo from "../../assets/video/intro.mp4";
import "./IntroVideo.css";

const IntroVideo = () => {
  return (
    <section className="intro-video-section">
      <video
        className="intro-video"
        src={introVideo}
        controls       // ✅ có sẵn play / pause / tua / fullscreen / volume
        preload="metadata"
        playsInline
      >
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </section>
  );
};

export default IntroVideo;
