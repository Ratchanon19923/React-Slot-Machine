import React, { useState, useEffect, useRef } from "react";
import "../css/style.css";
import LoadingScreen from "./LoadingScreen";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false); // เริ่มต้นโชว์โฆษณาเป็น false

  // const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
  const icon_width = 350;
  const icon_height = 300;
  const num_icons = 9;
  const indexes = [0, 0, 0];
  const time_per_icon = 100;

  const reelsRef = useRef([]);


  const roll = (reel, offset = 0) => {
    const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    console.log(delta);
    if (reel) {

      const style = getComputedStyle(reel);
      const backgroundPositionY = parseFloat(style['background-position-y']);

      return new Promise((resolve, reject) => {
        reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
        // After animation

        setTimeout(() => {
          // Resolve this promise
          resolve(delta % num_icons);
        }, (8 + 1 * delta) * time_per_icon + offset * 150);
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
        console.log("deltas", deltas);
        // add up indexes
        deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);
        console.log(indexes);
        // indexes.map((index) => console.log(iconMap[index]));
        // // Win conditions
        // if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
        //     const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
        //     document.querySelector(".slots").classList.add(winCls);
        //     setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
        // }

        // Again!
        // setTimeout(rollAll, 3000);
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
      <div className="ad-container">
        <div className="background-box">
          <div className="sesion-box-top">
            <img
              src="../src/images/bnt.png"
              alt="ปิด"
              onClick={handleAdClose}
              className="bnt-game"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="background-box-">
      <div className="session-box">
        <div className="logo-head"></div>
        <div className="spinner-container">
          <div className="slots">
            <div className="reel" ref={(el) => (reelsRef.current[0] = el)}></div>
            <div className="reel" ref={(el) => (reelsRef.current[1] = el)}></div>
            <div className="reel" ref={(el) => (reelsRef.current[2] = el)}></div>
          </div>
        </div>
        <div>
          {/* <h2 className="bg-bonus">{score}</h2> */}
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
