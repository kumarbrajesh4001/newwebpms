import React from "react";
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useNavigate } from "react-router-dom";
import { getRequest, postMultiRequest, postRequest } from "../../services";
import { API_URL } from "../../constant/apiUrls";
import { useFormik } from "formik";
import { validationSchemaDocuments } from "../../schmas";
// import { getCookiesToken } from "../../helpers/cookies";
// import fetchImage from "./empDocumentation.helper";
import EmpDocument from "./EmpDocument";
import getValue, { isDisabledValue } from "../../helpers/empDetail";

// let upDocs = "Upload Document";

const uploadsDocs = {
  panNumber: "",
  aadharNumber: "",
  otherValidIdsNumber: "",

  nomineeName: "",
  emergencyContactNumber1: "",
  emergencyContactNumber2: "",

  panImg: "",
  adharImg: "",
  otherImg: "",
};

const EmployeeDocumentation = (props) => {
  const { getProfile, setSnackbarOpen, setIsLoading, getUserDetails } = props;

  const navigate = useNavigate();

  const uploadDocumnets = async (docs) => {
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
    } = docs;

    const formData = new FormData();

    formData.append("panCard", panImg);
    formData.append("aadharCard", adharImg);
    formData.append("otherValidIds", otherImg);

    setIsLoading(true);

    try {
      const userFile = await postMultiRequest(
        API_URL.UPLOAD_USER_FILE,
        formData
      );
      const docs = await postRequest(API_URL.UPLOAD_USER_DOCUMENT, {
        panNumber,
        aadharNumber: `${aadharNumber}`,
        otherValidIdsNumber,
        nomineeName,
        emergencyContactNumber1: `${emergencyContactNumber1}`,
        emergencyContactNumber2: `${emergencyContactNumber2}`,
      });

      setSnackbarOpen({
        setopen: true,
        message: "documents update successfully",
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

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: uploadsDocs,
    validationSchema: validationSchemaDocuments,
    onSubmit: (values, action) => {
      uploadDocumnets(values);

      action.resetForm();
    },
  });

  return (
    <form>
      <EmpDocument
        getProfile={getProfile}
        values={values}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        handleChange={handleChange}
        setIsLoading={setIsLoading}
        isViewMode="prf"
        getValue={getValue}
        isDisabledValue={isDisabledValue}
      />

      {!getProfile?.panNumber && (
        <div className="d-flex justify-content-end mt-4 px-3">
          <span
            className="cancel-button px-5 py-1"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </span>

          <button
            type="submit"
            className="apply-pro-save-btn px-5 py-1 text-white ms-4"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
};

export default EmployeeDocumentation;
