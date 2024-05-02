import React, { useState, useEffect, useRef } from "react";
import "../css/style.css";
import LoadingScreen from "./LoadingScreen";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false); // เริ่มต้นโชว์โฆษณาเป็น false
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [audio] = useState(new Audio("../src/music/gaming-intro.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  const icon_width = 315;
  const icon_height = 100;
  const num_icons = 9;
  const indexes = [0, 0, 0];
  const time_per_icon = 100;


  const reelsRef = useRef([]);

  const roll = (reel, offset = 0) => {
    // const delta =(offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    const math = Math.random();
    const numindexes = [0.1, 0.2, 0.3];

    const num = score < 200 ? 0.1 : math;
    console.log(num);
    const delta = (offset + 2) * num_icons + Math.round(num * num_icons);

    if (reel) {
      const style = getComputedStyle(reel);
      // Current background position
      const backgroundPositionY = parseFloat(0);
      // Target background position
      const targetBackgroundPositionY =
        backgroundPositionY + delta * icon_height;
      // Normalized background position, for reset
      const normTargetBackgroundPositionY =
        targetBackgroundPositionY % (num_icons * icon_height);

      return new Promise((resolve, reject) => {
        reel.style.transition = `background-position-y ${8 + delta * time_per_icon
          }ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
        // After animation

        setTimeout(() => {
          // Reset position, so that it doesn't get higher without limit
          reel.style.transition = `none`;
          reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
          // Resolve this promise
          resolve(delta % num_icons);
        }, 8 + delta * time_per_icon);
      });
    }
  };

  const rollAll = async (_round) => {
    const reelsList = reelsRef.current;
    const __round = Number(_round ? _round : round);

    await Promise
      // Activate each reel, must convert NodeList to Array for this with spread operator
      .all(reelsList.map((reel, i) => roll(reel, i)))
      // When all reels done animating (all promises solve)
      .then(async (deltas) => {
        // add up indexes
        deltas.forEach(
          (delta, i) => (indexes[i] = (indexes[i] + delta) % num_icons)
        );
        console.log("indexes", indexes);

        await new Promise(resolve => {
          setTimeout(() => {
            setRound(__round + 1);
            resolve();
          }, 200);
        });

        if (indexes[0] == indexes[1] && indexes[1] == indexes[2]) {
          setScore(score => score + 50);
          // document.getElementById("winner").classList.add("winner");

          if (__round + 1 == 10) {
            // setTimeout(() => {
            // setIsModalOpen(true);
            // }, 1000);
            console.log("Modal open event triggered!");
            return;
          }
        }
        await rollAll(__round + 1);
      });
  };

  const closeModalAndRemoveClass = () => {
    setIsModalOpen(false);
    document.getElementById("winner").classList.remove("winner");
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        clearInterval(timer);
        setIsLoading(false);
        setShowAd(true);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    if (!isLoading && !showAd) {
      // rollAll(); // เมื่อโหลดเสร็จแล้วและไม่แสดงโฆษณา ให้เริ่มเกมส์
    }
  }, [isLoading, showAd]);

  const handleAdClose = () => {
    // audio.play();
    // setIsPlaying(!isPlaying);
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
              <div className="icon-music-modal" onClick={toggleAudio}></div>
            </div>
            <div onClick={handleAdClose} className="bnt-game"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="session-box">
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="group-close-">
              {" "}
              <div className="close" onClick={closeModalAndRemoveClass}></div>
            </div>
            <div className="group-text-popup">
              <span className="text-pop1">จำนวน {round} สปิน</span>
              <span className="text-pop2">{score}฿</span>
            </div>
          </div>
        </div>
      )}

      <div className="background-Home">
        <div className="icon-head">
          <div className="icon-music" onClick={toggleAudio}></div>
          <div className="icon-close"></div>
        </div>
        <div className="group-logo-head">
          <div className="logo-head"></div>
        </div>

        <div className="spinner-container">
          <div id="winner"></div>
          <div className="slots">
            <div
              className="reel"
              ref={(el) => (reelsRef.current[0] = el)}
            ></div>
            <div
              className="reel"
              ref={(el) => (reelsRef.current[1] = el)}
            ></div>
            <div
              className="reel"
              ref={(el) => (reelsRef.current[2] = el)}
            ></div>
          </div>
        </div>
        <div className="group-bnt">
          <div className="bg-bonus">
            <span className="bonus-text">{score} ฿</span>
          </div>
          <div
            aria-label="Play again."
            onClick={() => rollAll()}
            className="bt-spin"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
