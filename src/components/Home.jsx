import { useState, useEffect } from 'react';
import '../css/style.css';

function Home() {
    const [position, setPosition] = useState([]);
    const [count, setCount] = useState(0);
    const iconHeight = 188;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const speed = iconHeight * multiplier;
    const [winner, setWinner] = useState(false);
    const [score, setScore] = useState(0);

    const positions = [-940, -188, -0, -376, -1316, -1504, -564, -752, -1128];

    const scores = [50, 100, 150, 200, 250, 300, 350, 400, 450];

    useEffect(() => {
        finishHandler();
    }, []);

    useEffect(() => {
        if (position.length === 3) {
            const first = position[0];
            const results = position.every(match => match === first);
            setWinner(results);
            if (results) {
                const index = positions.findIndex(pos => pos === first);
                const positionScore = scores[index];
                setScore(prevScore => prevScore + positionScore);
            }
        }
        // if (count > 0) {
        //     if (score <= 1000) {
        //         handleClick();
        //     }
        // }


    }, [position]);

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

    return (
        <>
            <div className={`spinner-container`}>
                {position.map((pos, index) => (
                    <div key={index} style={{ backgroundPosition: '0px ' + pos + 'px' }} className={`icons`} />
                ))}
            </div>
            <div>
                <h2 style={{ color: 'white' }}>จำนวนครั้งที่กดได้: {count}</h2>
                <h1 style={{ color: winner ? 'green' : 'red' }}>
                    {winner ? 'Winner!' : 'Loss'}
                </h1>
                <h2 style={{ color: 'white' }}>คะแนน: {score >= 1000 && "1000"}</h2>
                <button aria-label='Play again.' onClick={handleClick} disabled={score >= 1000} className='bt-spin'>spin</button>
            </div>



        </>
    );
}

export default Home;
