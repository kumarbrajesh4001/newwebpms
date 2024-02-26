import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ModalView from "../../components/modalView";
import Loader from "../../components/loader";
import { API_URL } from "../../constant/apiUrls";
import { getRequest } from "../../services";

function Leave() {
  const [leaveStatus, setLeaveStatus] = useState({});

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const entries = ["Please Choose...", 10, 20, 30];

  const userDetails = [
    "User Id",
    "From Date",
    "To Date",
    "Description",
    "Status",
    "Comment",
  ];

  const userDetailsList = [
    "Pending",
    "A0314",
    "A1MAX",
    "2022-07-15",
    "overall help",
  ];

  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    setIsLoading(true);
    getRequest(API_URL.LEAVE) /// first leave apply api call then leave list call
      .then((res) => {
        setLeaveStatus(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="background-DCDFE4 p-3">
        <div className="background-FFFFFF px-4 min-height-79">
          <div className="main-heading color-2E3192 pt-3">LEAVE</div>
          <hr className="border-DDE8F1" />

          <div className="d-flex justify-content-between">
            <div className="align-self-end">
              <span
                className="apply-pro-save-btn color-FFFFFF fontWeight-600 pointer-cur px-3 py-2"
                onClick={() => setOpen(true)}
              >
                Apply New Leave
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
                  required
                >
                  {entries.map((entry, ind) => (
                    <option
                      key={ind}
                      value={ind === 0 ? "" : entry}
                      disabled={ind === 0 && true}
                      selected={ind === 0 && true}
                      hidden={ind === 0 && true}
                    >
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
                {userDetails.map((userDetail) => (
                  <th className="text-center py-1">{userDetail}</th>
                ))}
              </tr>
            </table>

            <table className="width-100 my-5">
              <tr>
                {userDetailsList.map((userDetail, ind) => (
                  <td className="text-center py-1" key={ind}>
                    {userDetail}
                  </td>
                ))}
              </tr>
            </table>

            <table className="width-100 my-5">
              <tr>
                {userDetailsList.map((userDetail, ind) => (
                  <td className="text-center py-1" key={ind}>
                    {userDetail}
                  </td>
                ))}
              </tr>
            </table>
            <table className="width-100 mt-5">
              <tr>
                {userDetailsList.map((userDetail, ind) => (
                  <td className="text-center py-1" key={ind}>
                    {userDetail}
                  </td>
                ))}
              </tr>
            </table>
          </div>
        </div>
      </div>
      <ModalView
        open={open}
        handleModalClose={handleModalClose}
        title="Apply for Leave"
        primaryLabel="Sent"
      />
      <Loader open={isLoading} size={70} />
    </>
  );
}

export default Leave;
