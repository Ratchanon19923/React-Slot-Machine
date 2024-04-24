import React, { useState, useEffect } from "react";
import "../css/style.css";
import LoadingScreen from "./LoadingScreen";

function Home() {
  const [position, setPosition] = useState([]);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false); // เริ่มต้นโชว์โฆษณาเป็น false

  const iconHeight = 188;
  const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
  const speed = iconHeight * multiplier;
  const positions = [-940, -188, -0, -376, -1316, -1504, -564, -752, -1128];
  const scores = [5, 10, 15, 20, 25, 30, 35, 40, 45];

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        clearInterval(timer);
        setIsLoading(false);
        setShowAd(true); // เมื่อโหลดเสร็จแล้วแสดงโฆษณา
      }
    }, 20);
    return () => clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    if (!isLoading && !showAd) {
      finishHandler(); // เมื่อโหลดเสร็จแล้วและไม่แสดงโฆษณา ให้เริ่มเกมส์
    }
  }, [isLoading, showAd]);

  useEffect(() => {
    if (position.length === 3) {
      const first = position[0];
      const results = position.every((match) => match === first);
      setWinner(results);
      if (results) {
        const index = positions.findIndex((pos) => pos === first);
        const positionScore = scores[index];
        setScore((prevScore) => prevScore + positionScore);
      }
    }
    if (count > 0 && score <= 100) {
      handleClick();
    }
  }, [position, count]);

  const handleClick = () => {
    setPosition([]);
    finishHandler();
    setCount(count + 1);
  };

  const finishHandler = () => {
    const newPositions = Array.from({ length: 3 }, () => {
      const randomIndex = Math.floor(Math.random() * positions.length);
      return positions[randomIndex];
    });
    setPosition(newPositions);
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  if (showAd) {
    return (
      <div className="session-box">
        <div className="background-Modal">
          <div className="icon-group-modal">
            <div className="icon-close-modal"></div>
          </div>
          <div className="session-group-">
            <div className="icon-group-modal-">
              <div className="icon-home-modal"></div>
              <div className="icon-music-modal"></div>
            </div>
            <div onClick={handleAdClose} className="bnt-game"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="session-box">
      <div className="background-Home">
        <div className="icon-head">
          <div className="icon-music"></div>
          <div className="icon-close"></div>
        </div>
        <div className="group-logo-head">
          <div className="logo-head"></div>
        </div>
        <div className="spinner-container">
          {position.map((pos, index) => (
            <div
              key={index}
              style={{ backgroundPosition: `0px ${pos}px` }}
              className="icons"
            />
          ))}
        </div>
        <div className="group-bnt">
          <div className="bg-bonus">
            <span className="bonus-text">{score} ฿</span>
          </div>
          <div
            aria-label="Play again."
            onClick={handleClick}
            disabled={score >= 100}
            className="bt-spin"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
