import React from "react";
import Progressbar from "../components/Progressbar";

function LoadingScreen({ progress }) {
  // รับค่า progress เข้ามาผ่าน props
  return (
    <div className="background-box-load">
      <div className="session-box">
        <div className="sesion-box-top">
          <React.Fragment>
            <div className="loading-screen">
              <img src="../src/images/load.png" className="logo-load" />
              <div className="col-md-6">
                <Progressbar value={progress} />{" "}
                {/* ส่งค่า progress เข้าไปให้ Progressbar */}
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
