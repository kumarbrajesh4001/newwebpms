import React, { useEffect, useState } from "react";
// import moment from "moment";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";

import { API_URL, getParticularUserUrl } from "../../constant/apiUrls";
import { getRequest, postMultiRequest, postRequest } from "../../services";
import { useFormik } from "formik";
// import { validationSchemaProfile } from "../../schmas";
import { useNavigate } from "react-router-dom";

import { viewInputValue } from "./empDetails.helper";
// import EmpDocumentation from "../empDocumentation";
import EmpDocument from "../empDocumentation/EmpDocument";
import getValue, { isDisabledValue } from "../../helpers/empDetail";

const EmpDetails = (props) => {
  const {
    getProfile,
    getUserDetails,
    setIsLoading,
    setSnackbarOpen,
    isViewMode,
    userId,
    setIsEmpList,
    setShowRightNav,
    initialValues,
    validationSchemaProfile,
  } = props;
  // setIsEmpList={setIsEmpList}

  const uData = {
    real_name: getProfile?.real_name,
    gender: getProfile?.gender,
    user_key: getProfile?.user_key,
    display_name: getProfile?.display_name,
    department: getProfile?.department,
    // designation: getProfile?.designation,
    DOB: getProfile?.DOB,
    DOJ: getProfile?.DOJ,
    email: getProfile?.email,
    personalEmail: getProfile?.personalEmail,
    primaryContactNumber: getProfile?.primaryContactNumber,
    secondaryContactNumber: getProfile?.secondaryContactNumber,
    secondaryContactName: getProfile?.secondaryContactName,
    address: getProfile?.address,
    pemanentaddress: getProfile?.pemanentaddress,
    bankName: getProfile?.bankName,
    accountHolderName: getProfile?.accountHolderName,
    accountNumber: getProfile?.accountNumber,
    /////
    panNumber: getProfile?.panNumber,
    aadharNumber: getProfile?.aadharNumber,
    otherValidIdsNumber: getProfile?.otherValidIdsNumber,
    nomineeName: getProfile?.nomineeName,
    emergencyContactNumber1: getProfile?.emergencyContactNumber1,
    emergencyContactNumber2: getProfile?.emergencyContactNumber2,
    panImg: getProfile?.panCard,
    adharImg: getProfile?.aadharCard,
    otherImg: getProfile?.otherValidIds,
  };

  const navigate = useNavigate();

  const [selectDepartment, setSelectDepartment] = useState(
    userId.drtm || "default"
  );

  const genders = ["Please Choose...", "Male", "Female"];

  const designations = {
    default: ["Please Choose..."],
    HR: ["Please Choose...", "Trainee", "Junior", "Senior", "Team Lead"],
    PM: ["Please Choose...", "DM", "Sr.PM", "PM", "APM", "PC"],

    Developer: [
      "Please Choose...",
      "Trainee",
      "Junior developer",
      "Senior developer",
      "TL",
    ],

    QA: ["Please Choose...", "Trainee", "Junior QA", "Senior QA", "TL lead"],
    BA: ["Please Choose...", "Trainee", "Junior BA", "Senior BA"],

    Administrator: [
      "Please Choose...",
      "Trainee",
      "Junior Administrator",
      "Senior Administrator",
    ],

    Sales: ["Please Choose...", "Trainee", "Junior Sales", "Senior Sales"],
    SEO: ["Please Choose...", "Trainee", "Junior SEO", "Senior SEO"],
    Design: ["Please Choose...", "Trainee", "Junior Design", "Senior Design"],
  };

  const departments = [
    "Please Choose...",
    "HR",
    "PM",
    "Developer",
    "QA",
    "BA",
    "Sales",
    "SEO",
    "Administrator",
    "Design",
  ];
  const empFNF = ["Select", "FNF", "Abscond"];

  const isShwBtn = (isViewMode) => {
    if (isViewMode === "prf") {
      return !getProfile?.real_name;
    } else {
      return !userId?.bool;
    }
  };

  const updateProfile = async (detail) => {
    const {
      panNumber,
      aadharNumber,
      otherValidIdsNumber,
      nomineeName,
      emergencyContactNumber1,
      emergencyContactNumber2,
      panImg,
      adharImg,
      otherImg,
      ...userDetails /// this is rest method
    } = detail;

    // console.log(typeof panImg ,"panImg");

    const formData = new FormData();

    formData.append("panCard", panImg);
    formData.append("aadharCard", adharImg);
    formData.append("otherValidIds", otherImg);

    setIsLoading(true);

    try {
      const userProfile = await postRequest(
        `${API_URL.UPDATE_PROFILE}?id=${userId.key}`,
        userDetails
      );

      if (isViewMode !== "prf") {
        if (typeof panImg === "object" && typeof adharImg === "object") {
          const userFile = await postMultiRequest(
            `${API_URL.UPLOAD_USER_FILE}?id=${userId.key}`,
            formData
          );
        }
        const docs = await postRequest(
          `${API_URL.UPLOAD_USER_DOCUMENT}?id=${userId.key}`,
          {
            panNumber,
            aadharNumber: `${aadharNumber}`,
            otherValidIdsNumber,
            nomineeName,
            emergencyContactNumber1: `${emergencyContactNumber1}`,
            emergencyContactNumber2: `${emergencyContactNumber2}`,
          }
        );
      }
      setSnackbarOpen({
        setopen: true,
        message: "profile update successfully",
        severity: "success",
      });
      getUserDetails();
      // navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
      } else {
        setSnackbarOpen({
          setopen: true,
          message: "Something is went wrong",
          severity: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const initialValues = {
  //   real_name: "",
  //   gender: "",
  //   user_key: userId?.key,
  //   display_name: userId?.disN,
  //   department: "",
  //   // designation: "",
  //   DOB: "",
  //   DOJ: "",
  //   email: userId?.eml,
  //   personalEmail: "",
  //   primaryContactNumber: "",
  //   secondaryContactNumber: "",
  //   secondaryContactName: "",
  //   address: "",
  //   pemanentaddress: "",
  //   bankName: "",
  //   accountHolderName: "",
  //   accountNumber: "",
  // };

  const {
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validationSchemaProfile,
    onSubmit: (values, action) => {
      updateProfile(values);
      action.resetForm();
    },
  });

  useEffect(() => {
    if (getProfile?.real_name && !isViewMode) {
      setValues(uData);
    }
  }, [getProfile]);

  // console.log(initialValues,"initialValues")

  return (
    <form>
      <div className="section-background-shadow-radius p-3 mb-3">
        <div className="d-flex justify-content-between mt-2 mb-4">
          <div>
            <img
              src={getProfile?.avatar}
              alt="emp_profile"
              width={80}
              height={80}
            />
            <span className="emp-heading color-000000 ms-2">
              {getProfile?.display_name}
            </span>
          </div>
          {isViewMode !== "prf" && (
            <div className="me-3">
              <button
                className={`apply-pro-save-btn px-4 py-1 text-white`}
                onClick={() => {
                  setShowRightNav("employeeList");
                  setIsEmpList(true);
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <label htmlFor="name" className="d-block label-text">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="input-section ps-2"
              name="real_name"
              value={getValue(
                isViewMode,
                getProfile?.real_name,
                values?.real_name
              )}
              disabled={isDisabledValue(isViewMode, getProfile?.real_name)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.real_name && errors.real_name && (
                <span className="error-msg">{errors.real_name}</span>
              )}
            </div>
          </div>

          <div className="col-4">
            <label htmlFor="gender" className="d-block label-text">
              Gender
            </label>
            {isDisabledValue(isViewMode, getProfile?.gender) ? (
              viewInputValue(getProfile?.gender)
            ) : (
              <select
                id="gender"
                className="input-section ps-1"
                name="gender"
                value={getValue(isViewMode, getProfile?.gender, values?.gender)}
                disabled={isDisabledValue(isViewMode, getProfile?.gender)}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {genders.map((gender, ind) => (
                  <option
                    key={ind}
                    value={ind === 0 ? "" : gender}
                    disabled={ind === 0 && true}
                    selected={ind === 0 && true}
                    hidden={ind === 0 && true}
                  >
                    {gender}
                  </option>
                ))}
              </select>
            )}

            <div className="font-14">
              {touched.gender && errors.gender && (
                <span className="error-msg">{errors.gender}</span>
              )}
            </div>
          </div>

          <div className="col-4">
            <label htmlFor="empId" className="d-block label-text">
              Employee ID
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="empId"
              placeholder="Enter employee id"
              value={getProfile?.user_name}
              name="user_key"
              disabled
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            <label htmlFor="pseudo" className="d-block label-text">
              Pseudo Name
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="pseudo"
              placeholder="Enter pseudo name"
              value={getProfile?.display_name}
              name="display_name"
              disabled
            />
          </div>
          <div className="col-4">
            <label htmlFor="department" className="d-block label-text">
              Department
            </label>
            {isDisabledValue(isViewMode, getProfile?.department) ? (
              viewInputValue(getProfile?.department)
            ) : (
              <select
                id="department"
                className="input-section ps-1"
                onChange={(e) => {
                  handleChange(e);
                  setSelectDepartment(e.target.value);
                }}
                name="department"
                value={getValue(
                  isViewMode,
                  getProfile?.department,
                  values?.department
                )}
                disabled={isDisabledValue(isViewMode, getProfile?.department)}
                onBlur={handleBlur}
              >
                {departments.map((department, ind) => (
                  <option
                    key={ind}
                    value={ind === 0 ? "" : department}
                    disabled={ind === 0 && true}
                    selected={ind === 0 && true}
                    hidden={ind === 0 && true}
                  >
                    {department}
                  </option>
                ))}
              </select>
            )}
            <div className="font-14">
              {touched.department && errors.department && (
                <span className="error-msg">{errors.department}</span>
              )}
            </div>
          </div>
          {/* when uses designation then uses */}

          {/* <div className="col-4">
            <label htmlFor="designation" className="d-block label-text">
              Designation
            </label>
            {isDisabledValue(isViewMode, getProfile?.designation) ? (
              viewInputValue(getProfile?.designation)
            ) : (
              <select
                id="designation"
                className="input-section ps-1"
                name="designation"
                value={getValue(
                  isViewMode,
                  getProfile?.designation,
                  values?.designation
                )}
                disabled={isDisabledValue(isViewMode, getProfile?.designation)}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {designations[selectDepartment]?.map((cv, ind) => (
                  <option
                    key={ind}
                    value={ind === 0 ? "" : cv}
                    hidden={ind === 0 && true}
                  >
                    {cv}
                  </option>
                ))}
              </select>
            )}

            <div className="font-14">
              {touched.designation && errors.designation && (
                <span className="error-msg">{errors.designation}</span>
              )}
            </div>
          </div> */}

          <div className="col-4">
            <label htmlFor="dob" className="d-block label-text">
              Date Of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="DOB"
              className="input-section ps-2 pe-1 pointer-cur"
              onClick={(e) => {
                e.target.showPicker();
              }}
              value={getValue(isViewMode, getProfile?.DOB, values?.DOB)}
              disabled={isDisabledValue(isViewMode, getProfile?.DOB)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.DOB && errors.DOB && (
                <span className="error-msg">{errors.DOB}</span>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-4">
            <label htmlFor="doj" className="d-block label-text">
              Date Of Joining
            </label>
            <input
              type="date"
              id="doj"
              name="DOJ"
              className="input-section ps-2 pe-1 pointer-cur"
              onClick={(e) => {
                e.target.showPicker();
              }}
              value={getValue(isViewMode, getProfile?.DOJ, values?.DOJ)}
              disabled={isDisabledValue(isViewMode, getProfile?.DOJ)}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <div className="font-14">
              {touched.DOJ && errors.DOJ && (
                <span className="error-msg">{errors.DOJ}</span>
              )}
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="emailIdOffice" className="d-block label-text">
              Email ID (Office)
            </label>
            <input
              type="email"
              className="input-section ps-2"
              id="emailIdOffice"
              name="email"
              placeholder="Enter your email Id"
              value={getProfile?.email}
              disabled
            />
          </div>
          <div className="col-4">
            <label htmlFor="emailIDPersonal" className="d-block label-text">
              Email ID (Personal)
            </label>
            <input
              type="email"
              className="input-section ps-2"
              id="emailIDPersonal"
              placeholder="Enter your email Id"
              name="personalEmail"
              value={getValue(
                isViewMode,
                getProfile?.personalEmail,
                values?.personalEmail
              )}
              disabled={isDisabledValue(isViewMode, getProfile?.personalEmail)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.personalEmail && errors.personalEmail && (
                <span className="error-msg">{errors.personalEmail}</span>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-4">
            <label htmlFor="conNoprimary" className="d-block label-text">
              contact Number (Primary)
            </label>
            <input
              type="number"
              className="input-section px-2"
              id="conNoprimary"
              placeholder="Enter contact number"
              min={0}
              name="primaryContactNumber"
              value={getValue(
                isViewMode,
                getProfile?.primaryContactNumber,
                values?.primaryContactNumber
              )}
              disabled={isDisabledValue(
                isViewMode,
                getProfile?.primaryContactNumber
              )}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue(
                  "primaryContactNumber",
                  `${event.currentTarget.value}`
                );
              }}
            />
            <div className="font-14">
              {touched.primaryContactNumber && errors.primaryContactNumber && (
                <span className="error-msg">{errors.primaryContactNumber}</span>
              )}
            </div>
          </div>

          <div className="col-4">
            <label htmlFor="conNoSecond" className="d-block label-text">
              contact Number (Secondary)
            </label>
            <input
              type="number"
              className="input-section px-2"
              id="conNoSecond"
              placeholder="Enter contact number"
              min={0}
              name="secondaryContactNumber"
              value={getValue(
                isViewMode,
                getProfile?.secondaryContactNumber,
                values?.secondaryContactNumber
              )}
              disabled={isDisabledValue(
                isViewMode,
                getProfile?.secondaryContactNumber
              )}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue(
                  "secondaryContactNumber",
                  `${event.currentTarget.value}`
                );
              }}
            />
            <div className="font-14">
              {touched.secondaryContactNumber &&
                errors.secondaryContactNumber && (
                  <span className="error-msg">
                    {errors.secondaryContactNumber}
                  </span>
                )}
            </div>
          </div>

          {/* here add secondary contact name */}

          <div className="col-4">
            <label htmlFor="secondName" className="d-block label-text">
              Secondary contact Name
            </label>
            <input
              type="text"
              id="secondName"
              placeholder="Enter second name"
              className="input-section ps-2"
              name="secondaryContactName"
              value={getValue(
                isViewMode,
                getProfile?.secondaryContactName,
                values?.secondaryContactName
              )}
              disabled={isDisabledValue(
                isViewMode,
                getProfile?.secondaryContactName
              )}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.secondaryContactName && errors.secondaryContactName && (
                <span className="error-msg">{errors.secondaryContactName}</span>
              )}
            </div>
          </div>

          {/* <div className="col-4">
            <label htmlFor="conNoSecondFmly" className="d-block label-text">
              Secondary contact Name
            </label>
            <input
              type="text"
              className="input-section px-2"
              id="conNoSecondFmly"
              placeholder="Enter second name"
              // min={0}
              name="secondaryContactName"
              value={getValue(
                isViewMode,
                getProfile?.secondaryContactName,
                values?.secondaryContactName
              )}
              disabled={isDisabledValue(
                isViewMode,
                getProfile?.secondaryContactName
              )}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue(
                  "secondaryContactName",
                  `${event.currentTarget.value}`
                );
              }}
            />
            <div className="font-14">
              {touched.secondaryContactName &&
                errors.secondaryContactName && (
                  <span className="error-msg">
                    {errors.secondaryContactName}
                  </span>
                )}
            </div>
          </div> */}
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-4">
            <label htmlFor="currentAdd" className="d-block label-text">
              Current Address
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="currentAdd"
              placeholder="Enter current address"
              name="address"
              value={getValue(isViewMode, getProfile?.address, values?.address)}
              disabled={isDisabledValue(isViewMode, getProfile?.address)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.address && errors.address && (
                <span className="error-msg">{errors.address}</span>
              )}
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="permanentAdd" className="d-block label-text">
              Permanent Address
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="permanentAdd"
              placeholder="Enter permanent address"
              name="pemanentaddress"
              value={getValue(
                isViewMode,
                getProfile?.pemanentaddress,
                values?.pemanentaddress
              )}
              disabled={isDisabledValue(
                isViewMode,
                getProfile?.pemanentaddress
              )}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.pemanentaddress && errors.pemanentaddress && (
                <span className="error-msg">{errors.pemanentaddress}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* when download salary slip then use it */}

      {/* {isViewMode !== "prf" && (
        <div className="section-background-shadow-radius p-3 my-3">
          <span className="emp-heading color-2E3192">Salary Slip</span>
          <div className="row mt-4">
            <div className="col-4">
              <label htmlFor="dom" className="d-block label-text">
                From Month
              </label>
              <input
                type="month"
                id="dom"
                className="input-section ps-2 pe-1 pointer-cur"
                onChange={(e) => {
                  setRangeMonth(e.target.value);

                  setInputValue("");
                }}
                onClick={(e) => {
                  e.target.showPicker();
                }}
                max={currentMonth}
              />
            </div>
            {!(rangeMonth === currentMonth) && (
              <div className="col-4">
                <label htmlFor="doj" className="d-block label-text">
                  To Month
                </label>
                <input
                  type="month"
                  id="doj"
                  className="input-section ps-2 pe-1 me-2 pointer-cur"
                  min={rangeMonth}
                  max={currentMonth}
                  disabled={!rangeMonth}
                  onClick={(e) => {
                    e.target.showPicker();
                  }}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  value={inputValue}
                />
              </div>
            )}
            <div className="col-4 margin-top-19 p-0">
              <span className="pointer-cur">
                <img src={dwn_btn} alt="dwn-btn" width="61px" />
                <span className="ps-2 hr-secNo color-686868">
                  Download Salary Slip
                </span>
              </span>
            </div>
          </div>
        </div>
      )} */}

      {isViewMode !== "prf" && (
        <EmpDocument
          getProfile={getProfile}
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setIsLoading={setIsLoading}
          isViewMode={isViewMode}
          getValue={getValue}
          isDisabledValue={isDisabledValue}
        />
      )}

      <div className={`section-background-shadow-radius p-3 my-3`}>
        <span className="emp-heading color-2E3192">Bank Details</span>
        <div className="row mt-4">
          <div className="col-4">
            <label htmlFor="bank-name" className="d-block label-text">
              Bank Name
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="bank-name"
              placeholder="Enter bank name"
              name="bankName"
              value={getValue(
                isViewMode,
                getProfile?.bankName,
                values?.bankName
              )}
              disabled={isDisabledValue(isViewMode, getProfile?.bankName)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.bankName && errors.bankName && (
                <span className="error-msg">{errors.bankName}</span>
              )}
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="holder-name" className="d-block label-text">
              Account Holder Name
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="holder-name"
              placeholder="Enter account holder name"
              name="accountHolderName"
              value={getValue(
                isViewMode,
                getProfile?.accountHolderName,
                values?.accountHolderName
              )}
              disabled={isDisabledValue(
                isViewMode,
                getProfile?.accountHolderName
              )}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className="font-14">
              {touched.accountHolderName && errors.accountHolderName && (
                <span className="error-msg">{errors.accountHolderName}</span>
              )}
            </div>
          </div>
          <div className="col-4">
            <label htmlFor="account-number" className="d-block label-text">
              Account Number
            </label>
            <input
              type="number"
              className="input-section px-2"
              id="account-number"
              placeholder="Enter account number"
              name="accountNumber"
              min={0}
              value={getValue(
                isViewMode,
                getProfile?.accountNumber,
                values?.accountNumber
              )}
              disabled={isDisabledValue(isViewMode, getProfile?.accountNumber)}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("accountNumber", `${event.currentTarget.value}`);
              }}
            />
            <div className="font-14">
              {touched.accountNumber && errors.accountNumber && (
                <span className="error-msg">{errors.accountNumber}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {isViewMode !== "prf" && (
        <div className="section-background-shadow-radius p-3 my-3 row">
          <span className="emp-heading color-2E3192 mb-3">Only For HR </span>

          <div className="col-4">
            <label htmlFor="slt" className="d-block label-text">
              Reason
            </label>

            <select
              id="slt"
              className="input-section ps-1"
              name="gender"
              // value={getValue(isViewMode, getProfile?.gender, values?.gender)}
              // disabled={isDisabledValue(isViewMode, getProfile?.gender)}
              // onBlur={handleBlur}
              // onChange={handleChange}
            >
              {empFNF.map((sltRsn, ind) => (
                <option
                  key={ind}
                  // value={ind === 0 ? "" : sltRsn}
                  // disabled={ind === 0 && true}
                  // selected={ind === 0 && true}
                  // hidden={ind === 0 && true}
                >
                  {sltRsn}
                </option>
              ))}
            </select>
          </div>

          <div className="col-4">
            <label htmlFor="doe" className="d-block label-text">
              Date Of Ending
            </label>
            <input
              type="date"
              id="doe"
              name="DOE"
              className="input-section ps-2 pe-1 pointer-cur"
              onClick={(e) => {
                e.target.showPicker();
              }}
              // value={getValue(isViewMode, getProfile?.DOB, values?.DOB)}
              // disabled={isDisabledValue(isViewMode, getProfile?.DOB)}
              // onBlur={handleBlur}
              // onChange={handleChange}
            />
          </div>
        </div>
      )}

      {isShwBtn(isViewMode) && (
        <div className="d-flex justify-content-end mt-4 px-3">
          <span
            className="cancel-button px-5 py-1"
            onClick={() => {
              if (isViewMode === "prf") {
                navigate("/");
              } else {
                setIsEmpList(true);
              }
            }}
          >
            Cancel
          </span>

          <button
            type="submit"
            className={`apply-pro-save-btn px-5 py-1 text-white ms-3`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      )}

      {/* when use SalaryStructure then use */}

      {/* {isViewMode !== "prf" && userDetails?.role === "SuperAdmin" && (
        <SalaryStructure isViewMode={isViewMode} />
      )} */}
    </form>
  );
};

export default EmpDetails;
