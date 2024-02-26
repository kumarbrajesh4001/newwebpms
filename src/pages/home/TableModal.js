import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function TableModal(props) {
  const { open, handleModalClose } = props;

  return (
    <div>
      <Modal open={open} onClose={handleModalClose}>
        <Box sx={style}>
          <div className="row mb-2">
            <div className="col-11 color-000000  fontWeight-600">5-Dec-2022</div>
            <div className="col-1 text-end">
              <IconButton size="small" onClick={handleModalClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
            <hr className="mt-2 mb-4" />
            <div className="col-2 date-no text-center">Key</div>
            <div className="col-2 date-no text-center st-date">Date</div>
            <div className="col-2 sub-date1 date-no text-center sub-date">
              Submission Date
            </div>
            <div className="col-2 date-no text-center">Description</div>
            <div className="col-1 date-no text-center">Work</div>
            <div className="col-1 date-no text-center">PM</div>
            <div className="col-2 date-no text-center">Log Status</div>
            <hr className="mt-4 mb-3" />
            <div className="col-2 text-center font-14 color-000000">
              AISTIMER-50
            </div>
            <div className="col-2 text-center font-14 color-000000 st-date">
              5-Dec-2022
            </div>
            <div className="col-2 text-center font-14 color-000000 sub-date">
              6-Dec-2022
            </div>
            <div className="col-2 text-center font-14 color-000000">
              testing 3h
            </div>
            <div className="col-1 text-center font-14 color-000000">3.00h</div>
            <div className="col-1 text-center font-14 color-000000">Max</div>
            <div className="col-2 text-center font-14 color-000000">
              Approved
            </div>

            {/* <div className="col-6">
              <span>Key</span>
              <span className="mx-3">Date</span>
              <span>Submission Date</span>
              <span className="ms-3">Description</span>
            </div>
            <div className="col-6">
              <span>Worked</span>
              <span className="mx-3">PM</span>
              <span>Log Status</span>
            </div>
            <div className="col-6">
              <span>AIS</span>
              <span className="mx-3">5-Dec-2022</span>
              <span>6-Dec-2022</span>
            </div>
            <div className="col-6">
              <span>3.00 h</span>
              <span className="mx-3">Max</span>
              <span>Approved</span>
            </div> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TableModal;
