import { useState, useEffect } from 'react';
import '../css/style.css';


function Home() {
    const [position, setPosition] = useState([0, 0, 0]);
    const [winner, setWinner] = useState(null);
    const [score, setScore] = useState(0);



    useEffect(() => {
        if (position.length === 3) {
            const first = position[0];
            const results = position.every(match => match === first);
            setWinner(results);
        }
    }, [position]);

    const handleClick = () => {
        setPosition([]);
        finishHandler();
    };

    const finishHandler = () => {
        const newPositions = Array.from({ length: 3 }, () => {
            const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
            const iconHeight = 188;
            const speed = iconHeight * multiplier;
            const start = (Math.floor(Math.random() * 9) * iconHeight) * -1;
            return start;
        });
        setPosition(newPositions);

        if (position.length === 3) {
            const one = position[0];
            const two = position[1];
            const three = position[2];
            if (position.every(match => match === one)) {
                setScore(score + 10);
                setWinner(true);
            }
            if (position.every(match => match === two)) {
                setScore(score + 10);
                setWinner(true);
            }
            if (position.every(match => match === three)) {
                setScore(score + 10);
                setWinner(true);
            }
            if (position[0] === position[1]) {
                setScore(score + 1);
                setWinner(false);
            }
            if (position[0] === position[2]) {
                setScore(score + 1);
                setWinner(false);
            }
            if (position[1] === position[2]) {
                setScore(score + 1);
                setWinner(false);
            }
        }
    };

    console.log("position", position);
    console.log("score", score);
    console.log("winner", winner);

    return (
        <div>
            <h1 style={{ color: 'white' }}>
                {winner === null ? 'Waiting…' : winner === true ? '🤑 Win! 🤑' : 'Lost'}
            </h1>
            <div className={`spinner-container`}>
                <div style={{ backgroundPosition: '0px ' + position[0] + 'px' }} className={`icons`} />
                <div style={{ backgroundPosition: '0px ' + position[1] + 'px' }} className={`icons`} />
                <div style={{ backgroundPosition: '0px ' + position[2] + 'px' }} className={`icons`} />
            </div>
            <button aria-label='Play again.' onClick={handleClick}>spin</button>
            <div className='money-t'>คะแนน: {score}</div>
        </div>
    );
}

export default Home;