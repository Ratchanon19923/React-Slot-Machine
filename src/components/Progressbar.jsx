import React, { useEffect, useState } from "react";

export default function Progressbar({ value = 0 }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (percent < value) {
        setPercent((prevPercent) => prevPercent + 1);
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
    <React.Fragment>
      <div className="progressbar">
        <div className="progressbarfill" style={{ width: `${percent}%` }} />
      </div>
    </React.Fragment>
  );
}
