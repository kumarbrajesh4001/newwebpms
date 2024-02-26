import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalPopover from "../../components/popover/Popover";

function ResourceManagement() {
  const resourceHeading = ["Resource", "1", "2", "3"];
  const pm = ["All", "Max", "Harish", "Steve"];
  const project = ["All", "timer"];
  const tech = ["All", "BA", "Laravel", "Design", "QA"];
  const resource = ["All", "Android Denson", "jatden"];

  const resourceData = [
    {
      name: "Android Denson",
      d1: "",
      d2: "",
      d3: "",
    },
    { name: "Android Jayden", d1: "", d2: "", d3: "" },
    { name: "Android Tobias", d1: "", d2: "", d3: "" },
    { name: "Android Devin", d1: "", d2: "", d3: "" },
    { name: "Android Princy", d1: "", d2: "", d3: "" },
    { name: "Android Shankar", d1: "", d2: "+", d3: "+" },
  ];

  const userDetailsList = ["Pending", "A0314", "A1MAX", "A1MQA Testing"];

  const [selectIssue, setSelectIssue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const selectFileCont = (issue) =>
    (issue === "By PM" && pm) ||
    (issue === "By Project" && project) ||
    (issue === "By Tech" && tech) ||
    (issue === "By Resource" && resource) ||
    [];

 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectIssue(event.currentTarget.innerText);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="background-DCDFE4 py-3 response">
      <div className="background-f3f7fb min-height-69 px-3 pb-5">
        <div className="row pt-3">
          <div className="col-4">
            <div className=" d-flex">
              <img
                src={
                  "https://webpms.aistechnolabs.pro/backend/newImage/Vector.png"
                }
                alt="resource"
                width={31}
                height={41}
                className="mt-1"
              />
              <div className="ms-3">
                <div className="hr-secNo"> Resource Management</div>
                <span className="color-2E3192 leave-apply p-0">
                  Resource Plan
                </span>
              </div>
            </div>
          </div>
          <div className="col-8 text-end pe-4">
            <div className="cus_radio_btn background-82F0A1 d-inline-block"></div>
            <span className="ms-2 me-4">Max</span>
            <div className="cus_radio_btn background-FFB677 d-inline-block ms-1"></div>
            <span className="ms-2 me-4">Haris</span>
            <div className="cus_radio_btn background-FFA6C3 d-inline-block ms-1"></div>
            <span className="ms-2">Shweta</span>
            <div className="cus_radio_btn background-FF8F8F d-inline-block ms-4"></div>
            <span className="ms-2 me-4">Kevin</span>
            <div className="cus_radio_btn background-8BC3F9 d-inline-block"></div>
            <span className="ms-2 me-4">Steve</span>
            <div className="cus_radio_btn background-92E6EA d-inline-block"></div>
            <span className="ms-2">Nik</span>
            <div className="cus_radio_btn background-ECF58B d-inline-block ms-4"></div>
            <span className="ms-2 me-4">Zerlyn</span>
            <div className="cus_radio_btn background-9F84GD d-inline-block"></div>
            <span className="ms-2 me-4">Melvin</span>
            <div className="cus_radio_btn background-BDC3C7 d-inline-block"></div>
            <span className="ms-2">Dan</span>
          </div>
        </div>
        <div className="d-flex float-end mb-4">
          <div className="filter-sec text-center pt-2" onClick={handleClick}>
            <span>
              <FilterAltIcon />
              By PM
              <ExpandMoreIcon className="float-end me-1" />
            </span>
          </div>

          <div
            className="filter-sec mx-4 text-center pt-2"
            onClick={handleClick}
          >
            <FilterAltIcon />
            By Project
            <ExpandMoreIcon className="float-end me-1" />
          </div>
          <div className="filter-sec text-center pt-2" onClick={handleClick}>
            <FilterAltIcon />
            By Tech
            <ExpandMoreIcon className="float-end me-1" />
          </div>
          <div
            className="filter-sec mx-4 text-center pt-2"
            onClick={handleClick}
          >
            <FilterAltIcon />
            By Resource
            <ExpandMoreIcon className="float-end me-1" />
          </div>
          <div>
            Free Resource: <Switch />
          </div>
          <ModalPopover
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
            selectFile={selectFileCont(selectIssue)}
          />
        </div>

        <table className="width-100">
          <tr className="background-EEF3F8">
            {resourceHeading.map((resHeading) => (
              <th className="text-center py-2 width-150">{resHeading}</th>
            ))}
          </tr>
          {resourceData.map((resorce, ind) => (
            <tr key={ind}>
              <td className="p-2 width-150">{resorce.name}</td>
              <td className="text-center singh">{!resorce.d1 && "+"}</td>
              <td className="text-center singh">{!resorce.d1 && "+"}</td>
              <td className="text-center singh">{!resorce.d1 && "+"}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default ResourceManagement;
