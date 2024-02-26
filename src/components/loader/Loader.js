import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = (props) => {
  const { open, size } = props;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" size={size} />
    </Backdrop>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
};

Loader.defaultProps = {
  size: 70,
};

export default Loader;
