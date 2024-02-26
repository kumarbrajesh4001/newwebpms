import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import HouseIcon from "@mui/icons-material/House";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import leave from "../../../assets/leave.png";
import birthday from "../../../assets/birthday.png";
import recentNews from "../../../assets/recent-news.png";
import todo from "../../../assets/to-do.png";
import holiday from "../../../assets/holiday.png";
import workFrom from "../../../assets/work-from.png";

const Timesheets = (props) => {
  const { showLeftNav } = props;

  return (
    <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2`}>
      <div className="row mx-3 mt-5">
        <div
          className={`col-md-4 col-6 d-flex justify-content-around align-items-center section-background-shadow-radius hr-section-height ${
            showLeftNav ? "hr-section-width-360" : "hr-section-width-406"
          }`}
        >
          <div>
            <img src={leave} alt="leave" />
          </div>
          <div>
            <div className="hr-secHeading ">Timesheets</div>
            <div>
              <span className="hr-secNo color-000000">
                Approve:
              </span>
              <span className="hr-secNo color-686868 ms-1">12</span>
            </div>
            <div>
              <span className="hr-secNo color-000000">
                Reject:
              </span>
              <span className="hr-secNo color-686868 ms-1">2</span>
            </div>
          </div>
        </div>
        <div
          className={`col-md-4 col-6 d-flex justify-content-around  align-items-center section-background-shadow-radius hr-section-height ${
            showLeftNav ? "hr-section-width-360" : "hr-section-width-406"
          } mx-3`}
        >
          <div>
            <img src={birthday} alt="birthday" />
          </div>

          <div>
            <div>
              <span className="hr-secHeading">Birthday</span>
              <span className="hr-secNo color-686868 ms-1">01/03/2023</span>
            </div>
            <div>
              <span className="hr-secTxt">Oliver</span>
              <span className="hr-secTxt ms-4">Steve</span>
            </div>
            <div>
              <span className="hr-secTxt">Scotty</span>
              <span className="hr-secTxt ms-4">Dency</span>
            </div>
            <div>
              <span className="hr-secTxt">Kelvin</span>
              <span className="hr-secTxt ms-4">Remo</span>
            </div>
          </div>
        </div>

        <div
          className={`col-md-4 col-6 d-flex justify-content-around align-items-center section-background-shadow-radius hr-section-height ${
            showLeftNav ? "hr-section-width-360" : "hr-section-width-406"
          } me-3`}
        >
          <div>
            <img src={recentNews} alt="recentnews" />
          </div>

          <div>
            <div className="hr-secHeading">Recent News</div>
            <div>
              <span className="hr-secTxt">Lorem</span>
              <span className="hr-secTxt ms-1">Ipsume</span>
            </div>
            <div>
              <span className="hr-secTxt">Lorem</span>
              <span className="hr-secTxt ms-1">Ipsume</span>
            </div>
          </div>
        </div>
        <div
          className={`col-md-4 col-6 d-flex justify-content-around align-items-center section-background-shadow-radius hr-section-height ${
            showLeftNav ? "hr-section-width-360" : "hr-section-width-406"
          } mt-3 me-3`}
        >
          <div>
            <img src={todo} alt="todo" />
          </div>
          <div>
            <div className="hr-secHeading">To Do</div>
            <div>
              <span className="hr-secTxt">Lorem</span>
              <span className="hr-secTxt ms-1">Ipsume</span>
            </div>
            <div>
              <span className="hr-secTxt">Lorem</span>
              <span className="hr-secTxt ms-1">Ipsume</span>
            </div>
          </div>
        </div>
        <div
          className={`col-md-4 col-6 d-flex justify-content-around align-items-center section-background-shadow-radius hr-section-height ${
            showLeftNav ? "hr-section-width-360" : "hr-section-width-406"
          } mt-3`}
        >
          <div>
            <img src={holiday} alt="holiday" />
          </div>
          <div>
            <div className="hr-secHeading">Holidays</div>
            <div>
              <span className="hr-secNo color-000000">
                Date:
              </span>
              <span className="hr-secNo color-686868 ms-1">08/03/23</span>
            </div>
          </div>
        </div>
        <div
          className={`col-md-4 col-6 d-flex justify-content-around align-items-center section-background-shadow-radius hr-section-height ${
            showLeftNav ? "hr-section-width-360" : "hr-section-width-406"
          } mt-3 ms-3`}
        >
          <div>
            <img src={workFrom} alt="leave" />
          </div>
          <div>
            <div className="hr-secHeading">Work From</div>
            <div>
              <span className="hr-secNo color-000000">
                Home:
              </span>
              <span className="hr-secNo color-686868 ms-1">12</span>
            </div>
            <div>
              <span className="hr-secNo color-000000">
                Office:
              </span>
              <span className="hr-secNo color-686868 ms-1">50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheets;
