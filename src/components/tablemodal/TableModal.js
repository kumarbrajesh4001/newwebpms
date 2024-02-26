import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import head from "lodash/head";

import { logStatus } from "../../helpers/worklog";

function TableModal(props) {
  const { tableModal, tableModalClose, userLogs, isUser } = props;

  const userStatuses = [
    "Key",
    "Date",
    "Submission Date",
    "Description",
    "Worked",
    "PM",
    "Status",
  ];

  return (
    <Modal
      open={tableModal}
      onClose={tableModalClose}
      className="modal-scrll mb-4"
    >
      <Box className="box-modal shadow  pt-3 pb-4">
        <div className="d-flex justify-content-between mx-3">
          <div className="calender-date font-size-17 color-000000">
            {isUser && head(userLogs)?.worklog_Full_Date}
          </div>
          <div>
            <IconButton size="small" onClick={tableModalClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        <hr />

        <div className="row mx-3">
          {userStatuses?.map(
            (status, ind) =>
              (isUser || (ind !== 2 && ind !== 5)) && (
                <div
                  key={ind}
                  className={`${
                    ind !== 3 && "text-center"
                  } hr-secHeading font-size-15 ${
                    ((ind === 0 || ind === 1 || ind === 2) && "col-2") ||
                    (ind === 3 && (isUser ? "col-3" : "col-5")) ||
                    (ind === 4 && "col-1") ||
                    (ind === 5 && "col-1") ||
                    (ind === 6 && (isUser ? "col-1" : "col-2"))
                  }`}
                >
                  {status}
                </div>
              )
          )}
        </div>

        <hr />

        {userLogs?.map((cv, ind, arr) => (
          <>
            <div key={ind} className="row mx-3">
            <div className="text-center color-000000 col-2" id="modelBoxKeyValue">
                {cv.issue_key}
              </div>
              <div className="text-center color-000000 col-2">
                {cv.worklog_Full_Date}
              </div>
              {isUser && (
                <div className="text-center color-000000 col-2">
                  {cv.dateCreated}
                </div>
              )}
              <div className={`color-000000 ${isUser ? "col-3" : "col-5"}`}>
                {cv.issue_cmnt}
              </div>
              <div className="text-center color-000000 col-1">
                {cv.worklog_time}
              </div>
              {isUser && (
                <div className="text-center color-000000 col-1">
                  {cv.PM_Name}
                </div>
              )}
              <div
                className={`text-center color-000000 ${
                  isUser ? "col-1" : "col-2"
                }`}
              >
                {isUser ? logStatus(cv.worklogAttrValue) : cv.AttrStatus}
              </div>
            </div>

            {isUser ? ind < arr.length - 1 && <hr /> : <hr />}
          </>
        ))}

        {!isUser && (
          <div className=" text-end pt-2 pb-1 px-4">
            <span className="cancel-button px-3 py-2" onClick={tableModalClose}>
              Close
            </span>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default TableModal;
