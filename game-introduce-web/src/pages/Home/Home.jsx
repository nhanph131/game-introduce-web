import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import GamePrev from '../../components/GamePrev/GamePrev';
import Footer from '../../components/Footer/Footer';
import IntroVideo from '../../components/Video/IntroVideo';

import './Home.css';

import img1 from '../../assets/game-wwm.jpg';
import img2 from '../../assets/game-wuwa.jpg';
import img3 from '../../assets/game-genshin.jpg';
import img4 from '../../assets/game-minecraft.jpg';

const Home = () => {
  const games = [
    { id: 1, image: img1, name: 'Where Wind Meet', description: 'Một trò chơi tuyệt vời với đồ họa và lối chơi tuyệt vời' },
    { id: 2, image: img2, name: 'Wuthering Waves', description: 'Trải nghiệm cuộc phiêu lưu chưa từng có' },
    { id: 3, image: img3, name: 'Genshin Impact', description: 'Thử thách bản thân với trò chơi thú vị này' }
  ];

  const recommended = [
    { id: 1, image: img1, name: 'Where Wind Meet' },
    { id: 4, image: img4, name: 'Minecraft' },
    { id: 2, image: img2, name: 'Wuthering Waves' },
    { id: 3, image: img3, name: 'Genshin Impact' },
    { id: 1, image: img1, name: 'Where Wind Meet 2' }
  ];

  const goatList = [
    { id: 4, image: img4, name: 'Minecraft' },
    { id: 3, image: img3, name: 'Genshin Impact' },
    { id: 1, image: img1, name: 'Wuthering Waves' },
    { id: 2, image: img2, name: 'Wuthering Waves 2' },
    { id: 4, image: img4, name: 'Minecraft 2' }
  ];

  // duplicated arrays for seamless loop
  const recommendedLoop = [...recommended, ...recommended];
  const goatLoop = [...goatList, ...goatList];

  // refs & state for two sliders
  const recTrackRef = useRef(null);
  const goatTrackRef = useRef(null);
  const [recIndex, setRecIndex] = useState(0);
  const [goatIndex, setGoatIndex] = useState(0);

  // helper to setup auto slide for a track
  const useAutoSlide = (trackRef, loopLength, setIndex) => {
    useEffect(() => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      let interval = null;
      let step = 0;
      const computeStep = () => {
        const firstItem = track.querySelector('.slider-item');
        if (!firstItem) return 0;
        const itemW = firstItem.getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return itemW + gap;
      };
      // recompute on resize
      const onResize = () => { step = computeStep(); };
      step = computeStep();
      window.addEventListener('resize', onResize);

      let idx = 0;
      const advance = () => {
        idx += 1;
        track.style.transition = 'transform 0.8s cubic-bezier(.22,.9,.3,1)';
        track.style.transform = `translateX(-${idx * step}px)`;
        if (idx === loopLength) {
          const handler = () => {
            track.style.transition = 'none';
            idx = 0;
            track.style.transform = `translateX(0px)`;
            track.removeEventListener('transitionend', handler);
            setIndex(0);
          };
          track.addEventListener('transitionend', handler);
        } else {
          setIndex(idx);
        }
      };

      interval = setInterval(advance, 3000);

      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', onResize);
      };
    }, [trackRef, loopLength, setIndex]);
  };

  // setup sliders: loopLength = original length
  useAutoSlide(recTrackRef, recommended.length, setRecIndex);
  useAutoSlide(goatTrackRef, goatList.length, setGoatIndex);

  return (
    <div className="home-root">
      <header className="home-header">
        <NavBar />
      </header>

      <section className="home-hero">
        <div className="hero-inner">
          <h1 className="hero-title">Khám phá về những tựa game nổi tiếng</h1>
          <p className="hero-sub">
            Giới thiệu, đánh giá về các game PC, Mobile đang hot trong khoảng thời gian hiện tại
          </p>

          <IntroVideo />

          <Link to="/game" className="cta-button">Khám phá thêm</Link>
        </div>
      </section>

      <main className="home-content">
        <h2 className="section-title">
          <span className="title-icon">⭐</span>
          Không thể bỏ lỡ
        </h2>

        <div className="games-list">
          {games.map((game) => (
            <Link key={game.id} to={`/game/${game.id}`} className="game-link">
              <GamePrev
                image={game.image}
                name={game.name}
                description={game.description}
              />
            </Link>
          ))}
        </div>

        {/* We Recommended - auto sliding */}
        <section className="we-recommended">
          <h2 className="section-title">
            <span className="title-icon">💻</span>
            Lựa chọn tuyệt vời cho PC
          </h2>

          <div className="auto-slider">
            <div className="slider-track" ref={recTrackRef}>
              {recommendedLoop.map((g, idx) => (
                <Link key={g.id + '-' + idx} to={`/game/${g.id}`} className="game-link card-link slider-item">
                  <GamePrev image={g.image} name={g.name} showDescription={false} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* GOAT - auto sliding */}
        <section className="goat-section">
          <h2 className="section-title">
            <span className="title-icon">🏆</span>
            Tốt nhất mọi thời đại
        </h2>

          <div className="auto-slider">
            <div className="slider-track" ref={goatTrackRef}>
              {goatLoop.map((g, idx) => (
                <Link key={g.id + '-' + idx} to={`/game/${g.id}`} className="game-link card-link slider-item">
                  <div className="goat-badge">GOAT</div>
                  <GamePrev image={g.image} name={g.name} showDescription={false} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
