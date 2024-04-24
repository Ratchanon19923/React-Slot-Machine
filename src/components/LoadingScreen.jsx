import React from "react";
import Progressbar from "../components/Progressbar";

function LoadingScreen({ progress }) {
  // รับค่า progress เข้ามาผ่าน props
  return (
    <div className="session-box">
      <div className="background-Loading">
        <React.Fragment>
          <div className="loading-screen">
            <img src="../src/images/load.png" className="logo-load" />
            <div className="col-md-6">
              <Progressbar value={progress} />{" "}
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default LoadingScreen;
