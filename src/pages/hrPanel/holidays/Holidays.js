import React, { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import moment from "moment";
import HolidayKnowledgeModalView from "../../../components/holidayKnowledgeModalView";
import { getRequest, postRequest } from "../../../services";
import { API_URL } from "../../../constant/apiUrls";
import Loader from "../../../components/loader";

import { csvJSON } from "./holidays.helper";
import { getYear, getDDMMYYYY } from "../../../formatter/date";

const Holidays = (props) => {
  const { showLeftNav, setIsLoading, setSnackbarOpen } = props;

  
  const [holidaysList, setHolidaysList] = useState([]);

  console.log(holidaysList);
  
  const [uploadFile, setUploadFile] = useState({ name: "Upload file" });
  
  const [holidayDiaogOpen, setHolidayDiaogOpen] = useState(false);

  const handleModalClose = () => setHolidayDiaogOpen(false);

  const holidaysDetails = ["Sr. No.", "Name of Holidays", "Date"];

  const fileSelectedHandler = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const getHolidaysList = () => {
    setIsLoading(true);
    getRequest(API_URL.HOLIDAYS)
      .then((res) => {
        setHolidaysList(csvJSON(res.data));
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
      });
  };

  const formData = new FormData();
  formData.append("holidaylist", uploadFile);

  const getHoliList = () => {
    setIsLoading(true);
    postRequest(API_URL.HOLIDAYS, formData)
      .then((res) => {
        setUploadFile({ name: "Upload file" });
        setSnackbarOpen({
          setopen: true,
          message: "Holidays List upload successfully",
          severity: "success",
        });
        getHolidaysList();
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
      });
  };

  useEffect(() => {
    getHolidaysList();
  }, []);

  return (
    <>
      <div className={`${showLeftNav ? "width-82per" : "col-11"} px-4`}>
        <div className="d-flex justify-content-between mt-4">
          <span className="main-heading color-2E3192">
            Holidays for the year of {getYear}
          </span>

          <span>
            <span className="cancel-button py-1 d-inline-flex align-items-center justify-content-around width-160">
              <label htmlFor="file" className="pointer-cur text-trun">
                <UploadFileIcon className="color-2E3192 mx-1" />
                <span className="ms-1">{uploadFile?.name}</span>
              </label>

              <input
                type="file"
                accept=".csv"
                id="file"
                onChange={fileSelectedHandler}
                multiple
                value={null}
                style={{ display: "none" }}
                onClick={(event) => (event.target.value = null)}
              />
            </span>
            <button
              className={`${
                uploadFile?.name === "Upload file"
                  ? "disable-btn"
                  : "apply-pro-save-btn text-white"
              }   px-5 py-1 ms-2`}
              disabled={uploadFile?.name === "Upload file" ? true : false}
              onClick={() => {
                setHolidayDiaogOpen(true);
              }}
            >
              Upload
            </button>
          </span>
        </div>

        <table className="width-100 mt-4">
          <tr className="background-EEF3F8">
            {holidaysDetails.map((holidayDetail) => (
              <th className="text-center py-1">{holidayDetail}</th>
            ))}
          </tr>
          {holidaysList?.map((list, ind) => (
            <tr key={ind}>
              <td className="text-center py-1">{ind + 1}</td>

              <td className="text-center py-1">{list.holidays}</td>
              <td className="text-center py-1">{getDDMMYYYY(list?.date)}</td>
            </tr>
          ))}
        </table>
      </div>
      <HolidayKnowledgeModalView
        modalOpne={holidayDiaogOpen}
        handleDialogClose={handleModalClose}
        title="Holidays file upload successfully"
        primaryLabel="OK"
        getHoliListOrDeleteDocs={getHoliList}
      />
      {/* <Loader open={isLoading} size={70} /> */}
    </>
  );
};

export default Holidays;
