import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import ModalView from "../../components/modalView";
import DateCalender from "../../components/dataCalender";
import {
  endDateMonth,
  getDDMMYYYY,
  getStEdDate,
  startDateMonth,
} from "../../formatter/date";
import { getRequest, postRequest } from "../../services";
import { API_URL, getUserList } from "../../constant/apiUrls";
import moment from "moment";
// import { getStEdDate } from "../../helpers/calender";
import Loader from "../../components/loader";
import SelectSearch from "../../components/SelectSearch";
import getSearchUsers, {
  getShortingData,
  setShortingIcon,
} from "../../helpers/sorting";
import getSearchingData from "../../helpers/searching";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";
// import SelectUsers from "./SelectUsers";
import signoutPage from "../../helpers/signout";
import { useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function PendingWork(props) {
  const { setToken } = props;

  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [pendingWorkLog, setPendingWorkLog] = useState({});

  const [isShorting, setIsShorting] = useState(true);
  const [expandLessMore, setExpandLessMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [opensnackbar, setSnackbarOpen] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [selectEntries, setSelectEntries] = useState("1000");
  const [userList, setUserList] = useState({});

  const [userKey, setUserKey] = useState("");

  let [number, setNumber] = useState(0);
  const [startEndDate, setStartEndDate] = useState([
    startDateMonth(number),
    endDateMonth(number),
  ]);

  const entries = ["25", "50", "100", "All"];

  const genders = ["Select User", "berry", "steve", "henny"];

  const handleCheckboxChange = (logId) => {
    if (selectedRows.every((elm) => elm?.logId !== logId)) {
      setSelectedRows([...selectedRows, { logId }]);
    } else {
      setSelectedRows(selectedRows.filter((cv) => cv?.logId !== logId));
    }
  };

  // for removing loop so like uses further//

  // const handleCheckboxChange = (worklog_id, issue_id, ind) => {
  //   if (selectedRows[ind]?.ind !== ind) {
  //     const rt = [...selectedRows];
  //     rt[ind] = { issue_id, worklog_id, ind };

  //     setSelectedRows(rt);
  //   } else {
  //     console.log("hgg")

  //     setSelectedRows(
  //       selectedRows.filter((cv) => cv?.ind !== ind)
  //     );

  //   }
  // };

  const handleClose = () => {
    setSnackbarOpen({ setopen: false });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = getSearchingData(pendingWorkLog?.data, query, {
      nm: "pwl",
      no: 2,
    });

    setFilteredData({
      ...pendingWorkLog,
      data: filtered,
      count: filtered?.length,
    });

    setSearchTerm(e.target.value);
    setIsShorting(false);
  };

  const userFilterDetails = getSearchUsers(
    searchTerm,
    filteredData,
    pendingWorkLog
  );

  const getAllId = (pwlData) => pwlData?.map((cv) => ({ logId: cv.id }));

  const pwlTableHeading = [
    <input
      type="checkbox"
      checked={selectedRows.length === userFilterDetails?.data?.length}
      onClick={(event) => {
        if (event.target.checked) {
          setSelectedRows(getAllId(userFilterDetails?.data));
        } else {
          setSelectedRows([]);
        }
      }}
    />,
    "Approval",
    "User Name",
    "Issue Key",
    "Issue Name",
    "Time Spent",
    "Date Created",
    "Comment",
  ];

  // const handleModalClose = () => setOpen(false);

  const handleChange = (param) => (e) => {
    let name = e.target.name;
    let value = e.target.value;

    console.log(name);
    console.log(value)


    setUserKey(value[1]);

    setSelectedOption(value[0]);
  };

  const requestBody = {
    start: "0",
    length: selectEntries,
    order: "1",
    StartDate: getStEdDate(startEndDate[0]),
    EndDate: getStEdDate(startEndDate[1]),
    jiraId: userKey,
  };

  const pwlList = async (bool) => {
    setIsLoading(true);

    try {
      const res = await postRequest(API_URL.PENDING_WORK_LOG, requestBody);
      if (bool) {
        const empRes = await getRequest(getUserList(0, 1000));
        setUserList(empRes.data);
      }
      setPendingWorkLog(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signoutPage(setToken, dispatch);
      } else {
        setSnackbarOpen({
          setopen: true,
          message: error.message,
          severity: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const approveRejectPwl = (param) => (e) => {
    setIsLoading(true);
    postRequest(
      param === "approved" ? API_URL.APPROVED_PWL : API_URL.REJECTED_PWL,
      {
        WorklogIDArr: selectedRows,
      }
    )
      .then((res) => {
        setSnackbarOpen({
          setopen: true,
          message: `Selected worklog is ${param} successfully`,
          severity: "success",
        });
        pwlList(false);
      })
      .catch((err) => {
        setSnackbarOpen({
          setopen: true,
          message: err.message,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setSelectedRows([]);
      });
  };


  const sortName = ["display_name","issue_key","issue_name"]

  useEffect(() => {
    pwlList(selectEntries === "1000" && userKey === "");
  }, [getStEdDate(startEndDate[1]), selectEntries, userKey]);

  return (
    <>
      <div className="background-DCDFE4 p-3">
        <div className="background-FFFFFF min-height-69 px-4">
          {/* <div className="main-heading color-2E3192 pt-3">PENDING WORK LOG</div> */}
          <div className="col-3 pt-4">
            <DateCalender
              number={number}
              setNumber={setNumber}
              startEndDate={startEndDate}
              setStartEndDate={setStartEndDate}
            />
          </div>

          <hr className="border-DDE8F1" />

          <div className="d-flex justify-content-between">
            <div className="row">
              <label htmlFor="user" className="heading-home">
                Select User
              </label>

              <div className="width-430">
                <SelectSearch
                  workPrt={userList?.data}
                  handleChange={handleChange}
                  selectedOption={selectedOption}
                  name="pwlUsers"
                  isIssue
                  label="Select User"
                />
              </div>
              <div className="col-2 align-item-end d-flex">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#2e3192",
                      textTransform: "none",
                    }}
                    className="px-5"
                    disabled={!selectedRows.length}
                    onClick={approveRejectPwl("approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#2e3192",
                      border: "1px solid #2e3192",
                      textTransform: "none",
                    }}
                    className="px-5"
                    disabled={!selectedRows.length}
                    onClick={approveRejectPwl("rejected")}
                  >
                    Reject
                  </Button>
                </Stack>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <label
                  htmlFor="entries"
                  className="d-block heading-home color-000000"
                >
                  Show Entries
                </label>

                <select
                  id="entries"
                  className="input-field  color-2E3192 ps-1"
                  onChange={(e) => {
                    setSelectEntries(
                      e.target.value === "All"
                        ? pendingWorkLog?.recordsTotal
                        : e.target.value
                    );
                    setSearchTerm("");
                  }}
                  value={
                    entries.includes(selectEntries) ? selectEntries : "All"
                  }
                  required
                >
                  {entries.map((entry, ind) => (
                    <option key={ind} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field search-bar-width ms-3">
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
            </div>
          </div>

          <div>
            <table className="width-100 mt-4 mb-5">
              <tr className="background-EEF3F8">
                {pwlTableHeading.map((userDetail, ind) => (
                  <th
                    key={ind}
                    className={`text-center py-1 ${ind === 0 && "width-30"} ${
                      ind === 1 && "width-90"
                    }
                    ${(ind === 2 || ind === 6) && "width-125"}
                    ${(ind === 4 || ind === 7) && "w-25"}
                    ${ind === 5 && "width-106"}
                    ${ind > 1 && ind < 5 && "pointer-cur"}`}
                    onClick={() => {
                      if(ind===2||ind===3||ind===4){
                      getShortingData(
                        ind,
                        setIsShorting,
                        setExpandLessMore,
                        userFilterDetails,
                        expandLessMore,
                        setPendingWorkLog,
                        setFilteredData,
                        searchTerm,
                        sortName[ind-2],
                        false
                      );
                      }
                    }}
                  >
                    {userDetail}
                    
                    {setShortingIcon([2,3,4].includes(ind)&&ind, isShorting, expandLessMore)}
                  </th>
                ))}
              </tr>
              {userFilterDetails?.data?.map((work, ind) => (
                <tr
                  key={ind}
                  className={
                    selectedRows.some((elm) => elm?.logId === work.id) &&
                    "background-B0BED9"
                  }
                  onClick={() => handleCheckboxChange(work.id)}
                >
                  <td className="text-center py-1">
                    <input
                      type="checkbox"
                      id="check"
                      checked={selectedRows.some(
                        (elm) => elm?.logId === work.id
                      )}
                    />
                  </td>
                  <td className="text-center py-1 color-orangered">
                    {work.approval}
                  </td>

                  <td className="text-center py-1">{work.display_name}</td>

                  <td className="text-center py-1 text-break">
                    {work.issue_key}
                  </td>
                  <td className="text-center py-1 text-break">
                    {work.issue_name}
                  </td>
                  <td className="text-center py-1">
                    {work.time_spent_seconds}
                  </td>

                  <td className="text-center py-1">{getDDMMYYYY(work.workLog_date)}</td>
                  <td className="text-center py-1 text-break">
                    {work.comment}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      {/* when use modal popup then use */}
      {/* <ModalView
        open={open}
        handleModalClose={handleModalClose}
        title="Apply for Leave"
        primaryLabel="Sent"
      /> */}
      <Loader open={isLoading} size={70} />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
}

export default PendingWork;
