import React, { useEffect, useState } from "react";
import head from "lodash/head";
import last from "lodash/last";
import SearchIcon from "@mui/icons-material/Search";
// import Pagination from "@mui/material/Pagination";
import ModalView from "../modalView";
import Loader from "../loader";

import { oneUserLeaveListUrl } from "../../constant/apiUrls";
import { getRequest } from "../../services";
import ErrorSnackBar from "../snackBar/ErrorSnackBar";
import { DEFAULT_SELECTED_PAGE } from "../../constant";
// import PaginationInfo from "../paginationInfo";
import getSearchUsers, {
  sortingDataByDateAndId,
  sortingIcon,
} from "../../helpers/sorting";
import { getDDMMYYYY } from "../../formatter/date";

function Leave(props) {
  const {
    setSnackbarOpen,
    setIsLoading,
    handleSearch,
    setSearchTerm,
    searchTerm,
    oneUserWFHLeaveList,
    setOneUserWFHLeaveList,
    WFHLeaveDetails,
    wfhLeaveDataSorted,
    isShorting,
    isExpand,
  } = props;

  const [selectEntries, setSelectEntries] = useState("1000");

  const [open, setOpen] = useState(false);

  const entries = ["25", "50", "100", "All"];

  const userDetails = [
    "Leave Type",
    "From Date",
    "To Date",
    "Description",
    "Applied for",
    "Status",
    "Comment",
  ];

  const handleModalClose = () => setOpen(false);

  const getOneUserLeaveList = () => {
    setIsLoading(true);
    getRequest(oneUserLeaveListUrl(0, selectEntries))
      .then((res) => {
        setOneUserWFHLeaveList({
          ...res.data,
          data: res.data.data
            .sort((a, b) => b.id - a.id)
            .filter(
              (cv, ind, arr) =>
                arr.findIndex(
                  (cv1) => cv1.date_commasepreted === cv.date_commasepreted
                ) === ind
            ),
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getOneUserLeaveList();
  }, [selectEntries]);

  return (
    <>
      <div className="main-heading color-2E3192 pt-3">LEAVE</div>
      <hr className="border-DDE8F1" />

      <div className="d-flex justify-content-between">
        <div className="align-self-end">
          <span
            className="apply-pro-save-btn color-FFFFFF fontWeight-600 pointer-cur px-3 py-2"
            onClick={() => setOpen(true)}
          >
            Apply For Leave
          </span>
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
              className="input-field color-2E3192 ps-1"
              onChange={(e) => {
                setSelectEntries(
                  e.target.value === "All"
                    ? oneUserWFHLeaveList?.count
                    : e.target.value
                );
                setSearchTerm("");
              }}
              value={entries.includes(selectEntries) ? selectEntries : "All"}
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
              onChange={handleSearch(oneUserWFHLeaveList, "body")}
              value={searchTerm}
            />
            <span className="search-bar">
              <SearchIcon className="color-2E3192" />
            </span>
          </div>
        </div>
      </div>

      <table className="width-100 mt-4">
        <tr className="background-EEF3F8">
          {userDetails.map((userDetail, ind) => (
            <th
              className={`text-center p-1 ${
                ind === 0
                  ? "width-14"
                  : ind === 4
                  ? "width-13"
                  : ind === 3 || ind === 6
                  ? "width-300"
                  : "width-9"
              }`}
              key={ind}
              onClick={() => {
                if (ind === 2) {
                  wfhLeaveDataSorted("date_commasepreted");
                }
              }}
            >
              {userDetail}
              {ind === 2 && sortingIcon(isExpand, isShorting)}
            </th>
          ))}
        </tr>

        {WFHLeaveDetails?.data?.map((leaveDetail, ind) => (
          <tr key={ind}>
            {/* <td className="text-center p-1">
              {leaveDetail?.["user.display_name"]}
            </td> */}

            <td className="text-center p-1">{leaveDetail?.leaveType}</td>

            <td className="text-center p-1">
              {getDDMMYYYY(head(leaveDetail?.date_commasepreted?.split(",")))}
            </td>
            <td className="text-center p-1">
              {getDDMMYYYY(last(leaveDetail?.date_commasepreted?.split(",")))}
            </td>
            <td className="text-center p-1 width-300">
              {leaveDetail?.body?.trim()}
            </td>

            <td className="text-center p-1 width-300">
              {leaveDetail?.day_type}
            </td>

            <td className="text-center p-1">
              {leaveDetail?.status === "Canceled"
                ? "Rejected"
                : leaveDetail?.status}
            </td>

            <td className="text-center p-1 width-300">
              {leaveDetail?.comment || ""}
            </td>
          </tr>
        ))}
        <tr className="heading-home">
          <td className="text-end pe-2" colSpan={6}>
            Total
          </td>
          <td className="text-center py-2">{WFHLeaveDetails.data?.length}</td>
        </tr>
      </table>

      {/* when pagination need then it's uses */}

      {/* <div className="d-flex justify-content-between pb-3 pt-2 mt-3 mx-2">
            {Math.ceil(leaveUsers?.count / selectEntries) > 1 && (
              <Pagination
                count={Math.ceil(leaveUsers?.count / selectEntries)}
                showFirstButton
                showLastButton
                shape="rounded"
                onChange={(_, page) => setSelectedPage(page - 1)}
              />
            )}

            <PaginationInfo
              selectedPage={selectedPage}
              currentPageCount={leaveUsers?.data?.length}
              totalCount={leaveUsers?.count}
            />
          </div> */}

      <ModalView
        open={open}
        handleModalClose={handleModalClose}
        title="Apply for Leave"
        primaryLabel="Submit"
        setSnackbarOpen={setSnackbarOpen}
        getOneUserLeaveList={getOneUserLeaveList}
        isLeave="Sent"
      />
      {/* <Loader open={isLoading} size={70} />
      <ErrorSnackBar
        opensnackbar={opensnackbar}
        handleClose={handleSnackbarClose}
      /> */}
    </>
  );
}

export default Leave;
