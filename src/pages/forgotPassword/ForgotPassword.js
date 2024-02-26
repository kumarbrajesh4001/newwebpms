import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import HeadingLogo from "../../components/heading_logo";
import { validationSchemaforgotPassword } from "../../schmas";

const initialValues = {
  userName: "",
  newPassword: "",
  confirmPassword: "",
};

function ForgotPassword() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validationSchemaforgotPassword,
      onSubmit: (values, action) => {
       
        action.resetForm();
      },
    });

  const [isShowNewPassword, setIsShowNewPassword] = useState(true);
  const [isShowConfirmtPassword, setIsShowConfirmtPassword] = useState(true);

  return (
    <div className="full-view-height bg-img d-flex align-items-center">
      <div className="container shadow letter-space py-md-5 py-0 background-FFFFFF">
        <div className="row">
          <HeadingLogo />
          <div className="col-12 col-md-6 d-flex justify-content-center ms-md-0 ms-2">
            <form className="background-2E3192 rounded  px-5 py-4">
              <div className="mx-1">
                <div className="heading-1-small c-font-height color-FFFFFF">
                  FORGOT PASSWORD
                </div>
                <label
                  htmlFor="password"
                  className="heading-4 color-FFFFFF d-block mt-3"
                >
                  Username
                </label>
                <FormControl focused={false}>
                  <OutlinedInput
                    sx={{
                      width: "16rem",
                      border: "1px solid white",
                      input: { color: "white", fontSize: "0.94rem" },
                    }}
                    type="text"
                    size="small"
                    name="userName"
                    placeholder="Enter Your Username"
                    id="password"
                    value={values.userName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </FormControl>
                <div className="error-msg">
                  {touched.userName && errors.userName && errors.userName}
                </div>
                <label
                  htmlFor="newPassword"
                  className={`heading-4 color-FFFFFF d-block ${
                    (!touched.userName && "mt-3") ||
                    (!errors.userName && "mt-3")
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
                    value={values.password}
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
                        {isShowNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                </FormControl>
                <div className={`error-msg `}>
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
                  className={`col-12 border-radius mb-2 ${
                    (!touched.confirmPassword && "mt-5") ||
                    (!errors.confirmPassword ? "mt-5" : "mt-4")
                  }`}
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
  );
}

export default ForgotPassword;
