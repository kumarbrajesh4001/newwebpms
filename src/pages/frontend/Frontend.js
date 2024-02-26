import React, { useState } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

const Frontend = (props) => {
  const { setToken, setShowRightNav,setShowLeavesWfhStatus,setIsEmpDetail,number,setNumber,startEndDate,setStartEndDate} = props;

  

  const [profileShow, setProfileShow] = useState(false);

  return (
    <div
      onClick={() => {
        profileShow && setProfileShow(false);
      }}
    >
      <Header
        setToken={setToken}
        profileShow={profileShow}
        setProfileShow={setProfileShow}
        setShowRightNav={setShowRightNav}
        setShowLeavesWfhStatus={setShowLeavesWfhStatus}
        setIsEmpDetail={setIsEmpDetail} 
        number={number}
        setNumber={setNumber}
        startEndDate={startEndDate}
        setStartEndDate={setStartEndDate}
       
      />
      <Outlet />
      <Footer />
    </div>
  );
};

Frontend.propTypes = {
  setToken: PropTypes.func,
  isLoading: PropTypes.bool,
};
Frontend.defaultProps = {
  setToken: noop,
  isLoading: false,
};

export default Frontend;
