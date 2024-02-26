import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import timer from "../../assets/timer.png";
// import moment from "moment";
import { postRequest } from "../../services";
import { API_URL } from "../../constant/apiUrls";
import { getDataFromSessionStorage } from "../../helpers/sessionStorage";
import STORAGE_KEY from "../../constant/storageKey";
import Loader from "../../components/loader";
import { getDataFromLocalStorage } from "../../helpers/localStorage";
import totalTimeInSecond from "./manualWL.helper";
import { head, last } from "lodash";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";
import AlertDialog from "../../components/alertDialogBox";
import SelectSearch from "../../components/SelectSearch";
import { currentMonth } from "../../formatter/date";
import signoutPage from "../../helpers/signout";

let pmName = "";

function ManualWork(props) {
  const { setToken } = props;

  const dispatch = useDispatch();

  const { hostName, password, userName } = getDataFromSessionStorage(
    STORAGE_KEY.CREDENTIAL
  ) || {
    hostName: "",
    password: "",
    userName: "",
  };

  const { userName: displayName } = getDataFromLocalStorage(
    STORAGE_KEY.USER_DATA
  ) || { userName: "" };

  const [manualWork, setManualWork] = useState({});

  const [getIssues, setGetIssues] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [opensnackbar, setSnackbarOpen] = useState({});
  const [isHour, setIsHour] = useState("");

  const [isMinute, setIsMinute] = useState("");

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [cancelRfs, setCancelRef] = useState(true);
  const [isSaveBtn, setIsSaveBtn] = useState("");
  // manualWork?.data?.[0]?.name
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedOption1, setSelectedOption1] = useState("");

  const [mwlData, setMwlData] = useState({
    userName,
    password,
    hostName,
    displayName,
    projectId: "",
    issueKey: "",
    comment: "",
    time: "",

    worklogDate: currentMonth,
    pmName: "",
  });

  const handleOpenAlertDialog = (prm) => () => {
    setOpenAlertDialog(true);
    setIsSaveBtn(prm);
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
    setCancelRef(true);
  };

  const getProjectIssues = (key) => {
    setIsLoading(true);
    setSelectedOption1("");
    postRequest(API_URL.PROJECT_ISSUES_MWL, {
      ProjectKey: key,
    })
      .then((res) => {
        setGetIssues(res?.data?.data);
      })
      .finally(() => setIsLoading(false));
  };

  const handleChange = (param) => (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "projectId") {
      setSelectedOption(value[1]);
      getProjectIssues(head(value));
      pmName = last(value);
    } else if (name === "issueKey") {
      setSelectedOption1(`${value[1]} [${value[0]}]`);
      value = value[0];
    }

    // else if(name==="comment"){
    //   value = value.trim();
    // }
    else if (name === "time") {
      if (param === "hour") {
        setIsHour(value);
      } else {
        setIsMinute(value);
      }
      value = totalTimeInSecond(param, value);
    }

    setMwlData({
      ...mwlData,
      pmName: pmName,
      [name]: name === "projectId" ? value[2] : value,
    });
  };

  const submitMWL = (event) => {
    setOpenAlertDialog(true);
    setIsSaveBtn("do");
    event.preventDefault();
  };

  const mwlList = () => {
    setIsLoading(true);
    postRequest(API_URL.MANUAL_WORK, { username: userName, password })
      .then((res) => {
        setManualWork(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          signoutPage(setToken, dispatch);
        } else {
          console.log(error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const saveMWL = (event) => {
    setIsLoading(true);
    postRequest(API_URL.SAVE_MWL, mwlData)
      .then((res) => {
        setIsHour("");
        setIsMinute("");
        totalTimeInSecond("clear", 0);

        setSelectedOption("");

        setSelectedOption1("");

        setMwlData({
          userName,
          password,
          hostName,
          displayName,
          projectId: "",
          issueKey: "",
          comment: "",
          time: "",
          worklogDate: "",
          pmName: "",
        });

        setSnackbarOpen({
          setopen: true,
          message: "manual work log save successfully",
          severity: "success",
        });
        mwlList();
      })
      .catch(() => {
        setSnackbarOpen({
          setopen: true,
          message: "manual work log not save",
          severity: "error",
        });
      })
      .finally(() => setIsLoading(false));
    setOpenAlertDialog(false);

    event.preventDefault();
  };

  const handleClose = () => {
    setSnackbarOpen({ setopen: false });
  };

  const refreshData = () => {
    setIsHour("");
    setIsMinute("");
    totalTimeInSecond("clear", 0);

    setSelectedOption("");

    setSelectedOption1("");

    setMwlData({
      userName,
      password,
      hostName,
      displayName,
      projectId: "",
      issueKey: "",
      comment: "",
      time: "",
      worklogDate: "",
      pmName: "",
    });
    mwlList();
    setOpenAlertDialog(false);
  };

  useEffect(() => {
    mwlList();
  }, []);

  return (
    <>
      <div className="background-DCDFE4 p-3">
        <div className="background-FFFFFF min-height-69 px-4 pt-3 pb-4">
          <div className="main-heading color-2E3192">AIS MANUAL TIMER</div>
          <div className="manual-heading">
            Worklog saved From Here Need To Approve From PM
          </div>
          <hr className="border-DDE8F1" />
          <div className="d-flex justify-content-center px-5 mt-4">
            <form className="px-4" onSubmit={submitMWL}>
              <div className="manual-border mb-3 mx-5">
                <div className="row m-3 mt-4">
                  <div className="width-497">
                    <label
                      htmlFor="project"
                      className="d-block heading-home lab-zIndex"
                    >
                      Select Project<span className="color-RED">*</span>
                    </label>

                    <SelectSearch
                      workPrt={manualWork?.data}
                      handleChange={handleChange}
                      selectedOption={selectedOption}
                      name="projectId"
                      isIssue
                      label="Select Project"
                    />
                  </div>
                  <div className="width-497">
                    <label
                      htmlFor="issue"
                      className="d-block heading-home lab-zIndex"
                    >
                      Select Issue<span className="color-RED">*</span>
                    </label>

                    <SelectSearch
                      workPrt={getIssues?.arr}
                      handleChange={handleChange}
                      selectedOption={selectedOption1}
                      name="issueKey"
                      isIssue={getIssues.arr}
                      label="Select issue"
                    />
                  </div>
                  <div className="col-12 my-3">
                    <label htmlFor="comment" className="d-block heading-home">
                      Comments<span className="color-RED">*</span>
                    </label>
                    <textarea
                      type="text"
                      id="comment"
                      placeholder="Comments"
                      className="input-field ps-2 plc resize pt-2"
                      onChange={handleChange("comment")}
                      name="comment"
                      value={!!mwlData.comment.trim() ? mwlData.comment : ""}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label
                      htmlFor="select-date"
                      className="d-block heading-home"
                    >
                      Date<span className="color-RED">*</span>
                    </label>

                    <input
                      className="input-field input-pos ps-2 pointer-cur background-EEE outL"
                      id="select-date"
                      type="date"
                      onClick={(e) => {
                        e.target.showPicker();
                      }}
                      onChange={handleChange("date")}
                      name="worklogDate"
                      value={mwlData.worklogDate}
                      max={currentMonth}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="hour" className="heading-home">
                          Hours<span className="color-RED">*</span>
                        </label>
                        <div className="input-field d-flex align-items-center">
                          <img
                            src={timer}
                            alt="timer"
                            width="11%"
                            className="ms-2"
                          />

                          <input
                            type="number"
                            id="hour"
                            className=" border-0 mx-2 width-88 plc"
                            min={0}
                            onChange={handleChange("hour")}
                            name="time"
                            placeholder="Hours(00)"
                            value={isHour}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <label
                          htmlFor="minute"
                          className="d-block heading-home"
                        >
                          Minutes<span className="color-RED">*</span>
                        </label>
                        <div className="input-field d-flex align-items-center">
                          <img
                            src={timer}
                            alt="timer"
                            width="11%"
                            className="ms-2"
                          />

                          <input
                            type="number"
                            id="minute"
                            className=" border-0 mx-2 width-88 plc"
                            min={isHour == 0 ? 1 : 0}
                            max={59}
                            onChange={handleChange("minute")}
                            name="time"
                            placeholder="Minutes(00)"
                            // value={!isHour?"".trim(): isMinute}
                            value={isMinute}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-5 mb-4">
                  <span
                    className="cancel-button px-5 py-2 me-4"
                    onClick={handleOpenAlertDialog("refresh")}
                  >
                    Refresh
                  </span>

                  <button
                    type="submit"
                    className={`apply-pro-save-btn px-4 py-1 text-white`}
                  >
                    Save Worklog
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {openAlertDialog && (
        <AlertDialog
          handleClose={handleCloseAlertDialog}
          open={openAlertDialog}
          setCancelRef={setCancelRef}
          cancelRfs={cancelRfs}
          refreshData={refreshData}
          isSaveBtn={isSaveBtn}
          saveMWL={saveMWL}
        />
      )}
      <Loader open={isLoading} size={70} />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
}

export default ManualWork;
