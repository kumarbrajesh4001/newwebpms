import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@mui/material/Pagination";
import Popover from "@mui/material/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalView from "../../../components/modalView";
import WFHList from "./WFHList";
import WFHStatus from "./WFHStatus";

const WFH = (props) => {
  const { showLeftNav, showLeavesWfhStatus } = props;

  const [openLeavePopup, setOpenLeavePopup] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const statuses = ["Please Choose...", "Active", "Inactive", "Pending"];

  const wfhDetails = [
    "Pseudo Name",
    "Employee Name",
    "From Date",
    "To Date",
    "",
  ];

  const wfhLists = [
    "Jonny",
    "Olive",
    "01/01/23",
    "03/03/23",
    <MoreVertIcon className="color-000000 pointer-cur" onClick={handleClick} />,
  ];

  const handleModalClose = () => setOpenLeavePopup(false);

  return (
    <>
      <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2 px-4`}>
        <div className="d-flex justify-content-between mt-5">
          <div className="form-field">
            <input
              type="text"
              placeholder="Search"
              className="leaveInput-search_Bar ps-2"
            />
            <span className="empList-search">
              <SearchIcon className="color-2E3192" />
            </span>
          </div>

          {/* <div className="align-self-center">
            <span
              className="apply-pro-save-btn color-FFFFFF fontWeight-600 pointer-cur px-3 py-2"
              onClick={() => setOpenLeavePopup(true)}
            >
              Apply New Leave
            </span>
          </div> */}
        </div>

        <div className="section-background-shadow-radius">
          {showLeavesWfhStatus === "wfhList" && (
            <WFHList handleClick={handleClick} />
          )}
          {showLeavesWfhStatus === "wfhStatus" && <WFHStatus />}

          <div className="d-flex justify-content-between pb-3 pt-2 mt-3">
            <Pagination
              count={10}
              showFirstButton
              showLastButton
              shape="rounded"
            />
            <span className="hr-secTxt mt-1">1 of 20 pages (70 items) </span>
          </div>
        </div>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* <div className="p-3 empList-txt">
            <div
              className="pointer-cur"
              onClick={() => {
                setOpenLeavePopup(true);
              }}
            >
              <CheckCircleIcon fontSize="small" className="me-2" />
              Approve
            </div>
            <div
              className="mt-2 pointer-cur"
              onClick={() => {
                setOpenLeavePopup(true);
              }}
            >
              <CancelIcon fontSize="small" className="me-2" />
              Reject
            </div>
          </div> */}

          <div className="py-1">
            <div
              className="pointer-cur popUp_app_rej width-100 mt-1 px-3 py-2"
              onClick={() => {
                setOpenLeavePopup(true);
              }}
            >
              <CheckCircleIcon fontSize="small" className="me-2" />
              Approve
            </div>
            <div
              className="mt-2 pointer-cur popUp_app_rej width-100 px-3 py-2 mb-1"
              onClick={() => {
                setOpenLeavePopup(true);
              }}
            >
              <CancelIcon fontSize="small" className="me-2" />
              Reject
            </div>
          </div>
        </Popover>
      </div>

      <ModalView
        open={openLeavePopup}
        handleModalClose={handleModalClose}
        title="Comments"
        primaryLabel="Confirm"
        secondaryLabel="Cancel"
      />
    </>
  );
};

export default WFH;
