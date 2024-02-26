import React, { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const EmpDocumentation = () => {
  const [uploadPan, setUploadPan] = useState("Upload Document");

  const [uploadAadhar, setUploadAadhar] = useState("Upload Document");

  const [uploadOther, setUploadOther] = useState("Upload Document");

  const fileSelectedHandler = (event) => {
    if (event.target.id === "pan-doc") {
      setUploadPan(event.target.files[0].name);
    } else if (event.target.id === "aadhar-doc") {
      setUploadAadhar(event.target.files[0].name);
    } else {
      setUploadOther(event.target.files[0].name);
    }
  };

  return (
    <>
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
            />
          </div>
          <div className="col-4">
            <label htmlFor="aadhar" className="d-block label-text">
              Aadhar Card Number
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="aadhar"
              placeholder="Enter aadhar number"
            />
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
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-4">
            <span className="label-text">Pancard</span>
            <div
              className="download_doc d-flex align-items-center"
              onClick={(e) => {
                document.getElementById("pan-doc").click();
              }}
            >
              <label htmlFor="pan-doc" className="pointer-cur">
                <FileUploadOutlinedIcon
                  style={{ color: "#2E3192" }}
                  className="ms-4"
                />
                <span
                  className={`${
                    uploadPan === "Upload Document" && "label-text"
                  } ms-2`}
                >
                  {uploadPan}
                </span>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="pan-doc"
                onChange={fileSelectedHandler}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="col-4">
            <span className="label-text">Aadhar Card</span>
            <div
              className="download_doc d-flex align-items-center"
              onClick={(e) => {
                document.getElementById("aadhar-doc").click();
              }}
            >
              <label htmlFor="aadhar-doc" className="pointer-cur">
                <FileUploadOutlinedIcon
                  style={{ color: "#2E3192" }}
                  className="ms-4"
                />
                <span
                  className={`${
                    uploadAadhar === "Upload Document" && "label-text"
                  } ms-2`}
                >
                  {uploadAadhar}
                </span>
              </label>
              <input
                type="file"
                id="aadhar-doc"
                style={{ display: "none" }}
                onChange={fileSelectedHandler}
              />
            </div>
          </div>

          <div className="col-4">
            <span className="label-text">Other Valid IDs</span>
            <div className="download_doc d-flex align-items-center">
              <label
                htmlFor="other-doc"
                className="pointer-cur"
                onClick={(e) => {
                  document.getElementById("other-doc").click();
                }}
              >
                <FileUploadOutlinedIcon
                  style={{ color: "#2E3192" }}
                  className="ms-4"
                />
                <span
                  className={`${
                    uploadOther === "Upload Document" && "label-text"
                  } ms-2`}
                >
                  {uploadOther}
                </span>
              </label>
              <input
                type="file"
                id="other-doc"
                style={{ display: "none" }}
                onChange={fileSelectedHandler}
              />
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
            />
          </div>
          <div className="col-4">
            <label htmlFor="contect1" className="d-block label-text">
              Emergency Contact Number (1)
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="contect"
              placeholder="Enter emergency contact number"
            />
          </div>
          <div className="col-4">
            <label htmlFor="contect2" className="d-block label-text">
              Emergency Contact Number (2)
            </label>
            <input
              type="text"
              className="input-section ps-2"
              id="contect2"
              placeholder="Enter emergency contact number"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4 px-3">
        <span className="cancel-button px-5 py-1 ">Cancel</span>
        <span className="apply-pro-save-btn px-5 py-1 text-white ms-4">
          Save
        </span>
      </div>
    </>
  );
};

export default EmpDocumentation;
