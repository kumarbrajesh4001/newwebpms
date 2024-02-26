import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function AlertDialog(props) {
  const {
    handleClose,
    open,
    cancelRfs,
    setCancelRef,
    refreshData,
    isSaveBtn,
    saveMWL,
  } = props;

  return (
    <div>
      <Dialog open={open}>
        <div className="pt-4 pb-3 text-center">
          {cancelRfs ? (
            <ErrorOutlineIcon className="err-icon" />
          ) : (
            <CancelOutlinedIcon className="err-icon" />
          )}
        </div>

        <h2 className="text-center">
          {cancelRfs ? "Are you sure?" : "Cancelled"}
        </h2>

        <DialogContent className="mx-5">
          <DialogContentText
            className={
              !cancelRfs ? "mx-5 px-4" : isSaveBtn === "do" && "mx-3 px-4"
            }
          >
            {cancelRfs
              ? isSaveBtn === "refresh"
                ? "You selected project and issue will be lost!"
                : "You want to save your worklog!"
              : "Your work is safe :)"}
          </DialogContentText>
        </DialogContent>
        <div className="text-center pb-4 mt-2">
          {cancelRfs ? (
            <>
              <span
                onClick={() => {
                  setCancelRef(false);
                }}
                className="btn-cnl py-2 px-4 background-c1c1c1"
              >
                No, cancel plz!
              </span>

              <span
                className="btn-cnl py-2 px-4 ms-2 background-dd6b55"
                onClick={isSaveBtn === "refresh" ? refreshData : saveMWL}
              >
                {`Yes ${isSaveBtn} it!`}
              </span>
            </>
          ) : (
            <span
              onClick={handleClose}
              className="btn-cnl py-2 px-4 background-8CD4F5"
            >
              OK
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
