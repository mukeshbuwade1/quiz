import React, { memo, useEffect, useState } from 'react'

function Timer({  setTimesUp }) {
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const countDownTime = Date.now() + 61000;
        let interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                setTime({ minutes: 0, seconds: 0 });
                setTimesUp(true)
                clearInterval(interval);
            } else {
                setTime({ minutes, seconds, distance });
            }
        }, 1000);
        return () => clearInterval(interval)
    }, [])
    return (
        <span 
        className={"right valid"}
        style={{
            textAlign:"center"
        }}
        >
            {time?.minutes}:{time?.seconds}         
            <span className="mdi mdi-clock-outline mdi-24px"></span>
        </span>

    )
}

export default memo(Timer)