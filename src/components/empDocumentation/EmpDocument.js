import React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// import fetchImage from "./empDocumentation.helper";
// import { getRequest } from "../../services";
// import { API_URL } from "../../constant/apiUrls";
import fetchImage from "../../helpers/viewDocs";

let upDocs = "Upload Document";

function EmpDocument(props) {
  const {
    getProfile,
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    setIsLoading,
    isViewMode,
    getValue,
    isDisabledValue,
  } = props;

  

  const viewDocsAndUpload = (docs, docsName, isViewMode) => {
    if (isViewMode === "prf") {
      docs
        ? fetchImage(`/empDocs?name=${docs}`, setIsLoading) ///this is comming two time ,so shorted code
        : document.getElementById(docsName).click(); ///this is comming two time ,so shorted code
    } else {
      if (isViewMode) {
        fetchImage(`/empDocs?name=${docs}`, setIsLoading); ///this is comming two time ,so shorted code
      } else {
        document.getElementById(docsName).click(); ///this is comming two time ,so shorted code
      }
    }
  };

  //// here code refactor ////

  const showDocsName = (docsName, valueName, isViewMode) => {
    if (isViewMode === "prf") {
      return docsName ? docsName : valueName ? valueName?.name : upDocs;
    } else {
      if (isViewMode) {
        return docsName ? docsName : upDocs;
      } else {
        if (!!valueName?.name) {
          return valueName?.name;
        } else {
          return valueName ? valueName : upDocs;
        }
      }
    }

  
  };

  return (
    <div className="section-background-shadow-radius p-3">
      <span className="emp-heading color-2E3192">Document</span>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="pan" className="d-block label-text">
            Pancard Number
          </label>
          <input
            type="text"
            className="input-section ps-2"
            id="pan"
            placeholder="Enter pan number"
            name="panNumber"
            value={getValue(
              isViewMode,
              getProfile?.panNumber,
              values?.panNumber
            )}
            disabled={isDisabledValue(isViewMode, getProfile?.panNumber)}
            onBlur={handleBlur}
            onChange={handleChange}

            // required
          />
          <div className="font-14">
            {touched.panNumber && errors.panNumber && (
              <span className="error-msg">{errors.panNumber}</span>
            )}
          </div>
        </div>
        <div className="col-4">
          <label htmlFor="aadhar" className="d-block label-text">
            Aadhar Card Number
          </label>
          <input
            type="number"
            className="input-section ps-2"
            id="aadhar"
            placeholder="Enter aadhar number"
            // onChange={fileSelectedHandler}
            name="aadharNumber"
            value={getValue(
              isViewMode,
              getProfile?.aadharNumber,
              values?.aadharNumber
            )}
            disabled={isDisabledValue(isViewMode, getProfile?.aadharNumber)}
            onBlur={handleBlur}
            onChange={handleChange}
            min={0}
            // required
          />

          <div className="font-14">
            {touched.aadharNumber && errors.aadharNumber && (
              <span className="error-msg">{errors.aadharNumber}</span>
            )}
          </div>
        </div>
        <div className="col-4">
          <label htmlFor="other" className="d-block label-text">
            Other Valid IDs
          </label>
          <input
            type="text"
            className="input-section ps-2"
            id="other"
            placeholder="Enter valid id"
            // onChange={fileSelectedHandler}
            name="otherValidIdsNumber"
            value={getValue(
              isViewMode,
              getProfile?.otherValidIdsNumber,
              values?.otherValidIdsNumber
            )}
            disabled={isDisabledValue(
              isViewMode,
              getProfile?.otherValidIdsNumber
            )}
            onBlur={handleBlur}
            onChange={handleChange}
            // value={documents.otherValidIdsNumber}
            // required
          />
          <div className="font-14">
            {touched.otherValidIdsNumber && errors.otherValidIdsNumber && (
              <span className="error-msg">{errors.otherValidIdsNumber}</span>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <span className="label-text">Pancard</span>
          <div
            className="download_doc d-flex align-items-center"
            onClick={(e) => {
              viewDocsAndUpload(getProfile?.panCard, "pan-doc", isViewMode);
              // getProfile?.panCard
              //   ? fetchImage(
              //       `/empDocs?name=${getProfile?.panCard}`,
              //       setIsLoading
              //     )
              //   : document.getElementById("pan-doc").click();
            }}
          >
            <label className="pointer-cur text-truncate">
              <FileUploadOutlinedIcon
                style={{ color: "#2E3192" }}
                className="ms-4"
              />

              <span className={`ms-2 ${values?.panImg === "" && "label-text"}`}>
                {showDocsName(getProfile?.panCard, values?.panImg, isViewMode)}
              </span>
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .pdf"
              id="pan-doc"
              // onChange={fileSelectedHandler}
              className="d-none"
              // style={{ display: "none" }}
              name="panImg"
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("panImg", event.currentTarget.files[0]);
              }}
              // required
            />
          </div>
          <div className="font-14">
            {touched.panImg && errors.panImg && (
              <span className="error-msg">{errors.panImg}</span>
            )}
          </div>
        </div>

        <div className="col-4">
          <span className="label-text">Aadhar Card</span>
          <div
            className="download_doc d-flex align-items-center"
            // onClick={(e) => {
            //   getProfile?.panCard
            //     ? window.open(
            //         `https://aistimer2.aistechnolabs.in/${getProfile?.aadharCard}`
            //       )
            //     : document.getElementById("aadhar-doc").click();
            // }}

            onClick={(e) => {
              viewDocsAndUpload(
                getProfile?.aadharCard,
                "aadhar-doc",
                isViewMode
              );
            }}
          >
            <label className="pointer-cur text-truncate">
              <FileUploadOutlinedIcon
                style={{ color: "#2E3192" }}
                className="ms-4"
              />
              <span
                className={`ms-2 ${values?.adharImg === "" && "label-text"}`}
              >
                {showDocsName(
                  getProfile?.aadharCard,
                  values?.adharImg,
                  isViewMode
                )}

                {/* {getProfile?.aadharCard
                  ? getProfile?.aadharCard
                  : values?.adharImg
                  ? values?.adharImg?.name
                  : upDocs} */}
              </span>
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .pdf"
              id="aadhar-doc"
              className="d-none"
              // onChange={fileSelectedHandler}

              name="adharImg"
              // value={values.adharImg}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("adharImg", event.currentTarget.files[0]);
              }}
              // required
            />
          </div>
          <div className="font-14">
            {touched.adharImg && errors.adharImg && (
              <span className="error-msg">{errors.adharImg}</span>
            )}
          </div>
        </div>

        <div className="col-4">
          <span className="label-text">Other Valid IDs</span>
          <div
            className="download_doc d-flex align-items-center"
            // onClick={(e) => {
            //   getProfile?.panCard
            //     ? window.open(
            //         `https://aistimer2.aistechnolabs.in/${getProfile?.otherValidIds}`
            //       )
            //     : document.getElementById("other-doc").click();
            // }}

            onClick={(e) => {
              viewDocsAndUpload(
                getProfile?.otherValidIds,
                "other-doc",
                isViewMode
              );

              // getProfile?.otherValidIds
              //   ? fetchImage(
              //       `/empDocs?name=${getProfile?.otherValidIds}`,
              //       setIsLoading
              //     )
              //   : document.getElementById("other-doc").click();
            }}
          >
            <label className="pointer-cur text-truncate">
              <FileUploadOutlinedIcon
                style={{ color: "#2E3192" }}
                className="ms-4"
              />
              <span
                className={`ms-2 ${values?.otherImg === "" && "label-text"}`}
              >
                {showDocsName(
                  getProfile?.otherValidIds,
                  values?.otherImg,
                  isViewMode
                )}

                {/* {getProfile?.otherValidIds
                  ? getProfile?.otherValidIds
                  : values?.otherImg
                  ? values?.otherImg?.name
                  : upDocs} */}
              </span>
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .pdf"
              id="other-doc"
              className="d-none"
              // onChange={fileSelectedHandler}
              name="otherImg"
              // value={values.otherImg}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("otherImg", event.currentTarget.files[0]);
              }}
              // required
            />
          </div>
          <div className="font-14">
            {touched.otherImg && errors.otherImg && (
              <span className="error-msg">{errors.otherImg}</span>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="nominee" className="d-block label-text">
            Nominee Name
          </label>
          <input
            type="text"
            className="input-section ps-2"
            id="nominee"
            placeholder="Enter nominee name"
            // onChange={fileSelectedHandler}
            name="nomineeName"
            // value={
            //   getProfile?.nomineeName
            //     ? getProfile?.nomineeName
            //     : values?.nomineeName
            // }
            // disabled={getProfile?.nomineeName}

            value={getValue(
              isViewMode,
              getProfile?.nomineeName,
              values?.nomineeName
            )}
            disabled={isDisabledValue(isViewMode, getProfile?.nomineeName)}
            onBlur={handleBlur}
            onChange={handleChange}

            // required
          />

          <div className="font-14">
            {touched.nomineeName && errors.nomineeName && (
              <span className="error-msg">{errors.nomineeName}</span>
            )}
          </div>
        </div>
        <div className="col-4">
          <label htmlFor="contact1" className="d-block label-text">
            Emergency Contact Number (1)
          </label>
          <input
            type="number"
            className="input-section ps-2"
            id="contact"
            placeholder="Enter emergency contact number"
            // onChange={fileSelectedHandler}
            name="emergencyContactNumber1"
            // value={
            //   getProfile?.emergencyContactNumber1
            //     ? getProfile?.emergencyContactNumber1
            //     : values?.emergencyContactNumber1
            // }
            // disabled={getProfile?.emergencyContactNumber1}

            value={getValue(
              isViewMode,
              getProfile?.emergencyContactNumber1,
              values?.emergencyContactNumber1
            )}
            disabled={isDisabledValue(
              isViewMode,
              getProfile?.emergencyContactNumber1
            )}
            onBlur={handleBlur}
            onChange={handleChange}
            min={0}
            // required
          />

          <div className="font-14">
            {touched.emergencyContactNumber1 &&
              errors.emergencyContactNumber1 && (
                <span className="error-msg">
                  {errors.emergencyContactNumber1}
                </span>
              )}
          </div>
        </div>
        <div className="col-4">
          <label htmlFor="contact2" className="d-block label-text">
            Emergency Contact Number (2)
          </label>
          <input
            type="number"
            className="input-section ps-2"
            id="contact2"
            placeholder="Enter emergency contact number"
            // onChange={fileSelectedHandler}
            name="emergencyContactNumber2"
            // value={
            //   getProfile?.emergencyContactNumber2
            //     ? getProfile?.emergencyContactNumber2
            //     : values?.emergencyContactNumber2
            // }
            // disabled={getProfile?.emergencyContactNumber2}

            value={getValue(
              isViewMode,
              getProfile?.emergencyContactNumber2,
              values?.emergencyContactNumber2
            )}
            disabled={isDisabledValue(
              isViewMode,
              getProfile?.emergencyContactNumber2
            )}
            onBlur={handleBlur}
            onChange={handleChange}
            min={0}
            // required
          />
          <div className="font-14">
            {touched.emergencyContactNumber2 &&
              errors.emergencyContactNumber2 && (
                <span className="error-msg">
                  {errors.emergencyContactNumber2}
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDocument;
