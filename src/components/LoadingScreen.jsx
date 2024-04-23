import React from "react";
import Progressbar from "../components/Progressbar";

function LoadingScreen({ progress }) {
  // รับค่า progress เข้ามาผ่าน props
  return (
    <React.Fragment>
      <div className="loading-screen">
        <h1>Loading...</h1>
        <div className="col-md-6">
          <Progressbar value={progress} />{" "}
          {/* ส่งค่า progress เข้าไปให้ Progressbar */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoadingScreen;
