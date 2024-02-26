import React from "react";

import Popover from "@mui/material/Popover";

const ModalPopover = (props) => {
  const { open, anchorEl, handleClose, selectFile } = props;


  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className="mt-1"
    >
      <input type="text" placeholder="Search" className="mx-2 mt-3" />
      {selectFile?.map((file, ind) => (
        <div key={ind} className="m-3 ">{file}</div>
      ))}
    </Popover>
  );
};

export default ModalPopover;
