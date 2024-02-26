import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function ErrorSnackBar(props) {
  const { opensnackbar, handleClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={opensnackbar.setopen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      {opensnackbar.message && (
        <Alert
          onClose={handleClose}
          severity={opensnackbar.severity}
          sx={{ width: "100%" }}
          className="me-5"
        >
          {opensnackbar.message}
        </Alert>
      )}
    </Snackbar>
  );
}

ErrorSnackBar.propTypes = {
  opensnackbar: PropTypes.object,
  handleClose: PropTypes.func,
};

ErrorSnackBar.defaultProps = {
  opensnackbar: {},
  handleClose: noop,
};

export default ErrorSnackBar;
