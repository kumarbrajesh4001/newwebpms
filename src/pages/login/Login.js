import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
// import Button from "react-bootstrap/Button";
import Button from "@mui/material/Button";
import { HOSTNAME_URL } from "../../constant";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";

import { validationSchemaLogin } from "../../schmas";
import HeadingLogo from "../../components/heading_logo";
import Loader from "../../components/loader";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";
import rememberMeCredential from "../../helpers/rememberMe";

import STORAGE_KEY from "../../constant/storageKey";
import { getCredentialFromLocalStorage } from "../../helpers/localStorage";

const initialValues = {
  userName: "",
  password: "",
  hostName: HOSTNAME_URL,
};

function Login(props) {
  const {
    getLoginData,
    isLoading,
    opensnackbar,
    handleClose,
    rememberMe,
    setRememberMe,
  } = props;

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: validationSchemaLogin,
    onSubmit: (values, action) => {
      getLoginData(values);
      action.resetForm();
      rememberMeCredential(rememberMe, STORAGE_KEY.CREDENTIAL, values);
    },
  });

  useEffect(() => {
    const { userName, password, hostName } = getCredentialFromLocalStorage(
      STORAGE_KEY.CREDENTIAL
    ) || { userName: "", password: "", hostName: "pms.aistechnolabs.xyz" };

    setValues({ userName, password, hostName });
  }, []);

  return (
    <div className="full-view-height bg-img d-flex align-items-center">
      <div className="container  letter-space py-md-5 py-0 login-page">
        <div className="row">
          <HeadingLogo />

          <div className="col-md-6 col-12 d-flex justify-content-center ms-md-0 ms-2">
            <form className="background-2E3192 rounded px-5 py-4">
              <div className="mx-1">
                <div className="heading-1 c-font-height color-FFFFFF">
                  LOGIN
                </div>

                <label
                  htmlFor="pms"
                  className="color-FFFFFF d-block heading-4 mt-3"
                >
                  Pms web
                </label>
                <TextField
                  size="small"
                  value="pms.aistechnolabs.xyz"
                  id="pms"
                  sx={{
                    width: "16rem",
                    border: "1px solid white",
                    borderRadius: "5px",
                    input: {
                      color: "white",
                      fontSize: "0.94rem",
                      opacity: ".6",
                    },
                  }}
                  focused={false}
                  inputProps={{ readOnly: true }}
                />
                <label
                  htmlFor="userName"
                  className="heading-4 color-FFFFFF d-block mt-3"
                >
                  Username
                </label>
                <TextField
                  sx={{
                    width: "16rem",
                    border: "1px solid white",
                    borderRadius: "5px",
                    input: { color: "white", fontSize: "0.94rem" },
                  }}
                  focused={false}
                  size="small"
                  name="userName"
                  placeholder="Enter Your Username"
                  id="userName"
                  value={values.userName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="font-14">
                  {touched.userName && errors.userName && (
                    <span className="error-msg">{errors.userName}</span>
                  )}
                </div>

                <label
                  htmlFor="password"
                  className={`heading-4 color-FFFFFF d-block ${
                    (!touched.userName && "mt-3") ||
                    (!errors.userName && "mt-3")
                  }`}
                >
                  Password
                </label>
                <FormControl focused={false}>
                  <OutlinedInput
                    sx={{
                      width: "16rem",
                      border: "1px solid white",
                      borderRadius: "5px",
                      input: { color: "white", fontSize: "0.94rem" },
                    }}
                    type={hiddenPassword ? "password" : "text"}
                    size="small"
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <IconButton
                        className="text-light"
                        edge="end"
                        onClick={() => {
                          setHiddenPassword(!hiddenPassword);
                        }}
                      >
                        {hiddenPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                </FormControl>
                <div className="font-14">
                  {touched.password && errors.password && (
                    <span className="error-msg">{errors.password}</span>
                  )}
                </div>
                <div
                  className={`row heading-5 color-FFFFFF ${
                    (!touched.password && "mt-2") ||
                    (!errors.password && "mt-2")
                  } rem-for`}
                >
                  <div className="col-6 rem-checkbox">
                    <div className="form-group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        id="remember"
                        onClick={() => {
                          setRememberMe(!rememberMe);
                        }}
                      />
                      <label
                        htmlFor="remember"
                        className="text-top position-relative pointer-cur"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  {/* 
                  <div className="col-6 col2-w text-end">
                    <NavLink
                      to="/forgot-password"
                      className="color-FFFFFF hov-color"
                    >
                      Forgot password ?
                    </NavLink>
                  </div> */}
                </div>

                <Button
                  size="sm"
                  type="submit"
                  className={`col-12 ${!errors.password ? "my-1" : "mb-1"}`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#f7f7f7",
                    color: `${!isLoading ? "#2e3192" : ""}`,
                    borderRadius: "5px",
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Loader open={isLoading} size={70} />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </div>
  );
}

Login.propTypes = {
  getLoginData: PropTypes.func,
  isLoading: PropTypes.bool,
};
Login.defaultProps = {
  getLoginData: noop,
  isLoading: false,
};

export default Login;
