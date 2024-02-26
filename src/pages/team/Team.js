import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import Tooltip from "@mui/material/Tooltip";
import { CSVLink } from "react-csv";
import IconButton from "@mui/material/IconButton";
import { API_URL, getJiraTimesUrl } from "../../constant/apiUrls";
import { getCalender } from "../../helpers/calender";
import { getRequest } from "../../services";
import Loader from "../../components/loader";
import upload from "../../assets/upload.png";
import { getHoursByDate } from "../../helpers/worklog";
// import DateCalender from "../../components/dataCalender";
import TableModal from "../../components/tablemodal";
import moment from "moment";
import {
  endDateMonth,
  getStEdDate,
  startDateMonth,
} from "../../formatter/date";
import isSortingTeamData, { getAllHours, getDecimalValue } from "./team.helper";

import {
  setTeamSearchFunc,
  setTeamsData,
} from "../../redux/reducer/sessionReducer";

import getSearchUsers, { sortingIcon } from "../../helpers/sorting";
import getSearchingData from "../../helpers/searching";
import signoutPage from "../../helpers/signout";
import { useDispatch } from "react-redux";

function Team(props) {
  const { setToken,startEndDate } = props;

  const dispatch = useDispatch();

  const [teamTimeSheet, setTeamTimeSheet] = useState({});

  // let [number, setNumber] = useState(0);

  // const [startEndDate, setStartEndDate] = useState([
  //   startDateMonth(number),
  //   endDateMonth(number),
  // ]);

  const [userLogs, setUserLogs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isShorting, setIsShorting] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const [tableModal, setTableModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const teamsName = ["Name", "EmpId", "Total", "Pre-App", "Pen", "App", "Rej"];

  const fullName = ["Pre-Approved", "Pending", "Approved", "Rejected"];

  const calenderDate = getCalender(startEndDate);

  const tableModalClose = () => setTableModal(false);

  const getTeamsData = isSortingTeamData(
    isExpand,
    isShorting,
    teamTimeSheet,
    calenderDate.length
  );

  const handleSearch = (e) => {
    const query = e?.target?.value?.toLowerCase();

  

    const filtered = getSearchingData(getTeamsData, query, {
      nm: "tms",
      no: 3,
    });


    

    setFilteredData(filtered);

    setSearchTerm(e.target.value);
  };

  const userFilterDetails = getSearchUsers(
    searchTerm,
    filteredData,
    getTeamsData
  );

  const userStatus = (user, date) => {
    setUserLogs(
      teamTimeSheet?.user_worklog[user]?.logs?.filter(
        (cv) => cv.worklog_date === date
      )
    );
  };

  const hrsToatal = getAllHours(userFilterDetails, teamTimeSheet);

  const empCsvData =
    userFilterDetails?.map((cv) => {
      const jsObj = {
        Name: cv?.name,
        EmpId: cv?.key,
        Total: cv?.total,
        PreApproved: cv?.pre,
        Pending: cv?.pen,
        Approved: cv?.apr,
        Rejected: cv?.rej,
      };

      for (let i = 0; i < cv.workHours.length; i++) {
        jsObj[`${calenderDate[i]?.date}\n${calenderDate[i]?.day}`] =
          cv?.workHours[i]?.worklog_time;
      }

      return jsObj;
    }) || [];

  if (Object.keys(teamTimeSheet)?.length) {
    dispatch(setTeamsData(empCsvData));

    dispatch(setTeamSearchFunc(handleSearch));
  }
  useEffect(() => {
    setIsLoading(true);
    getRequest(
      getJiraTimesUrl(
        API_URL.TEAMTIMESHEET,
        getStEdDate(startEndDate[0]),
        getStEdDate(startEndDate[1])
      )
    )
      .then((res) => {
        setTeamTimeSheet(res.data);
      })

      .catch((error) => {
        if (error.response && error.response.status === 401) {
          signoutPage(setToken, dispatch);
        } else {
          console.log(error);
        }
      })

      .finally(() => setIsLoading(false));
  }, [getStEdDate(startEndDate[1])]);

  return (
    <>
      <div className="background-DCDFE4 py-3">
        <div className="background-FFFFFF min-height-69 px-3 pb-5">
          {/* <div className="d-flex justify-content-between pt-4">
            <div className="col-3">
              <DateCalender
                number={number}
                setNumber={setNumber}
                startEndDate={startEndDate}
                setStartEndDate={setStartEndDate}
              />
            </div>
            <div>
              <div className="form-field search-bar-width me-3">
                <label
                  htmlFor="search"
                  className="d-block heading-home color-000000"
                >
                  Search
                </label>

                <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  className="input-field ps-2"
                  onChange={handleSearch}
                />
                <span className="search-bar">
                  <SearchIcon className="color-2E3192" />
                </span>
              </div>

              <CSVLink data={empCsvData} filename={"TableContent.csv"}>
                <span className="me-1 select-profile">Download</span>
                <img
                  src={upload}
                  alt="upload"
                  width="38px"
                  height="38px"
                  className="pointer-cur"
                />
              </CSVLink>
            </div>
          </div> */}

          <hr className="border-DDE8F1" />

          <div className="row mt-3 scroller  mx-1 font-size-14">
            <div className="col-3 px-0 sticky width-44">
              <table className="width-100">
                <tr className="background-EEF3F8 line-height-48">
                  {teamsName?.map((name, ind) => (
                    <th
                      key={ind}
                      colSpan={ind === 0 && "2"}
                      className={`color-000000 ${ind === 1 && "pointer-cur"} ${
                        ind === 0 ? "ps-2" : "text-center"
                      }`}
                      onClick={() => {
                        if (ind === 1) {
                          setIsShorting(!isShorting);
                          setIsExpand(true);
                        }
                      }}
                    >
                      {ind > 2 ? (
                        <Tooltip
                          title={
                            <span className="fontWeight-600">
                              {fullName[ind - 3]}
                            </span>
                          }
                        >
                          <span>{name}</span>
                        </Tooltip>
                      ) : (
                        name
                      )}
                      {ind === 1 && sortingIcon(isExpand, isShorting)}
                    </th>
                  ))}
                </tr>

                {userFilterDetails?.map((acttime, ind) => (
                  <tr key={ind}>
                    <td
                      colSpan="2"
                      className="line-height-26 fontWeight-500 color-000000 py-2 ps-2"
                    >
                      {acttime?.name}
                    </td>
                    <td className="line-height-26 fontWeight-500 color-000000 py-2 text-center">
                      {acttime?.key}
                    </td>
                    <td className="line-height-26 fontWeight-600 text-center">
                      {getDecimalValue(+acttime?.total, 2)}
                      {/* {Number.parseFloat(acttime?.total).toFixed(2)} */}
                    </td>
                    <td className="line-height-26 fontWeight-500 color-000000 py-2 text-center">
                      {getDecimalValue(+acttime?.pre, 2)}
                      {/* {Number.parseFloat(acttime?.pre).toFixed(2)} */}
                    </td>
                    <td className="line-height-26 fontWeight-500 color-000000 py-2 text-center">
                      {getDecimalValue(+acttime?.pen, 2)}
                      {/* {Number.parseFloat(acttime?.pen).toFixed(2)} */}
                    </td>
                    <td className="line-height-26 fontWeight-500 color-000000 py-2 text-center">
                      {getDecimalValue(+acttime?.apr, 2)}
                      {/* {Number.parseFloat(acttime?.apr).toFixed(2)} */}
                    </td>

                    <td className="line-height-26 fontWeight-600 text-center">
                      {/* {Number.parseFloat(+acttime?.rej).toFixed(2)} */}
                      {getDecimalValue(+acttime?.rej, 2)}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td
                    colSpan="8"
                    className="color-2E3192 heading-home py-2 ps-2"
                  >
                    Daily Hours Total
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="8"
                    className="color-2E3192 heading-home py-2 ps-2"
                  >
                    Weekly Hours Total
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="8"
                    className="color-2E3192 heading-home py-2 ps-2"
                  >
                    Monthly Hours Total
                  </td>
                </tr>
              </table>
            </div>

            <div className="col-md-9 col-6 scroll-X-axis1 ps-0 width-56">
              <table className="width-100">
                <tr className="calender-date color-000000 background-EEF3F8">
                  {calenderDate?.map((cv, ind) => (
                    <td
                      key={ind}
                      className={`text-center ${
                        cv.day === "SU" && "opacity-05"
                      } px-2`}
                    >
                      {cv.date}
                      <br />
                      {cv.day}
                    </td>
                  ))}
                </tr>

                {userFilterDetails?.map((teamWork, ind) => (
                  <tr
                    key={ind}
                    className="line-height-26 fontWeight-400 text-center"
                  >
                    {teamWork?.workHours?.map((dailyHour, index) => (
                      <td
                        key={index}
                        className={`py-2 ${
                          dailyHour.AttrValue === "1" && "pre-border"
                        }  ${dailyHour.worklog_time && "pointer-cur"}`}
                        onClick={() => {
                          if (dailyHour.worklog_time) {
                            setTableModal(true);
                            userStatus(teamWork?.name, dailyHour.worklog_date);
                          }
                        }}
                      >
                        {dailyHour.worklog_time
                          ? Number.parseFloat(dailyHour.worklog_time).toFixed(2)
                          : ""}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="color-2E3192 text-center line-height-27 fontWeight-600">
                  {hrsToatal.dh?.map((cv, ind) => (
                    <td className="py-2" key={ind}>
                      {/* {cv.toFixed(1)} */}

                      {getDecimalValue(cv, 1)}
                    </td>
                  ))}
                </tr>

                <tr className="color-2E3192 text-end line-height-27 fontWeight-600">
                  {hrsToatal.wh?.map((cv, ind) => (
                    <td colSpan={cv.col} className="py-2" key={ind}>
                      {/* {cv.time.toFixed(1)} */}
                      {getDecimalValue(cv.time, 1)}
                    </td>
                  ))}
                </tr>

                <tr className="heading-home ">
                  <td
                    colSpan={teamTimeSheet.lastDate}
                    className="py-2 border-start-0 color-2E3192 text-end"
                  >
                    {/* {hrsToatal.mh.toFixed(1)} */}
                    {getDecimalValue(hrsToatal.mh, 1)}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <TableModal
        tableModal={tableModal}
        tableModalClose={tableModalClose}
        userLogs={userLogs}
        isUser={false}
      />

      <Loader open={isLoading} size={70} />
    </>
  );
}

export default Team;
