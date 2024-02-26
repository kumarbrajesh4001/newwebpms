import React, { useState, useRef, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import JoditEditor from "jodit-react";
// import ShowTo from "./ShowTo";

import SelectShow from "../selectShow";

const sltOption = [
  { value: "All", label: "All" },
  { value: "AIS HR", label: "AIS HR" },

  { value: "Ais Sales Inbound", label: "Ais Sales Inbound" },
  { value: "Ais Sales Outreach", label: "Ais Sales Outreach" },
  { value: "Ais Sales Portal", label: "Ais Sales Portal" },

  { value: "AIS Sales", label: "AIS Sales" },
  { value: "Alliance Delivery", label: "Alliance Delivery" },
  { value: "Alliance Franchise", label: "Alliance Franchise" },
  { value: "Alliance HR", label: "Alliance HR" },
  { value: "Alliance Operations", label: "Alliance Operations" },
  { value: "Alliance Sales", label: "Alliance Sales" },
  { value: "BA", label: "BA" },
  { value: "Design", label: "Design" },
  { value: "HTML", label: "HTML" },
  { value: "Laravel", label: "Laravel" },
  { value: "Mobile", label: "Mobile" },
  { value: "Node", label: "Node" },
  { value: "PM", label: "PM" },
  { value: "QA", label: "QA" },
  { value: "React JS", label: "React JS" },
  { value: "React Native", label: "React Native" },
  { value: "Seo", label: "Seo" },
  { value: "Unity", label: "Unity" },
  { value: "Wordpress", label: "Wordpress" },
];

const TextEditor = (props) => {
  const {
    editorOpen,
    handleDialogClose,
    createOrEditKnowledgeBase,
    primaryLabel,
    getTitle,
    setGetTitle,
    getShowTo,
    setGetShowTo,
    getDiscription,
    setGetDiscription,
    getFile,
    setGetFile,
    getAccess,
    setGetAccess,
    sltOption1,
    isCategory,
  } = props;

  const groupsAndUser = [...sltOption, ...(!!sltOption1 ? sltOption1 : [])];

  const editor = useRef(null);

  const inputRef = useRef(null);

  const config = useMemo(() => {
    return {
      readonly: false,
      // placeholder: placeholder,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",
      useNativeTooltip: true,
      addNewLineOnDBLClick: true,
    };
  }, []);

  const handleChangeSelectShow = (getShowTo) => {
    setGetShowTo(getShowTo || []);
  };

  const handleChangeSelectShowUser = (getAccess) => {
    setGetAccess(getAccess || []);
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    // let file = event.target.files[0];
    // let fileType = file.type;
    let fileSize = fileObj.size;

    if (fileSize > 5 * 1000000) {
      // fileSize > 5MB then show popup message
      alert(
        `File size is too large, please upload image of size less than 5MB.\nSelected File Size: ${
          fileSize / 1000000
        }MB only`
      );
      return;
    } else {
      setGetFile(fileObj);
    }
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    inputRef.current.value = null;
    setGetFile(false);
  };

  return (
    <Dialog
      open={editorOpen}
      onClose={handleDialogClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            height: "100%",
            width: "100%",
            maxWidth: "1000px",
            wordBreak: "break-word",
          },
        },
      }}
    >
      <form
        onSubmit={createOrEditKnowledgeBase}
        className="m-3 h-100 d-flex flex-wrap"
      >
        <div className="w-100">
          <div>
            <label htmlFor="name" className="d-block emp-heading color-000000">
              Title<span className="color-RED">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter title..."
              className="input-section ps-2"
              name="title"
              value={getTitle}
              onChange={(e) => {
                setGetTitle(e.target.value);
              }}
              required
            />
          </div>
          {isCategory && (
            <>
              <div className="emp-heading color-000000 mt-3 mb-2">
                View Rights To
              </div>
              <SelectShow
                getShowTo={getShowTo}
                handleChangeSelectShow={handleChangeSelectShow}
                sltOption={groupsAndUser}
                // isRequired
              />
            </>
          )}
          {isCategory ? (
            <>
              <div className="emp-heading color-000000 mt-3 mb-2">
                Edit Rights To
              </div>
              <SelectShow
                getShowTo={getAccess}
                handleChangeSelectShow={handleChangeSelectShowUser}
                sltOption={groupsAndUser}
              />
            </>
          ) : (
            <>
              <div className="emp-heading color-000000 mt-4 mb-2">
                Description
              </div>

              <JoditEditor
                ref={editor}
                value={getDiscription}
                onBlur={(e) => {
                  setGetDiscription(e);
                }}
                config={config}
                required
              />

              <input
                ref={inputRef}
                type="file"
                className="mt-2"
                // accept="image/*,.pdf, .png, .jpeg"
                accept=".png, .jpg, .jpeg, .pdf, .ppt, .Excel, .doc"
                // data-max-size="1024"
                onChange={handleFileChange}
              />

              {getFile && (
                <ClearIcon
                  fontSize="small"
                  className="color-7A7A7A pointer-cur"
                  onClick={resetFileInput}
                />
              )}
            </>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4 w-100 align-self-end">
          <span className="cancel-button px-5 py-1" onClick={handleDialogClose}>
            Cancel
          </span>

          <button
            type="submit"
            className={`apply-pro-save-btn px-5 py-1 text-white ms-3`}
            // onClick={createOrEditKnowledgeBase}
          >
            {primaryLabel}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default TextEditor;
