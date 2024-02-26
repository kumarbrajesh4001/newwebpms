import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalView from "../../../components/modalView";
import HrWFHList from "./HrWFHList";
import HrWFHStatus from "./HrWFHStatus";
import { getRequest, postRequest } from "../../../services";
import { API_URL, getWFHList } from "../../../constant/apiUrls";
import Loader from "../../../components/loader";
import getSearchUsers from "../../../helpers/sorting";
import ErrorSnackBar from "../../../components/snackBar/ErrorSnackBar";
import DateCalender from "../../../components/dataCalender";
import { endDateMonth, startDateMonth } from "../../../formatter/date";
import moment from "moment";
// import getSearchingData from "../../../helpers/searching";

const WFH = (props) => {
  const {
    showLeftNav,
    showLeavesWfhStatus,
    searchTerm,
    setSearchTerm,
    setIsLoading,
    setSnackbarOpen,
    filteredData,
    handleSearch,
    notiFunc,
  } = props;

  const [wfhList, setWfhList] = useState({});

  const [openLeavePopup, setOpenLeavePopup] = useState(false);
  const [approveReject, setApproveReject] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [userId, setUserId] = useState();

  let [number, setNumber] = useState(0);

  const [startEndDate, setStartEndDate] = useState([
    startDateMonth(number),
    endDateMonth(number),
  ]);

  const handleClick = (id) => (event) => {
    setUserId(id);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const open = Boolean(anchorEl);

  const handleModalClose = () => setOpenLeavePopup(false);

  const dateFormate = (num) => moment(startEndDate[num]).format("MM/DD/YYYY");

  const userFilterDetails = getSearchUsers(searchTerm, filteredData, wfhList);

  const pendingWFH =
    userFilterDetails?.data
      ?.filter((item) => item?.status === "Pending")
      .filter(
        (cv) =>
          cv?.date_commasepreted.split(",")[0] >= dateFormate(0) &&
          cv?.date_commasepreted.split(",")[0] <= dateFormate(1)
      ) || [];
  const confirmWFH =
    userFilterDetails?.data
      ?.filter((item) => item?.status !== "Pending")
      .filter(
        (cv) =>
          cv?.date_commasepreted.split(",")[0] >= dateFormate(0) &&
          cv?.date_commasepreted.split(",")[0] <= dateFormate(1)
      ) || [];

  // const handleSnackClose = () => {
  //   setSnackbarOpen({ setopen: false });
  // };

  const getWFHUsers = () => {
    setIsLoading(true);
    getRequest(getWFHList(0, 1000))
      .then((res) => {
        setWfhList({
          ...res.data,
          data: res.data.data.sort((a, b) => b.id - a.id), ///below code uses after check
          // .filter(
          //   (cv, ind, arr) =>
          //     arr.findIndex(
          //       (cv1) => cv1.date_commasepreted === cv.date_commasepreted
          //     ) === ind
          // ),
        });
      })
      .finally(() => setIsLoading(false));
  };

  const approvedRejected = (descrip) => {
    setIsLoading(true);
    postRequest(API_URL.WFH_APPROVED_REJECT, {
      id: userId,
      comment: descrip,
      operationType: approveReject,
    })
      .then(() => {
        setSnackbarOpen({
          setopen: true,
          message: `Wfh request is ${approveReject} `,
          // severity: approveReject === "Approved" ? "success" : "error", //when uses then used
          severity: "success",
        });
        getWFHUsers();
        setSearchTerm("");
        notiFunc();
      })
      .catch((err) => {
        setSnackbarOpen({
          setopen: true,
          message: "Something is went wrong",
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWFHUsers();
  }, []);

  return (
    <>
      <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2 px-4`}>
        <span className="main-heading color-2E3192">
          {showLeavesWfhStatus === "wfhList" ? "Pending WFH" : "WFH Status"}
        </span>
        <div className="d-flex justify-content-between mt-3">
          <div className="width-28">
            <DateCalender
              number={number}
              setNumber={setNumber}
              startEndDate={startEndDate}
              setStartEndDate={setStartEndDate}
              hidden="lwd"
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Search"
              className="leaveInput-search_Bar ps-2"
              onChange={handleSearch(wfhList)}
              value={searchTerm}
            />
            <span className="empList-search">
              <SearchIcon className="color-2E3192" />
            </span>
          </div>
          {/* when need for Apply New Leave then uses */}
          {/* <div className="align-self-center">
            <span
              className="apply-pro-save-btn color-FFFFFF fontWeight-600 pointer-cur px-3 py-2"
              onClick={() => setOpenLeavePopup(true)}
            >
              Apply New Leave
            </span>
          </div> */}
        </div>

        {/* <div className="d-flex justify-content-between mt-5">
          <span className="main-heading color-2E3192">
            {showLeavesWfhStatus === "wfhList" ? "Pending WFH" : "WFH Status"}
          </span>
          <div className="form-field">
            <input
              type="text"
              placeholder="Search"
              className="leaveInput-search_Bar ps-2"
              onChange={handleSearch(wfhList)}
              value={searchTerm}
            />
            <span className="empList-search">
              <SearchIcon className="color-2E3192" />
            </span>
          </div>
        </div> */}

        <div className="section-background-shadow-radius">
          {showLeavesWfhStatus === "wfhList" && (
            <HrWFHList
              handleClick={handleClick}
              pendingWFH={pendingWFH}
              // opensnackbar={opensnackbar}
            />
          )}
          {showLeavesWfhStatus === "wfhStatus" && (
            <HrWFHStatus confirmWFH={confirmWFH} />
          )}
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
          <div className="py-1">
            <div
              id="approve"
              className="pointer-cur popUp_app_rej width-100 mt-1 px-3 py-2"
              onClick={(e) => {
                setApproveReject(e.target.innerText);

                setOpenLeavePopup(true);
              }}
            >
              <CheckCircleIcon fontSize="small" className="me-2" />
              Approved
            </div>
            <div
              id="reject"
              className="mt-2 pointer-cur popUp_app_rej width-100 px-3 py-2 mb-1"
              onClick={(e) => {
                setApproveReject(e.target.innerText);
                setOpenLeavePopup(true);
              }}
            >
              <CancelIcon fontSize="small" className="me-2" />
              Rejected
            </div>
          </div>
        </Popover>
        {/* <ErrorSnackBar
          opensnackbar={opensnackbar}
          handleClose={handleSnackClose}
        /> */}
      </div>

      <ModalView
        open={openLeavePopup}
        handleModalClose={handleModalClose}
        title="Comments"
        primaryLabel="Confirm"
        secondaryLabel="Cancel"
        approvedRejected={approvedRejected}
        setAnchorEl={setAnchorEl}
      />

      {/* <Loader open={isLoading} size={70} /> */}
    </>
  );
};

export default WFH;
