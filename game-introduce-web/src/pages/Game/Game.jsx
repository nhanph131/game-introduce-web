import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './Game.css';

import img1 from '../../assets/game-wwm.jpg';
import img2 from '../../assets/game-wuwa.jpg';
import img3 from '../../assets/game-genshin.jpg';
import img4 from '../../assets/game-minecraft.jpg';

const gamesData = [
  {
    id: '1',
    image: img1,
    name: 'Where Wind Meet',
    rating: 4.5,
    introduction: `Một trò chơi tuyệt vời với đồ họa và lối chơi tuyệt vời. 
Bạn sẽ được trải nghiệm một thế giới rộng lớn, nhiều nhiệm vụ thú vị và các bí ẩn cần giải. 
Game cung cấp nhiều chế độ chơi, bao gồm phiêu lưu, chiến đấu, và giải đố. 
Hãy khám phá từng khu vực để nhận thưởng và nâng cấp nhân vật. 
Đừng quên tham gia các sự kiện đặc biệt và thử thách cộng đồng để nhận thêm phần thưởng! 
Đây là một trò chơi đáng thử dành cho mọi lứa tuổi.`
  },
  {
    id: '2',
    image: img2,
    name: 'Wuthering Waves',
    rating: 4.2,
    introduction: `Trải nghiệm cuộc phiêu lưu chưa từng có trong Wuthering Waves. 
Thế giới đầy màu sắc và thử thách, nơi bạn có thể tự do khám phá các vùng đất huyền bí. 
Hệ thống nhân vật đa dạng, mỗi người có kỹ năng và câu chuyện riêng. 
Game kết hợp chiến đấu thời gian thực và giải đố thông minh. 
Tham gia các nhiệm vụ và sự kiện để nâng cấp nhân vật của bạn và mở khóa vật phẩm quý giá.`
  },
  {
    id: '3',
    image: img3,
    name: 'Genshin Impact',
    rating: 4.8,
    introduction: `Thử thách bản thân với trò chơi thú vị này. 
Genshin Impact mang đến trải nghiệm phiêu lưu nhập vai rộng lớn. 
Khám phá các vùng đất khác nhau, thu thập nguyên liệu và chiến đấu với quái vật. 
Hệ thống nhân vật đa dạng với kỹ năng đặc biệt. 
Game nổi bật với đồ họa 3D tuyệt đẹp và cốt truyện lôi cuốn.`
  },
  {
    id: '4',
    image: img4,
    name: 'Minecraft',
    rating: 4.0,
    introduction: `Khám phá thế giới mở trong Minecraft. 
Tự do xây dựng, khai thác tài nguyên và phiêu lưu cùng bạn bè. 
Game nổi bật với gameplay sáng tạo không giới hạn và cộng đồng đông đảo. 
Tham gia các server, thử thách PvP hoặc cùng nhau khám phá vùng đất mới. 
Minecraft là lựa chọn tuyệt vời cho mọi lứa tuổi và mọi sở thích.`
  }
];

const Game = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([
    { id: 1, name: 'Minh Hoàng', avatar: 'https://i.pravatar.cc/40?u=1', text: 'Trò chơi này thật tuyệt vời!' },
    { id: 2, name: 'Lan Anh', avatar: 'https://i.pravatar.cc/40?u=2', text: 'Mình rất thích đồ họa và lối chơi của game.' },
    { id: 3, name: 'Hải Đăng', avatar: 'https://i.pravatar.cc/40?u=3', text: 'Các nhiệm vụ trong game đa dạng và thú vị.' },
    { id: 4, name: 'Nhật Linh', avatar: 'https://i.pravatar.cc/40?u=4', text: 'Rất đáng để thử cho mọi lứa tuổi!' },
  ]);

  const [newComment, setNewComment] = useState('');
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [showFullIntro, setShowFullIntro] = useState(false);

  if (!id) {
    return (
      <div className="game-root">
        <NavBar />
        <main className="game-list-section">
          <h1>Kho game</h1>
          <div className="games-vertical-list">
            {gamesData.map(g => (
              <Link key={g.id} to={`/game/${g.id}`} className="game-card">
                <img src={g.image} alt={g.name} className="game-card-img" />
                <div className="game-card-info">
                  <h2>{g.name}</h2>
                  <p>{g.introduction.split('\n')[0]}...</p>
                  <div className="game-rating-stars">
                    {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(g.rating) ? '⭐' : '✩'}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const game = gamesData.find(g => g.id === id);
  if (!game) return (
    <div className="game-root">
      <NavBar />
      <div className="game-notfound">
        <h2>Game not found!</h2>
        <Link to="/game" className="back-button">Back to All Games</Link>
      </div>
      <Footer />
    </div>
  );

  const handleCommentSubmit = e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), name: 'Anonymous User', avatar: `https://i.pravatar.cc/40?u=${Date.now()}`, text: newComment.trim() }]);
    setNewComment('');
  };

  return (
    <div className="game-root">
      <NavBar />
      <section className="game-detail">
        <Link to="/game" className="back-button">Quay về</Link>
        <div className="game-header">
          <img src={game.image} alt={game.name} className="game-icon" />
          <div className="game-info">
            <h1>{game.name}</h1>
            <p className="game-rating">Đánh giá: {game.rating} ⭐</p>

            <div className={`game-description ${showFullIntro ? 'expanded' : ''}`}>
              {game.introduction}
            </div>
            {game.introduction.split('\n').length > 5 && (
              <button className="read-more-btn" onClick={() => setShowFullIntro(!showFullIntro)}>
                {showFullIntro ? 'Thu gọn' : 'Đọc thêm'}
              </button>
            )}
          </div>
        </div>

        <div className="rating-slider">
          <h3>Đánh giá:</h3>
          <div className="star-rating">{[1,2,3,4,5].map(i => (
            <div key={i} className={`star ${i <= (ratingHover || currentRating) ? 'full' : 'empty'}`} 
              onMouseEnter={() => setRatingHover(i)} onMouseLeave={() => setRatingHover(0)} onClick={() => setCurrentRating(i)} />
          ))}</div>
          <button className="rating-submit-btn" onClick={() => currentRating && setRatingSubmitted(true)}>Xác nhận</button>
          {ratingSubmitted && <p className="rating-thanks-msg">Gửi đánh giá thành công!</p>}
        </div>

        <section className="game-comments">
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input placeholder="Thêm bình luận..." value={newComment} onChange={e => setNewComment(e.target.value)} />
            <button type="submit">Gửi</button>
          </form>
          <ul className="comment-list">{comments.map(c => (
            <li key={c.id} className="comment-item">
              <img src={c.avatar} alt={c.name} className="comment-avatar" />
              <div className="comment-content">
                <span className="comment-name">{c.name}</span>
                <p className="comment-text">{c.text}</p>
              </div>
            </li>
          ))}</ul>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Game;
