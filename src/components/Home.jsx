import React, { useState, useEffect, useRef } from "react";
import "../css/style.css";
import LoadingScreen from "./LoadingScreen";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false); // เริ่มต้นโชว์โฆษณาเป็น false
  const [score, setScore] = useState(false);

  // const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
  const icon_width = 350;
  const icon_height = 330;
  const num_icons = 9;
  const indexes = [0, 0, 0];
  const time_per_icon = 100;

  const reelsRef = useRef([]);


  const roll = (reel, offset = 0) => {
    const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    console.log(delta);
    if (reel) {

      const style = getComputedStyle(reel);
      // Current background position
      const backgroundPositionY = parseFloat(style['background-position-y']);
      // Target background position
      const targetBackgroundPositionY = backgroundPositionY + delta * icon_height;
      // Normalized background position, for reset
      const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

      return new Promise((resolve, reject) => {

        reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
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
      })

    }
  }


  const rollAll = () => {
    const reelsList = reelsRef.current;

    Promise
      // Activate each reel, must convert NodeList to Array for this with spread operator
      .all(reelsList.map((reel, i) => roll(reel, i)))

      // When all reels done animating (all promises solve)
      .then((deltas) => {
        // add up indexes
        deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);
        console.log(indexes);
        // indexes.map((index) => console.log(iconMap[index]));

        // Win conditions
        if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
          setScore(score + 50)
          alert("50")
        }
        else if (indexes[0] == indexes[1] == indexes[2]) {
          setScore(score + 1000)
          alert("win...999...")
        }

        // Again!
        // setTimeout(rollAll, 100);

      });
  };

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
    // if (!isLoading && !showAd) {
    //   finishHandler(); // เมื่อโหลดเสร็จแล้วและไม่แสดงโฆษณา ให้เริ่มเกมส์
    // }
  }, [isLoading, showAd]);





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
          <div className="icon-group-modal-">
            <div className="icon-home-modal"></div>
            <div className="icon-music-modal"></div>
          </div>
          <div onClick={handleAdClose} className="bnt-game"></div>
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
          <div className="slots">
            <div className="reel" ref={(el) => (reelsRef.current[0] = el)}></div>
            <div className="reel" ref={(el) => (reelsRef.current[1] = el)}></div>
            <div className="reel" ref={(el) => (reelsRef.current[2] = el)}></div>
          </div>
        </div>
        <div className="group-bnt">
          <div className="bg-bonus">
            {/* <span className="bonus-text">{score} ฿</span> */}
          </div>
          <div
            aria-label="Play again."
            onClick={rollAll}
            // disabled={score >= 100}
            className="bt-spin"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
