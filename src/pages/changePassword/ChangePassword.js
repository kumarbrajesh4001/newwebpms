import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import Button from "react-bootstrap/Button";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import HeadingLogo from "../../components/heading_logo";
import { validationSchemaChangePassword } from "../../schmas";
import { postRequest } from "../../services";
import { API_URL } from "../../constant/apiUrls";
import Loader from "../../components/loader";
import { deleteCookies } from "../../helpers/cookies";
import { clearDataFromLocalStorage } from "../../helpers/localStorage";
import { clearSessionStorage } from "../../helpers/sessionStorage";
import STORAGE_KEY from "../../constant/storageKey";
import { useDispatch, useSelector } from "react-redux";
import { removeUserKey } from "../../redux/reducer/sessionReducer";
import { useNavigate } from "react-router-dom";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePassword(props) {
  const { setToken, setSnackbarOpen, opensnackbar, handleClose } = props;

  const pageName = useSelector(
    ({ userInfoReducer }) => userInfoReducer?.pageRouteName
  );

  

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isShowOldPassword, setIsShowOldPassword] = useState(true);

  const [isShowNewPassword, setIsShowNewPassword] = useState(true);
  const [isShowConfirmtPassword, setIsShowConfirmtPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = (value) => {
    setIsLoading(true);
    postRequest(API_URL.UPDATE_PASSWORD, value)
      .then((res) => {
        
        if (res.data.status === "success") {
          navigate("/");
          deleteCookies();
          setToken(false);
          clearDataFromLocalStorage(STORAGE_KEY.USER_DATA);
          clearSessionStorage();
          dispatch(removeUserKey());
        }
        setSnackbarOpen({
          setopen: true,
          message: `${res.data.message} ${
            res.data.status === "success" ? "please login again" : ""
          }`,
          severity: res.data.status === "success" ? "success" : "error",
        });
      })
      .catch((err) => {
        setSnackbarOpen({
          setopen: true,
          message: err.data.message,
          severity: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validationSchemaChangePassword,
      onSubmit: ({ currentPassword, newPassword }, action) => {
        updatePassword({ currentPassword, newPassword });
        action.resetForm();
      },
    });

  return (
    <>
      <div className="full-view-height bg-img d-flex align-items-center">
        <div className="container shadow letter-space pb-md-4 pb-0 pt-2 background-FFFFFF">
          <IconButton
            onClick={() => {
              navigate(pageName);
            }}
          >
            <KeyboardBackspaceIcon color="primary" fontSize="large" />
          </IconButton>

          <div className="row">
            <HeadingLogo />
            <div className="col-12 col-md-6 d-flex justify-content-center ms-md-0 ms-2">
              <form className="background-2E3192 rounded  px-5 py-4">
                <div className="mx-1">
                  <div className="heading-1-small c-font-height color-FFFFFF">
                    CHANGE PASSWORD
                  </div>

                  <label
                    htmlFor="currentPassword"
                    className="heading-4 color-FFFFFF d-block mt-3"
                  >
                    Current Password
                  </label>
                  <FormControl focused={false}>
                    <OutlinedInput
                      sx={{
                        width: "16rem",
                        border: "1px solid white",
                        input: { color: "white", fontSize: "0.94rem" },
                      }}
                      type={isShowOldPassword ? "password" : "text"}
                      size="small"
                      placeholder="Current Password"
                      id="currentPassword"
                      name="currentPassword"
                      value={values.currentPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <IconButton
                          className="text-light"
                          edge="end"
                          onClick={() => {
                            setIsShowOldPassword(!isShowOldPassword);
                          }}
                        >
                          {isShowOldPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      }
                    />
                  </FormControl>
                  <div className="error-msg">
                    {touched.currentPassword &&
                      errors.currentPassword &&
                      errors.currentPassword}
                  </div>

                  <label
                    htmlFor="newPassword"
                    className={`heading-4 color-FFFFFF d-block ${
                      (!touched.currentPassword && "mt-3") ||
                      (!errors.currentPassword && "mt-3")
                    }`}
                  >
                    New Password
                  </label>
                  <FormControl focused={false}>
                    <OutlinedInput
                      sx={{
                        width: "16rem",
                        border: "1px solid white",
                        input: { color: "white", fontSize: "0.94rem" },
                      }}
                      type={isShowNewPassword ? "password" : "text"}
                      size="small"
                      placeholder="New Password"
                      id="newPassword"
                      name="newPassword"
                      value={values.newPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <IconButton
                          className="text-light"
                          edge="end"
                          onClick={() => {
                            setIsShowNewPassword(!isShowNewPassword);
                          }}
                        >
                          {isShowNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      }
                    />
                  </FormControl>
                  <div className="error-msg">
                    {touched.newPassword &&
                      errors.newPassword &&
                      errors.newPassword}
                  </div>

                  <label
                    htmlFor="confirmPassword"
                    className={`heading-4 color-FFFFFF d-block ${
                      (!touched.newPassword && "mt-3") ||
                      (!errors.newPassword && "mt-3")
                    }`}
                  >
                    Confirm Password
                  </label>
                  <FormControl focused={false}>
                    <OutlinedInput
                      sx={{
                        width: "16rem",
                        border: "1px solid white",
                        input: { color: "white", fontSize: "0.94rem" },
                      }}
                      type={isShowConfirmtPassword ? "password" : "text"}
                      size="small"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <IconButton
                          className="text-light"
                          edge="end"
                          onClick={() => {
                            setIsShowConfirmtPassword(!isShowConfirmtPassword);
                          }}
                        >
                          {isShowConfirmtPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      }
                    />
                  </FormControl>
                  <div className="error-msg">
                    {touched.confirmPassword &&
                      errors.confirmPassword &&
                      errors.confirmPassword}
                  </div>

                  <Button
                    variant="light"
                    size="sm"
                    className={`col-5 border-radius ${
                      (!touched.confirmPassword && "mt-5") ||
                      (!errors.confirmPassword ? "mt-5" : "mt-4")
                    } mb-2`}
                    onClick={() => {
                      navigate(pageName);
                    }}
                  >
                    <span className="color-2E3192">Cancel</span>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className={`col-5 border-radius float-end ${
                      (!touched.confirmPassword && "mt-5") ||
                      (!errors.confirmPassword ? "mt-5" : "mt-4")
                    } mb-2`}
                    onClick={handleSubmit}
                  >
                    <span className="color-2E3192">Submit</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Loader open={isLoading} size={70} />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
}

export default ChangePassword;
