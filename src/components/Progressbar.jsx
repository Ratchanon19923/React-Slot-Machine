import React, { useEffect, useState } from "react";

export default function Progressbar({ value = 0, tabLoading }) {
  const [percent, setPercent] = useState(0);
  const [iconLeft, setIconLeft] = useState(0); // ตำแหน่งเริ่มต้นของไอคอนเวลา

  useEffect(() => {
    const timer = setTimeout(() => {
      if (percent < value) {
        setPercent((prevPercent) => prevPercent + 1);
        setIconLeft((prevLeft) => prevLeft + 0.2); // เพิ่มค่าตำแหน่งให้ไอคอนเวลาเคลื่อนไหวไปทางขวา
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [percent, value]);

  useEffect(() => {
    if (value < 0 || value > 100) {
      console.error("Invalid value: value must be between 0 and 100");
    } else {
      setPercent(value);
    }
  }, [value]);

  return (
    <div className="progressbar">
      <div className="progressbarfill" style={{ width: `${percent}%` }}></div>
      <img
        src="../../src/images/logo1.png"
        className="time-icon"
        alt="Time Icon"
        style={{ left: `${percent}%` }}
      />
    </div>
  );
}
