import React from "react";
import footerLogo from "../../assets/footer logo.png";

const Footer = () => {
  return (
    <div className="background-FFFFFF simple-heading color-000000 footer-height pt-2">
      <div> Powered by AIS Technolabs </div>
      <img src={footerLogo} alt="footer logo" width={113} height={45} />
    </div>
  );
};

export default Footer;
