import React, { useState } from "react";
// import moment from "moment";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { postRequest } from "../../services";
import { API_URL } from "../../constant/apiUrls";
import Loader from "../loader";
import STORAGE_KEY from "../../constant/storageKey";
import { getDataFromLocalStorage } from "../../helpers/localStorage";
import saprateDate from "./module.helper";
import { currentMonth, getFirstDaysMonth } from "../../formatter/date";
import SelectShow from "../selectShow";
import { useSelector } from "react-redux";

// sunny@aistechnolabs.com hermit@aistechnolabs.com

const sltOption = [
  {
    value: "All",
    label: "All",
    email:
      "shweta@aistechnolabs.com,andru@alliancerecruitmentagency.com,kelvin@aistechnolabs.com,steve@aistechnolabs.com,nik@aistechnolabs.com,zerlyn@aistechnolabs.com,melvin@aistechnolabs.com,dan@aistechnolabs.com,kate@aistechnolabs.com,jeff@aistechnolabs.com,philbert@aistechnolabs.com,neil@aistechnolabs.com,albert@aistechnolabs.com,richard@aistechnolabs.com,hana@aistechnolabs.com,stanley@aistechnolabs.com",
  },
  { value: "Max", label: "Max", email: "" },
  { value: "Neha", label: "Neha", email: "" },
  { value: "Andru", label: "Andru", email: "andru@alliancerecruitmentagency.com" },
  { value: "Aayushi", label: "Aayushi", email: "aayushi@allianceinternational.co.in" },
  { value: "Shweta", label: "Shweta", email: "shweta@aistechnolabs.com" },
  { value: "Kevin", label: "Kevin", email: "kevin@aistechnolabs.com" },
  { value: "Steve", label: "Steve", email: "steve@aistechnolabs.com" },
  { value: "Nik", label: "Nik", email: "nik@aistechnolabs.com" },
  { value: "Zerlyn", label: "Zerlyn", email: "zerlyn@aistechnolabs.com" },
  { value: "Melvin", label: "Melvin", email: "melvin@aistechnolabs.com" },
  { value: "Dan", label: "Dan", email: "dan@aistechnolabs.com" },
  { value: "Kate", label: "Kate", email: "kate@aistechnolabs.com" },
  { value: "Jeff", label: "Jeff", email: "jeff@aistechnolabs.com" },
  { value: "Philbert", label: "Philbert", email: "philbert@aistechnolabs.com" },
  { value: "Neil", label: "Neil", email: "neil@aistechnolabs.com" },
  { value: "Albert", label: "Albert", email: "albert@aistechnolabs.com" },
  { value: "Richard", label: "Richard", email: "richard@aistechnolabs.com" },
  { value: "Hana", label: "Hana", email: "hana@aistechnolabs.com" },
  { value: "Stanley", label: "Stanley", email: "stanley@aistechnolabs.com" },
];

function ModalView(props) {
  const {
    open,
    handleModalClose,
    title,
    primaryLabel,
    secondaryLabel,
    setSnackbarOpen,
    approvedRejected,
    setAnchorEl,
    getOneUserLeaveList,
    getOneUserWFHList,
    isLeave,
  } = props;

  const { notiFunc } = useSelector((cv) => cv.userInfoReducer);

  const [isLoading, setIsLoading] = useState(false);

  const [getShowTo, setGetShowTo] = useState([]);

  const [notEmpty, setNotEmpty] = useState("");

  const [fromDateValue, setFromDateValue] = useState(false);

  const [toDateValue, setToDateValue] = useState(false);

  const userData = getDataFromLocalStorage(STORAGE_KEY.USER_DATA);

  const leaveType = ["Please Choose ...", "Paid", "UnPaid","Comp off"];

  const dayType = [
    "Please Choose ...",
    "Full day",
    "Half day - 1st half",
    "Half day - 2nd half",
  ];

  let [wfhData, setWfhData] = useState({
    date_commasepreted: "",
    discription: "",
    notify_PM: "",
    email: [],
  });

  const [leaveData, setLeaveData] = useState({
    subject: "Apply for Leave",
    user_id: userData.id_A,
    date_commasepreted: "",
    leaveType: "",
    body: "",
    daywise_leaves: "",
    notify_PM: "",
    email: [],
  });

  const handleChangeSelectShow = (getShowTo) => {
    setGetShowTo(getShowTo || []);
    if (title === "Apply for Leave") {
      setLeaveData({
        ...leaveData,
        notify_PM: [...getShowTo?.map((cv) => cv.value)],
        email: [
          "sunny@aistechnolabs.com",
          "hermit@aistechnolabs.com",
          "hr@aistechnolabs.com",
          "max@aistechnolabs.com",
          ...getShowTo
            ?.map((cv) => (cv.value === "All" ? cv.email.split(",") : cv.email))
            .flat(),
        ],
      });
    } else {
      setWfhData({
        ...wfhData,
        notify_PM: [...getShowTo?.map((cv) => cv.value)],
        email: [
          "sunny@aistechnolabs.com",
          "hermit@aistechnolabs.com",
          "hr@aistechnolabs.com",
          "max@aistechnolabs.com",
          ...getShowTo
            ?.map((cv) => (cv.value === "All" ? cv.email.split(",") : cv.email))
            .flat(),
        ],
      });
    }
  };

  const getName = (title) => {
    if (title === "Comments") {
      return "cmt";
    } else if (title === "Apply for Leave") {
      return "body";
    } else {
      return "discription";
    }
  };

  const handleClick = (e) => {
    const name = e.target.name;
    const identify = e.target.id;

    if (name === "cmt" || name === "body" || name === "discription") {
      setNotEmpty(e.target.value);
    }

    const value = saprateDate(name, identify, e.target.value);

    identify === "from" && setFromDateValue(e.target.value);
    identify === "to" && setToDateValue(e.target.value);

    if (title === "Apply for Leave") {
      setLeaveData({
        ...leaveData,
        [name]: value,
      });
    } else if (title === "Apply for Work From Home") {
      setWfhData({
        ...wfhData,
        [name]: value,
      });
    }
  };

  const applyWfh = () => {
    setIsLoading(true);

    postRequest(API_URL.APPLY_WFH, wfhData)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: "WFH applied successfully",
          severity: "success",
        });
        getOneUserWFHList();
        setGetShowTo([]); ///for select show empty
        setWfhData({
          date_commasepreted: "",
          discription: "",
          email: [],
        });
        setNotEmpty("");
        userData.role === "super_admin" && notiFunc();
      })

      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error?.response?.data?.error,
          severity: "error",
        });
      })

      .finally(() => {
        setIsLoading(false);
        setFromDateValue(false);
        setToDateValue(false);
      });
  };

  const applyLeave = () => {
    setIsLoading(true);

    postRequest(API_URL.APPLY_LEAVE, leaveData)
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: "Leave applied successfully",
          severity: "success",
        });
        getOneUserLeaveList();
        // setFromDateValue(false);
        setGetShowTo([]); ///for select show empty
        setLeaveData({
          subject: "Apply for Leave",
          user_id: userData.id_A,
          date_commasepreted: "",
          leaveType: "",
          body: "",
          daywise_leaves: "",
          email: [],
        });
        setNotEmpty("");
        userData.role === "super_admin" && notiFunc();
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error?.response?.data?.error,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setFromDateValue(false);
        setToDateValue(false);
      });
  };

  const handleSubmit = () => {
    title === "Apply for Work From Home" && applyWfh();
    title === "Apply for Leave" && applyLeave();
    handleModalClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleModalClose();
          setFromDateValue(false);
          setToDateValue(false);
        }}
        className="montserrat-fontFamily"
      >
        <Box
          className={`modalView ${secondaryLabel ? "width-37" : "width-45"}`}
        >
          <div className="row">
            <div className="col-11 text-center leave-apply color-000000 mb-3">
              {title}
            </div>
            <div className="col-1 text-end">
              <IconButton
                size="small"
                onClick={() => {
                  handleModalClose();
                  setFromDateValue(false);
                  setToDateValue(false);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {!secondaryLabel && (
              <div className="row">
                <div className="col-6">
                  <label htmlFor="from" className="d-block label-text">
                    From<span className="color-RED">*</span>
                  </label>
                  <input
                    type="date"
                    id="from"
                    name="date_commasepreted"
                    className="input-section ps-2 pe-1 pointer-cur height-39"
                    onChange={handleClick}
                    onClick={(e) => {
                      e.target.showPicker();
                    }}
                    // min={isLeave === "Sent" ? getFirstDaysMonth : currentMonth}
                    min={getFirstDaysMonth}
                    max={toDateValue}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="to" className="d-block label-text">
                    To<span className="color-RED">*</span>
                  </label>
                  <input
                    type="date"
                    id="to"
                    name="date_commasepreted"
                    className="input-section ps-2 pe-1 pointer-cur height-39"
                    onChange={handleClick}
                    onClick={(e) => {
                      e.target.showPicker();
                    }}
                    min={fromDateValue ? fromDateValue : currentMonth}
                    required
                  />
                </div>
              </div>
            )}

            <div className="row mt-3 mb-4">
              {isLeave === "Sent" && (
                <div className="col-6">
                  <label htmlFor="leave" className="d-block label-text">
                    Leave Type<span className="color-RED">*</span>
                  </label>
                  <select
                    id="leave"
                    className="input-section ps-1 height-39"
                    name="leaveType"
                    onChange={handleClick}
                    required
                  >
                    {leaveType.map((leave, ind) => (
                      <option
                        key={ind}
                        value={ind === 0 ? "" : leave}
                        disabled={ind === 0 && true}
                        selected={ind === 0 && true}
                        hidden={ind === 0 && true}
                      >
                        {leave}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!secondaryLabel && (
                <div className={`col-6`}>
                  <label htmlFor="day" className="d-block label-text">
                    Apply For<span className="color-RED">*</span>
                  </label>
                  <select
                    id="day"
                    className="input-section ps-1 height-39"
                    name="day_type"
                    onChange={handleClick}
                    required
                  >
                    {dayType.map((day, ind) => (
                      <option
                        key={ind}
                        value={ind === 0 ? "" : day}
                        disabled={ind === 0 && true}
                        selected={ind === 0 && true}
                        hidden={ind === 0 && true}
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!secondaryLabel && (
                <div className={`col-6`}>
                  <div
                    className={`label-text ${
                      title === "Apply for Leave" && "mt-3"
                    }`}
                  >
                    Notify To<span className="color-RED">*</span>
                  </div>
                  <SelectShow
                    getShowTo={getShowTo}
                    handleChangeSelectShow={handleChangeSelectShow}
                    sltOption={sltOption}
                    isRequired
                  />
                </div>
              )}

              <div
                className={
                  !!secondaryLabel
                    ? "col-12"
                    : isLeave === "Sent"
                    ? "mt-3 col-6"
                    : "col-12 mt-3"
                }
              >
                <label htmlFor="desc" className="d-block label-text">
                  Description<span className="color-RED">*</span>
                </label>
                <input
                  type="text"
                  id="desc"
                  name={getName(title)}
                  placeholder="Enter description"
                  className={`input-section ps-2 ${
                    !secondaryLabel && " height-39"
                  }`}
                  onChange={handleClick}
                  value={!!notEmpty.trim() ? notEmpty : ""}
                  required
                />
              </div>
            </div>
            {!secondaryLabel && (
              <span className="label-text font-14">
                Note:{" "}
                {isLeave === "Sent"
                  ? "Your leave will be classified as paid leave if it adheres to HRpolicy guidelines and does not adversely affect the workload."
                  : "The authority to grant approval for requests lies with the HR department. Working from home (WFH) is permitted only for projects with tight deadlines or elevated levels of dependence, and not for every project."}
              </span>
            )}

            <div className="text-center mt-5 mb-2">
              {!!secondaryLabel && (
                <span
                  className="cancel-button px-5 py-2 color-2E3192"
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  {secondaryLabel}
                </span>
              )}

              <button
                onClick={() => {
                  if (!!secondaryLabel && !!notEmpty.trim()) {
                    approvedRejected(notEmpty);
                    setAnchorEl(false);
                    setNotEmpty("");
                    handleModalClose();
                  }
                }}
                className={`apply-pro-save-btn px-5 py-1 text-white ${
                  !!secondaryLabel && "ms-3"
                }`}
              >
                {primaryLabel}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <Loader open={isLoading} size={70} />
    </>
  );
}

export default ModalView;
