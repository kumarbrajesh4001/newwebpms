import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Popover from "@mui/material/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment";
import ModalView from "../../../components/modalView";
import PendingLeaves from "./PendingLeaves";
import LeavesStatus from "./LeavesStatus";
import { getRequest, postRequest } from "../../../services";
import { API_URL, getAllUserLeaveList } from "../../../constant/apiUrls";
import getSearchUsers from "../../../helpers/sorting";
import Loader from "../../../components/loader";
import ErrorSnackBar from "../../../components/snackBar/ErrorSnackBar";
// import getSearchingData from "../../../helpers/searching";
import DateCalender from "../../../components/dataCalender";
import { endDateMonth, startDateMonth } from "../../../formatter/date";
import { paddingConfirmLeave } from "./hrLeaves.helper";

const HrLeaves = (props) => {
  const {
    showLeftNav,
    showLeavesWfhStatus,
    searchTerm,
    setSearchTerm,
    setIsLoading,
    setSnackbarOpen,
    filteredData,
    setFilteredData,
    handleSearch,
    notiFunc,
  } = props;

  const [allUsersLeaveList, setAllUsersLeaveList] = useState({});

  

  let [number, setNumber] = useState(0);

  const [startEndDate, setStartEndDate] = useState([
    startDateMonth(number),
    endDateMonth(number),
  ]);

  // const [filteredData, setFilteredData] = useState({});

  const [isShorting, setIsShorting] = useState(false);
  const [expandLessMore, setExpandLessMore] = useState(true);

  const [openLeavePopup, setOpenLeavePopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const [opensnackbar, setSnackbarOpen] = useState({});

  const [approveReject, setApproveReject] = useState(false);
  const [userId, setUserId] = useState();

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

  const userFilterDetails = getSearchUsers(
    searchTerm,
    filteredData,
    allUsersLeaveList
  );

  // const pendingUsers =
  //   userFilterDetails?.data
  //     ?.filter((item) => item?.status === "Pending")
  //     .filter(
  //       (cv) =>
  //         cv?.date_commasepreted.split(",")[0] >= dateFormate(0) &&
  //         cv?.date_commasepreted.split(",")[0] <= dateFormate(1)
  //     ) || [];

  // const confirmUsers =
  //   userFilterDetails?.data
  //     ?.filter((item) => item?.status !== "Pending")
  //     .filter(
  //       (cv) =>
  //         cv?.date_commasepreted.split(",")[0] >= dateFormate(0) &&
  //         cv?.date_commasepreted.split(",")[0] <= dateFormate(1)
  //     ) || [];

 

  const getLeaveUsers = () => {
    setIsLoading(true);
    getRequest(getAllUserLeaveList(0, 1000))
      .then((res) => {
        setAllUsersLeaveList({
          ...res.data,
          data: res.data.data.sort((a, b) => b.id - a.id),
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
    postRequest(API_URL.LEAVE_APPROVED_REJECT, {
      id: userId,
      comment: descrip.trim(),
      operationType: approveReject,
    })
      .then(() => {
        setSnackbarOpen({
          setopen: true,
          message: `Leave request is ${approveReject}`,
          severity: "success",
          // severity: approveReject === "Approved" ? "success" : "error", ///when use then it use
        });
        getLeaveUsers();
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
    getLeaveUsers();
  }, []);

  return (
    <>
      <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2 px-4`}>
        <span className="main-heading color-2E3192">
          {showLeavesWfhStatus === "leaveList"
            ? "Pending Leaves"
            : "Leave Status"}
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
              onChange={handleSearch(allUsersLeaveList)}
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

        <div className="section-background-shadow-radius">
          {showLeavesWfhStatus === "leaveList" && (
            <PendingLeaves
              handleClick={handleClick}
              pendingUsers={paddingConfirmLeave(userFilterDetails?.data,startEndDate,true)}
              isShorting={isShorting}
              expandLessMore={expandLessMore}
              setIsShorting={setIsShorting}
              setExpandLessMore = {setExpandLessMore}
              setUserDetailsPage={setAllUsersLeaveList}
              setFilteredData={setFilteredData}
              searchTerm={searchTerm}
              // isLoading={isLoading}
            />
          )}

          {showLeavesWfhStatus === "leaveStatus" && (
            <LeavesStatus
              confirmUsers={paddingConfirmLeave(userFilterDetails?.data,startEndDate,false)}
              //  isLoading={isLoading}
            />
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
      {/* <ErrorSnackBar
        opensnackbar={opensnackbar}
        handleClose={handleSnackClose}
      />
      <Loader open={isLoading} size={70} /> */}
    </>
  );
};

export default HrLeaves;
