import React, { useState } from "react";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import PersonIcon from "@mui/icons-material/Person";
import DeckIcon from "@mui/icons-material/Deck";
import HouseIcon from "@mui/icons-material/House";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import PeopleIcon from "@mui/icons-material/People";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import TimerSharpIcon from "@mui/icons-material/TimerSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import back_button from "../../../assets/back-button.png";
import forward_button from "../../../assets/forward-button.png";

const LeftNavbar = (props) => {
  const {
    showLeftNav,
    setShowLeftNav,
    setShowRightNav,
    showRightNav,
    setIsEmpList,
    setShowLeavesWfhStatus,
    setSearchTerm,

    knowledgeDash,
    setKnowledgeDash,
    setShowKnowledge,
    showKnowledge,
    showGroupWiseKnowledge,
  } = props;

  const [showLeavesBtn, setShowLeavesBtn] = useState(false);
  const [showWFHBtn, setShowWFHBtn] = useState(false);

  const openPopupOnMouseOver = (activity) => () => {
    if (activity === "hrLeave") {
      setShowLeavesBtn(!showLeavesBtn);
      setShowWFHBtn(false);
    } else if (activity === "wfh") {
      setShowWFHBtn(!showWFHBtn);
      setShowLeavesBtn(false);
    } else {
      setShowLeavesBtn(false);
      setShowWFHBtn(false);
    }
  };

  return (
    <div
      className={`${
        showLeftNav ? "width-18per" : "width-7per text-center"
      } background-F7F7F7 ps-4 pe-3 py-2 position-relative1 sidebar`}
    >
      {showLeftNav ? (
        <img
          src={back_button}
          alt="back_button"
          className="leftNav-expand-btn pointer-cur"
          onClick={() => {
            setShowLeftNav(false);
          }}
        />
      ) : (
        <img
          src={forward_button}
          alt="forward_button"
          className="leftNav-expand-btn pointer-cur"
          onClick={() => {
            setShowLeftNav(true);
          }}
        />
      )}

      <div
        className={`hr-leftNav ${
          showRightNav === "dashboard" && "background-2E3192 text-white"
        }  mb-4 mt-5 py-1`}
        onClick={() => {
          setShowRightNav("dashboard");
          setKnowledgeDash(false);
        }}
      >
        <GridViewSharpIcon fontSize="small" className="ms-1" />
        {showLeftNav && <span className="ms-2">Dashboard </span>}
      </div>
      <div
        className={`hr-leftNav ${
          showRightNav === "employeeList" && "background-2E3192 text-white"
        }  my-4 py-1`}
        onClick={() => {
          setShowRightNav("employeeList");
          setIsEmpList(true);
          setKnowledgeDash(false);
        }}
      >
        {/* <PersonIcon className="ms-1" /> */}
        <PeopleIcon className="ms-1" />

        {showLeftNav && <span> Employees </span>}
      </div>

      <div
        className={`hr-leftNav ${
          showRightNav === "holidays" && "background-2E3192 text-white"
        }  my-4 py-1`}
        onClick={() => {
          setShowRightNav("holidays");
          setKnowledgeDash(false);
        }}
      >
        <FastfoodIcon className="ms-1" />

        {showLeftNav && <span className="ms-2">Holidays</span>}
      </div>

      <div
        className={`hr-leftNav d-flex justify-content-${
          showLeftNav ? "between" : "center"
        } position-relative ${
          showRightNav === "leaves" && "background-2E3192 text-white"
        }  my-4 py-1`}
        onMouseEnter={openPopupOnMouseOver("hrLeave")}
        onMouseLeave={openPopupOnMouseOver("leave")}
      >
        <span>
          <LogoutSharpIcon fontSize="small" className="ms-1" />
          {showLeftNav && <span className="ms-2">Leaves </span>}
        </span>
        {showLeftNav && <ExpandMoreIcon />}
        {showLeavesBtn && (
          <div
            className={`leave-wfh-popup shadow ${
              showLeftNav ? "width-100" : "width-left text-start"
            } `}
          >
            <div
              className="hr-leftNav p-2 mt-1"
              onClick={() => {
                setShowLeavesWfhStatus("leaveList");
                setSearchTerm("");
                setShowRightNav("leaves");
                setShowLeavesBtn(false);
                setKnowledgeDash(false);
              }}
            >
              Pending Leaves
            </div>
            <div
              className="hr-leftNav p-2 mb-1"
              onClick={() => {
                setShowLeavesWfhStatus("leaveStatus");
                setShowRightNav("leaves");
                setShowLeavesBtn(false);
                setSearchTerm("");
                setKnowledgeDash(false);
              }}
            >
              Leave Status
            </div>
          </div>
        )}
      </div>

      <div
        className={`hr-leftNav d-flex justify-content-${
          showLeftNav ? "between" : "center"
        } position-relative ${
          showRightNav === "wfh" && "background-2E3192 text-white"
        }  my-4 py-1`}
        onMouseEnter={openPopupOnMouseOver("wfh")}
        onMouseLeave={openPopupOnMouseOver("leave")}
      >
        <span>
          <HouseIcon fontSize="small" className="ms-1" />
          {showLeftNav && <span className="ms-2">Work From Home</span>}
        </span>
        {showLeftNav && <ExpandMoreIcon />}

        {showWFHBtn && (
          <div
            className={`leave-wfh-popup shadow ${
              showLeftNav ? "width-100" : "width-left text-start"
            } `}
          >
            <div
              className="hr-leftNav p-2 mt-1"
              onClick={() => {
                setShowLeavesWfhStatus("wfhList");
                setShowRightNav("wfh");
                setShowWFHBtn(false);
                setSearchTerm("");
                setKnowledgeDash(false);
              }}
            >
              Pending WFH
            </div>
            <div
              className="hr-leftNav p-2 mb-1"
              onClick={() => {
                setShowLeavesWfhStatus("wfhStatus");
                setShowRightNav("wfh");
                setShowWFHBtn(false);
                setSearchTerm("");
                setKnowledgeDash(false);
              }}
            >
              WFH Status
            </div>
          </div>
        )}
      </div>

      <div
        className={`hr-leftNav d-flex justify-content-${
          showLeftNav ? "between" : "center"
        } position-relative ${
          showRightNav === "knowledge" && "background-2E3192 text-white"
        }  my-4 py-1`}
        onClick={() => {
          setShowKnowledge(!showKnowledge);

          setShowRightNav("knowledge");
          if (knowledgeDash) {
            setKnowledgeDash(false);
          }
        }}
      >
        <span>
          <DocumentScannerIcon fontSize="small" className="ms-1" />
          {showLeftNav && <span className="ms-2">Knowledge Base</span>}
        </span>
        {/* {showLeftNav &&
          (showKnowledge ? <ExpandLessIcon /> : <ExpandMoreIcon />)}

        {showKnowledge  && (
          <div
            className={`leave-wfh-popup scrll-y max-height-15
           
            
            shadow ${showLeftNav ? "width-100" : "width-left text-start"} `}
          >
            <div
              className="hr-leftNav p-2 mt-1 ps-3"
              onClick={showGroupWiseKnowledge("All")}
            >
              All
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("AIS HR")}
            >
              AIS HR
            </div>


            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Ais Sales Inbound")}
            >
              Ais Sales Inbound
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Ais Sales Outreach")}
            >
              Ais Sales Outreach
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Ais Sales Portal")}
            >
              Ais Sales Portal
            </div>


  

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("AIS Sales")}
            >
              AIS Sales
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Alliance Delivery")}
            >
              Alliance Delivery
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Alliance Franchise")}
            >
              Alliance Franchise
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Alliance HR")}
            >
              Alliance HR
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Alliance Operations")}
            >
              Alliance Operations
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Alliance Sales")}
            >
              Alliance Sales
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("BA")}
            >
              BA
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Design")}
            >
              Design
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("HTML")}
            >
              HTML
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Laravel")}
            >
              Laravel
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Mobile")}
            >
              Mobile
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Node")}
            >
              Node
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("PM")}
            >
              PM
            </div>

            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("QA")}
            >
              QA
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("React JS")}
            >
              React JS
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("React Native")}
            >
              React Native
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Seo")}
            >
              SEO
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Unity")}
            >
              Unity
            </div>
            <div
              className="hr-leftNav p-2 mb-1 ps-3"
              onClick={showGroupWiseKnowledge("Wordpress")}
            >
              Wordpress
            </div>
          </div>
        )} */}
      </div>

      {/* 
      <div
        className={`hr-leftNav ${
          showRightNav === "knowledge" && "background-2E3192 text-white"
        }  my-4 py-1`}
        onClick={() => {
          setShowRightNav("knowledge");
        }}
      >
        <DocumentScannerIcon className="ms-1" />

        {showLeftNav && <span className="ms-2">Knowledge Base</span>}
      </div> */}
    </div>
  );
};

export default LeftNavbar;
