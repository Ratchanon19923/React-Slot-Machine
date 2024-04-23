import React, { useState, useEffect, useRef } from "react";
import "../css/style.css";
import LoadingScreen from "./LoadingScreen";
import imggame from "../assets/gamespin.png"

function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    // Mapping of indexes to icons
    // const iconMap = ["กบเหลือง", "มิททราย", "เเดง", "เขียว", "อุกาบาต", "กบเขียว", "จรวด", "lsm", "ยาน"]
    const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
    const icon_width = 79;
    const icon_height = 270;
    const num_icons = 9;
    const indexes = [0, 0, 0];
    const time_per_icon = 100;

    const reelsRef = useRef([]);


    useEffect(() => {

        const timer = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 1);
            } else {
                clearInterval(timer);
                setIsLoading(false);
            }
        }, 20);
        return () => clearInterval(timer);
    }, [progress, isLoading]);





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
                indexes.map((index) => console.log(iconMap[index]));
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

    // Kickoff
    // setTimeout(rollAll, 1000);
    // reelsList.forEach((reel, i) => {
    //     console.log(reel, i);
    //     roll(reel, i).then((delta) => { console.log(delta); })
    // });

    // useEffect(() => {
    //     rollAll();
    // }, []);

    // if (isLoading) {
    //     return <LoadingScreen progress={progress} />;
    // }

    return (
        <>
            <div className="slots">
                <div className="reel" ref={(el) => (reelsRef.current[0] = el)}></div>
                <div className="reel" ref={(el) => (reelsRef.current[1] = el)}></div>
                <div className="reel" ref={(el) => (reelsRef.current[2] = el)}></div>
            </div>
            <button onClick={rollAll}>spin</button>
            <img className="imggame" src={imggame} />
            {/* <div id="debug" className="debug"></div> */}
        </>
    );
}

export default Home;
