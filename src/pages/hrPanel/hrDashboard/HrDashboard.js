import React, { useEffect, useState } from "react";
import leave from "../../../assets/leave.png";
import birthday from "../../../assets/birthday.png";
import recentNews from "../../../assets/recent-news.png";
import todo from "../../../assets/to-do.png";
import holiday from "../../../assets/holiday.png";
import workFrom from "../../../assets/work-from.png";
import { getRequest } from "../../../services";
import {
  API_URL,
  getAllUserLeaveList,
  getUserList,
  getWFHList,
} from "../../../constant/apiUrls";
import moment from "moment";
import Loader from "../../../components/loader";
import { getDDMMYYYY } from "../../../formatter/date";
import signoutPage from "../../../helpers/signout";
import { useDispatch } from "react-redux";

const HrDashboard = (props) => {
  const {
    showLeftNav,
    setIsLoading,
    setSnackbarOpen,
    setToken,
    setShowLeavesWfhStatus,
    setShowRightNav,
  } = props;

  const dispatch = useDispatch();

  //// here make one state of it's all /// here code refactor

  const birthNameDate = {
    // today_date: "dd/mm/yyyy",
    // tomo_date: "dd/mm/yyyy",
    today_name: [],
    tomo_name: [],
  };

  const [userBirthday, setUserBirthday] = useState({});

  userBirthday?.data?.forEach((cv) => {
    if (moment(cv.DOB).format("DD/MM") === moment().format("DD/MM")) {
      // birthNameDate.today_date = getDDMMYYYY(cv.DOB);
      birthNameDate.today_name.push(cv.display_name);
    } else {
      // birthNameDate.tomo_date = getDDMMYYYY(cv.DOB);
      birthNameDate.tomo_name.push(cv.display_name);
    }
  });

  const [userLeave, setUserLeave] = useState({});
  const [holidayDate, setHolidayDate] = useState({});
  const [userWFH, setUserWFH] = useState({});
  const [empStatus, setEmpStatus] = useState({});

  // const [isLoading, setIsLoading] = useState(false);

  const birthName = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

  const redirectPage = (selectPage, status) => () => {
    setShowRightNav(selectPage);
    if (!!status) {
      setShowLeavesWfhStatus(status);
    }
  };

  useEffect(() => {
    async function dashboard() {
      setIsLoading(true);
      try {
        const leave = await getRequest(API_URL.LEAVE_COUNT);
        const birthday = await getRequest(API_URL.DASHBOARD_BIRTHDAY);
        const holiday = await getRequest(API_URL.DASHBOARD_HOLIDAY);
        const wfh = await getRequest(API_URL.WORKFROM_COUNT);
        const empStatus = await getRequest(getUserList(0, 1000));
        ///here code refactor bcz inki ek state banani h
        setUserLeave(leave.data);
        setUserBirthday(birthday.data);
        setHolidayDate(holiday.data);
        setUserWFH(wfh.data);
        setEmpStatus(empStatus.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          signoutPage(setToken, dispatch);
        } else {
          setSnackbarOpen({
            setopen: true,
            message: "Something is went wrong",
            severity: "error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }

    dashboard();
  }, []);

  const commonClass =
    "col-4 d-flex align-items-center section-background-shadow-radius hr-section-height pointer-cur";

  return (
    <>
      <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2 `}>
        <div className="d-flex justify-content-around mx-4 mt-5">
          <div
            className={commonClass}
            onClick={redirectPage("leaves", "leaveStatus")}
          >
            <div className="ms-4">
              <img src={leave} alt="leave" />
            </div>
            <div className="ms-4">
              <div className="hr-secHeading ">Leaves</div>
              <div>
                <span className="hr-secNo color-000000">Approve:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {userLeave?.currentApprovedLeaveCount}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Reject:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {userLeave?.rejectedLeaveCount}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`${commonClass} mx-3`}
            onClick={redirectPage("wfh", "wfhStatus")}
          >
            <div className="ms-4">
              <img src={workFrom} alt="wfh" />
            </div>
            <div className="ms-4">
              <div className="hr-secHeading">Work From</div>
              <div>
                <span className="hr-secNo color-000000">Home:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {userWFH?.current_Approved_WFH_Count}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Office:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {userWFH?.total_In_Office}
                </span>
              </div>
            </div>
          </div>
          <div className={commonClass} onClick={redirectPage("holidays")}>
            <div className="ms-4">
              <img src={holiday} alt="holiday" />
            </div>
            <div className="ms-4">
              <div className="hr-secHeading">Holidays</div>
              <div>
                <span className="hr-secNo color-000000">Name:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {holidayDate?.nextHoliday?.holiday}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Date:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {getDDMMYYYY(holidayDate?.nextHoliday?.date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-4 mt-5">
          <div className={commonClass} onClick={redirectPage("employeeList")}>
            <div className="ms-4">
              <img src={recentNews} alt="emp-status" />
            </div>
            <div className="ms-4">
              <div className="hr-secHeading ">Employees Status</div>
              <div>
                <span className="hr-secNo color-000000">Active:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {empStatus?.Active}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Inactive:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {empStatus?.InActive}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Total:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {empStatus?.count}
                </span>
              </div>
            </div>
          </div>

          <div className={`${commonClass} mx-3`}>
            <div className="ms-4">
              <img src={birthday} alt="birthday" />
            </div>

            <div className="scrll-y max-height-5 ms-4">
              <div className="hr-secHeading mb-1">
                Birthday({getDDMMYYYY(userBirthday?.date)})
              </div>
              {birthNameDate?.today_name?.map((name, ind) => (
                <div className="hr-secTxt" key={ind}>
                  {name}
                  {ind < birthNameDate?.today_name.length - 1 && ","}
                  {/* {birthName.includes(ind) && <br />} */}
                </div>
              ))}
              {!!birthNameDate?.tomo_name.length && (
                <>
                  <div className="hr-secHeading mt-1">
                    Birthday({getDDMMYYYY(userBirthday?.tomorrowdate)})
                  </div>
                  {birthNameDate?.tomo_name?.map((name, ind) => (
                    <div className="hr-secTxt" key={ind}>
                      {name}
                      {ind < birthNameDate?.today_name.length - 1 && ","}
                      {/* {birthName.includes(ind) && <br />} */}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* just for ui mentain */}

          <div className="col-4"></div>

          {/* <div className={commonClass}>
            <div className="ms-4">
              <img src={birthday} alt="birthday" />
            </div>

            <div className="ms-4">
              <div className="hr-secHeading text-center">
                Birthday({getDDMMYYYY(userBirthday?.tomorrowdate)})
              </div>

            
              <div className="scrll-y max-height-5 mt-1">
                {birthNameDate?.tomo_name?.map((name, ind) => (
                  <div className="hr-secTxt" key={ind}>
                    {name}
                    {birthName.includes(ind) && <br />}
                  </div>
                ))}
              </div>

            </div>
          </div> */}
        </div>

        {/* <div className="d-flex justify-content-around mx-3 mt-5 mb-3"> */}
        {/* <div className={commonClass} onClick={redirectPage("employeeList")}>
            <div className="ms-4">
              <img src={recentNews} alt="emp-status" />
            </div>
            <div className="ms-4">
              <div className="hr-secHeading ">Employees Status</div>
              <div>
                <span className="hr-secNo color-000000">Active:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {empStatus?.Active}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Inactive:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {empStatus?.InActive}
                </span>
              </div>
              <div>
                <span className="hr-secNo color-000000">Total:</span>
                <span className="hr-secNo color-686868 ms-1">
                  {empStatus?.count}
                </span>
              </div>
            </div>
          </div> */}

        {/* <div className={commonClass}>
            <div className="ms-4">
              <img src={birthday} alt="birthday" />
            </div>

            <div className="ms-4">
              <div className="hr-secHeading text-center">
                Birthday({birthNameDate.tomo_date})
              </div>

            
              <div className="scrll-y max-height-5 mt-1">
                {birthNameDate?.tomo_name?.map((name, ind) => (
                  <div className="hr-secTxt" key={ind}>
                    {name}
                    {birthName.includes(ind) && <br />}
                  </div>
                ))}
              </div>

            </div>
          </div> */}

        {/* </div> */}
      </div>
      {/* <Loader open={isLoading} size={70} /> */}
    </>
  );
};

export default HrDashboard;
