import React, { useState } from "react";
import ellips1 from "../../assets/e1.png";
import ellips2 from "../../assets/e2.png";
import ellips3 from "../../assets/e3.png";
import ellips4 from "../../assets/e4.png";
import { getCalender } from "../../helpers/calender";
import getWorkLogTime, { dailyHoursTotal } from "../../helpers/worklog";
import DateCalender from "../dataCalender";
// import moment from "moment";

const UserWorklog = (props) => {
  const {
    jiraTimeSheet,
    setUserLogs,
    setTableModal,
    number,
    setNumber,
    startEndDate,
    setStartEndDate,
    calenderDate,
  } = props;

  // const calenderDate = getCalender();

  const userStatus = (issueKey, status, date) => {
    jiraTimeSheet?.worklogArrObj?.forEach((workStatus) => {
      for (const key in workStatus) {
        if (issueKey === key) {
          setUserLogs(
            workStatus[key][status].logs?.filter(
              (cv) => cv.worklog_Full_Date === date
            )
          );
        }
      }
    });
  };

  return (
    <div className="background-FFFFFF min-height-69 px-3 pb-5">
      <div className="row pt-4">
        <div className="col-3">
          <DateCalender
            number={number}
            setNumber={setNumber}
            startEndDate={startEndDate}
            setStartEndDate={setStartEndDate}
          />
        </div>
        <div className="col-9">
          <div className="d-flex justify-content-around">
            <div className="running-time border-button-6D6FB3 w-25">
              <div className="d-flex justify-content-around ">
                <div className="align-self-center">
                  <img
                    src={ellips1}
                    alt="pre-approved"
                    width="51px"
                    height="51px"
                  />
                </div>
                <div className="pt-2 pb-1">
                  <div className="color-000000 heading-home">PRE-APPROVED</div>
                  <div className="work-hours color-000000">
                    {jiraTimeSheet.preApprovedCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="running-time border-button-FFC13F w-25 mx-3">
              <div className="d-flex">
                <div className="align-self-center ms-3 me-4">
                  <img src={ellips2} alt="pending" width="51px" height="51px" />
                </div>
                <div className="pt-2 pb-1">
                  <div className="color-000000 heading-home">PENDING</div>
                  <div className="work-hours color-000000">
                    {jiraTimeSheet.pendingCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="running-time border-button-1CD503 w-25">
              <div className="d-flex">
                <div className="align-self-center ms-3 me-4">
                  <img
                    src={ellips3}
                    alt="approved"
                    width="51px"
                    height="51px"
                  />
                </div>
                <div className="pt-2 pb-1">
                  <div className="color-000000 heading-home">APPROVED</div>
                  <div className="work-hours color-000000">
                    {jiraTimeSheet.approvedCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="running-time border-button-FF0000 w-25 ms-3">
              <div className="d-flex">
                <div className="align-self-center ms-3 me-4">
                  <img
                    src={ellips4}
                    alt="rejected"
                    width="51px"
                    height="51px"
                  />
                </div>
                <div className="pt-2 pb-1">
                  <div className="color-000000 heading-home">REJECTED</div>
                  <div className="work-hours color-000000">
                    {jiraTimeSheet.rejectedCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-DDE8F1" />

      <div className="row mt-3 font-size-14 scroller1 ms-0 me-5">
        <div className="col-3 px-0 sticky1 width-21">
          <table className="width-100 table-layout">
            <tr className="background-EEF3F8">
              <th
                colSpan="2"
                className="color-000000 heading-home1 th-padding ps-2"
              >
                Key
              </th>
              <th className="color-000000 sigma-sign text-center">Σ</th>
            </tr>

            {jiraTimeSheet.worklogArrObj?.map((worklog) => {
              for (const key in worklog) {
                return Object.keys(worklog[key]).map((cv, ind) => (
                  <tr key={ind}>
                    <td
                      colSpan="2"
                      className="line-height-20 fontWeight-500 color-000000 py-2 ps-2 text-trun"
                    >
                      {worklog[key][cv]?.issue_key}
                    </td>
                    <td className="line-height-26 fontWeight-600 text-center">
                      {worklog[key][cv]?.totalApprovedTaskHour}
                    </td>
                  </tr>
                ));
              }
            })}

            <tr>
              <td
                colSpan="3"
                className="color-2E3192 totalWork-heading  py-2 ps-2"
              >
                Daily Hours Total
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                className="color-2E3192 totalWork-heading  py-2 ps-2"
              >
                Weekly Hours Total
              </td>
            </tr>

            <tr>
              <td
                colSpan="3"
                className="color-2E3192 totalWork-heading  py-2 ps-2"
              >
                Monthly Hours Total
              </td>
            </tr>
          </table>
        </div>

        <div className="col-9 ps-0 width-76">
          <table className="width-100 ty">
            <tr className="calender-home color-000000 background-EEF3F8">
              {calenderDate.map((cv, ind) => (
                <td
                  key={ind}
                  className={`text-center ${
                    cv.day === "SU" && "opacity-05"
                  } px-1`}
                >
                  {cv.date}
                  <br />
                  {cv.day}
                </td>
              ))}
            </tr>

            {getWorkLogTime(
              jiraTimeSheet.worklogArrObj,
              jiraTimeSheet.lastDate,
              jiraTimeSheet.sumWeekData,
              jiraTimeSheet.firstDate
            )?.map((worklog) =>
              worklog?.map((work, ind) => (
                <tr
                  className="line-height-20 fontWeight-400 text-center"
                  key={ind}
                >
                  {work.map((hours, index) => {
                    for (const j in hours) {
                      return (
                        <td
                          onClick={() => {
                            (j === "1" ||
                              j === "2" ||
                              j === "3" ||
                              j === "4") &&
                              setTableModal(true);
                            userStatus(hours?.issue_key, j, hours?.date);
                          }}
                          className={`py-2 fontWeight-600 ${
                            (j === "1" && "background-6D6FB3 pointer-cur") ||
                            (j === "2" && "background-FFC13F pointer-cur") ||
                            (j === "3" && "background-1CD503 pointer-cur") ||
                            (j === "4" && "background-FF0000 pointer-cur") ||
                            (j === "5" && "background-EEF3F8")
                          }`}
                          key={index}
                        >
                          {hours[j]}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))
            )}

            <tr
              className={`color-2E3192  text-center line-height-20 fontWeight-600 height-37`}
            >
              {dailyHoursTotal(
                jiraTimeSheet?.hours_total,
                jiraTimeSheet?.sumWeekData
              )?.map((cv, ind) => (
                <td
                  className={`py-2 ${cv === "SUN" && "background-EEF3F8"}`}
                  key={ind}
                >
                  {cv === "SUN" ? "" : cv}
                </td>
              ))}
            </tr>

            <tr className="color-2E3192  text-end line-height-20 fontWeight-600">
              {jiraTimeSheet?.sumWeekData?.map((cv, ind) => (
                <td colSpan={cv.col} className="py-2" key={ind}>
                  {cv.time}
                </td>
              ))}
            </tr>

            <tr>
              <td
                colSpan={jiraTimeSheet.lastDate}
                className="py-2 border-start-0 color-2E3192 monthly-hours text-end"
              >
                {jiraTimeSheet.totalLogTime}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserWorklog;
