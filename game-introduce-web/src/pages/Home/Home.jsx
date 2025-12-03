import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import GamePrev from '../../components/GamePrev/GamePrev';
import Footer from '../../components/Footer/Footer';
import './Home.css';

import img1 from '../../assets/game-wwm.jpg';
import img2 from '../../assets/game-wuwa.jpg';
import img3 from '../../assets/game-genshin.jpg';

const Home = () => {
  const games = [
    { id: '1', image: img1, name: 'Where Wind Meet', description: 'Một trò chơi tuyệt vời với đồ họa và lối chơi tuyệt vời' },
    { id: '2', image: img2, name: 'Wuthering Waves', description: 'Trải nghiệm cuộc phiêu lưu chưa từng có' },
    { id: '3', image: img3, name: 'Genshin Impact', description: 'Thử thách bản thân với trò chơi thú vị này' }
  ];

  const recommended = [
    { id: '3', image: img3, name: 'Genshin Impact' },
    { id: '1', image: img1, name: 'Where Wind Meet' },
    { id: '2', image: img2, name: 'Wuthering Waves' }
  ];

  const goatList = [
    { id: '3', image: img3, name: 'Genshin Impact' },
    { id: '2', image: img2, name: 'Wuthering Waves' },
    { id: '1', image: img1, name: 'Where Wind Meet' }
  ];

  return (
    <div className="home-root">
      <header className="home-header">
        <NavBar />
      </header>

      <section className="home-hero">
        <div className="hero-inner">
          <h1 className="hero-title">Khám phá về những tựa game nổi tiếng</h1>
          <p className="hero-sub">
            Giới thiệu, đánh giá về các game PC, Mobile đang hot trong khoảng thời gian hiện tại.
          </p>
          <Link to="/game" className="cta-button">Khám phá thêm</Link>
        </div>
      </section>

      <main className="home-content">
        <h2 className="section-title">Featured</h2>
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

        <section className="we-recommended">
          <h2 className="section-title">Best for PC</h2>
          <div className="cards-grid">
            {recommended.map((g) => (
              <Link key={g.id} to={`/game/${g.id}`} className="game-link card-link">
                <GamePrev image={g.image} name={g.name} showDescription={false} />
              </Link>
            ))}
          </div>
        </section>

        <section className="goat-section">
          <h2 className="section-title">GOAT</h2>
          <div className="cards-grid goat-grid">
            {goatList.map((g) => (
              <Link key={g.id} to={`/game/${g.id}`} className="game-link card-link">
                <div className="goat-badge">GOAT</div>
                <GamePrev image={g.image} name={g.name} showDescription={false} />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
