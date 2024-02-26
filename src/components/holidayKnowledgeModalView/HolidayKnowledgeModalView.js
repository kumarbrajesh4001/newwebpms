import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function HolidayKnowledgeModalView(props) {
  const {
    modalOpne,
    handleDialogClose,
    title,
    secondaryLabel,
    primaryLabel,
    getHoliListOrDeleteDocs,
  } = props;

 

  return (
    <Modal open={modalOpne} onClose={handleDialogClose}
    
    sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          height: "100%",
          width: "100%",
          maxWidth: "1000px",
          wordBreak: "break-word",
        },
      },
    }}
    
    >
      <Box className="modalView">
        <div className="holiday-popup color-2E3192 mb-5">{title}</div>

        <div className="text-center mt-5 mb-2">
          {!!secondaryLabel && (
            <span
              className="cancel-button px-5 py-1 me-3"
              onClick={handleDialogClose}
            >
              {secondaryLabel}
            </span>
          )}

          <span
            className="apply-pro-save-btn px-5 py-1 text-white"
            onClick={() => {
              getHoliListOrDeleteDocs();
              handleDialogClose();
            }}
          >
            {primaryLabel}
          </span>
        </div>
      </Box>
    </Modal>
  );
}

export default HolidayKnowledgeModalView;
