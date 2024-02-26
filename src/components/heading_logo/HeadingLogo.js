import React from "react";
import aisLogo from "../../assets/ais-logo.png";
import styles from "./headingLogo.module.css";

function HeadingLogo() {
  return (
    <div
      className={`col-12 col-md-6 ${styles.head} d-flex align-items-center justify-content-center`}
    >
      <div>
        <img src={aisLogo} alt="Ais-logo" width={520 } height={240} />
        <div className="color-000000">WELCOME TO</div>
        <div className="color-2E3192">AIS TECHNOLABS</div>
      </div>
    </div>
  );
}

export default HeadingLogo;
