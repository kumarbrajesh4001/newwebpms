import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import aisLogoHeader from "../../assets/ais-logo-header.png";
import { deleteCookies } from "../../helpers/cookies";
import STORAGE_KEY from "../../constant/storageKey";
import upload from "../../assets/upload.png";
import {
  clearDataFromLocalStorage,
  getDataFromLocalStorage,
} from "../../helpers/localStorage";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  clearSessionStorage,
  getDataFromSessionStorage,
  setDataInSessionStorage,
} from "../../helpers/sessionStorage";

import getSearchUsers from "../../helpers/sorting";
import Loader from "../loader";
import { getRequest, postRequest } from "../../services";
import {
  API_URL,
  getDeleteNotificationUrl,
  getNotificationUrl,
} from "../../constant/apiUrls";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserKey,
  setRoutePage,
  setNotiFunc,
} from "../../redux/reducer/sessionReducer";
import { actPages, qwe, redirectPage, storePages } from "./header.helper";
import signoutPage from "../../helpers/signout";
import DateCalender from "../dataCalender";
import { CSVLink } from "react-csv";
import { endDateMonth, startDateMonth } from "../../formatter/date";

const Header = (props) => {
  const {
    setToken,
    profileShow,
    setProfileShow,
    setShowRightNav,
    setShowLeavesWfhStatus,
    setIsEmpDetail,
    number,setNumber,startEndDate,setStartEndDate
  } = props;

  const dispatch = useDispatch();

  const { teamsCSVData,teamSearchFunc } = useSelector((cv) => cv.userInfoReducer);

  const { pathname: showUsers } = useLocation();

  const [findUsers, setFindUsers] = useState({});
  const selectRoutePage = getDataFromSessionStorage(STORAGE_KEY.ROUTE_PAGE);

  const [notification, setNotification] = useState({});

  

  const [notiCount, setNotiCount] = useState(0);

  const [selectProfile, setSelectProfile] = useState(selectRoutePage);

  const userData = getDataFromLocalStorage(STORAGE_KEY.USER_DATA);

  const [isLoading, setIsLoading] = useState(false);

  const [searchUser, setSearchUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const [userNoti, setUserNoti] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  

  const getFindUserList = (searchText) => {
    setIsLoading(true);
    postRequest(API_URL.FIND_USERS, { username: searchText })
      .then((res) => {
        setFindUsers(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleChange = (e) => {
    const searchText = e.target.value;

    setSearchUser(e.currentTarget);

    if (searchText) {
      getFindUserList(searchText);
    }

    setSearchTerm(searchText);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotiCount(notification?.allCount);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // deleteNotification();
  };

  const open = Boolean(anchorEl);

  const getEmpList = getSearchUsers(
    findUsers?.data?.length,
    findUsers?.data,
    []
  );

  const userNotification = () => {
    setUserNoti(true);

    getRequest(getNotificationUrl(userData?.role))
      .then((res) => {
        setNotification(res.data);
      })
      .catch(console.log)
      .finally(() => {
        setUserNoti(false);
      });
  };

  const deleteNotification = (id) => {
    setUserNoti(true);
    postRequest(getDeleteNotificationUrl(userData?.role), { id })
      .then(() => {
        userNotification();
      })
      .catch(console.log)
      .finally(() => {
        // setUserNoti(false);
      });
  };

  const isTrue = (word, redirectText) =>
    redirectText.includes(word.split(" ").splice(-3).join(" "));

  const redirectCom =
    ({ msg, nId }) =>
    (e) => {
      if (isTrue(msg, ["WFH is Approved", "WFH is Rejected"])) {
        navigate("/profiles");
        setIsEmpDetail("WFH");
      } else if (isTrue(msg, ["Leave is Approved", "Leave is Rejected"])) {
        navigate("/profiles");
        setIsEmpDetail("leave");
      } else if (isTrue(msg, ["applied for leave"])) {
        navigate("/hr-panel");
        setShowRightNav("leaves");
        setShowLeavesWfhStatus("leaveList");
      } else {
        navigate("/hr-panel");
        setShowRightNav("wfh");
        setShowLeavesWfhStatus("wfhList");
      }

      deleteNotification(nId);
      setNotiCount(0);
      setAnchorEl(null);
    };

  useEffect(() => {
    userNotification();
    dispatch(setNotiFunc(userNotification));
  }, []);

  return (
    <>
      <div
        className={`d-flex justify-content-between background-FFFFFF ${
          showUsers === "/team" && "sticky-top"
        } m-2`}
      >
        <div className="mb-md-0 mb-2">
          <img
            src={aisLogoHeader}
            alt="ais-logo-header"
            className="pointer-cur"
            onClick={() => {
              navigate("/");
              setSelectProfile();
              setProfileShow(false);
              setDataInSessionStorage(STORAGE_KEY.ROUTE_PAGE, 20);
            }}
          />
        </div>
        {showUsers === "/team" && (
          <div className="d-flex justify-content-between mt-2 ms-4">
            <DateCalender
              number={number}
              setNumber={setNumber}
              startEndDate={startEndDate}
              setStartEndDate={setStartEndDate}
              hidden="tms"
            />

            <div className="form-field search-bar-width mx-5">
              <input
                type="text"
                placeholder="Search"
                id="search"
                className="input-field ps-2"
                onChange={teamSearchFunc}
              />
              <span className="search-bar">
                <SearchIcon className="color-2E3192" />
              </span>
            </div>

            <CSVLink data={teamsCSVData} filename={"TableContent.csv"}>
              <span className="me-1 select-profile">Download</span>
              <img
                src={upload}
                alt="upload"
                width="35px"
                height="35px"
                className="pointer-cur"
              />
            </CSVLink>
          </div>
        )}

        <div
          className={`${
            showUsers !== "/user" && showUsers !== "/team" && "background-F7F7F7 px-5"
          }  hr-secHeading text-center `}
        >
          {showUsers === "/user" ? (
            <>
              <div className="form-field search-bar-width mt-2">
                <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  className="input-field ps-2"
                  onChange={handleChange}
                  value={searchTerm}
                />
                <span className="search-bar">
                  <SearchIcon className="color-2E3192" />
                </span>
              </div>

              {searchTerm && (
                <Popper open={!!findUsers?.data} anchorEl={searchUser}>
                  <div className="search-user">
                    {!getEmpList.length ? (
                      <div className="py-1  text-center  my-2">
                        No result found
                      </div>
                    ) : (
                      getEmpList?.map((seacrUser, ind) => (
                        <div
                          className="py-1 px-3 searchUsers my-2"
                          key={ind}
                          onClick={() => {
                            dispatch(setUserKey(seacrUser?.name));

                            setFindUsers({});
                          }}
                        >
                          <span>{seacrUser.displayName}</span> -
                          <span className="ms-1">
                            {seacrUser?.emailAddress}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </Popper>
              )}
            </>
          ) : (
            showUsers !== "/team" && (
              <div>
                <div className="text-center mt-1">{userData?.display_name}</div>
                <div className="text-center mt-2">{userData?.user_name}</div>
              </div>
            )
          )}
        </div>

        <div className="d-flex justify-content-end position-relative width-21">
          <div>
            <Tooltip
              title={<span className="fontWeight-600">Notifications</span>}
            >
              <IconButton
                className="me-3 mt-2"
                sx={{ backgroundColor: "#f6f6f6" }}
                onClick={handleClick}
                disabled={userNoti}
              >
                <Badge
                  badgeContent={(notification?.allCount || 0) - notiCount}
                  color="error"
                >
                  <NotificationsNoneIcon
                    fontSize="medium"
                    className="color-2E3192"
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
          {!!notification.allCount && (
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {notification?.[
                userData?.role === "super_admin"
                  ? "allNotifications"
                  : "approveRejectNotification"
              ]?.map((cv, ind) => (
                <div
                  className=" mx-1 my-1 px-2 py-1 noti"
                  key={ind}
                  onClick={redirectCom(cv)}
                >
                  {cv.msg}
                </div>
              ))}
            </Popover>
          )}

          <div
            className="heading-3-bold color-000000 border-0 background-FFFFFF d-flex pointer-cur"
            onClick={() => {
              setProfileShow(!profileShow);
            }}
          >
            <div>
              {userData?.img && (
                <img
                  src={userData.img}
                  alt="ais-logo-header"
                  width={46}
                  height={46}
                  style={{ display: 'block' }}
                />
              )}
            </div>
            <div className="ms-2 mt-1">
              <div className="text-center">{userData?.display_name}</div>
              <div className="text-center">{userData?.user_name}</div>
            </div>
            <div>
              {profileShow ? (
                <ExpandLessIcon className="color-2E3192" fontSize="large" />
              ) : (
                <ExpandMoreIcon className="color-2E3192" fontSize="large" />
              )}
            </div>
          </div>

          {/* permission:["createKnowledgeBase"]  */}


          <div className={`c-model-class profile-popUp shadow`}>
            {profileShow && (
              <>
                <div className="row emp-bckgrd m-0 py-3">
                  <div className="col-2">
                    <img
                      src={userData?.img}
                      alt="ais-logo-header"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="col-9 ms-2">
                    <div className="color-2E3192">{userData?.display_name}</div>
                    <div>{userData?.user_name}</div>
                  </div>
                </div>

                {actPages(userData?.role,userData?.permission).map((setting, ind) => (
                  <div
                    className={`mx-3 my-2 pointer-cur border-bottom-DDE8F1 pb-1 ${
                      ind === selectProfile
                        ? "select-profile"
                        : "unselect-profile"
                    }`}
                    key={ind}
                    onClick={() => {
                      const rdp = redirectPage(userData?.role,ind,userData?.permission );
                      setProfileShow(false);
                      setSelectProfile(ind);

                      if (rdp === "/resource-management") {
                        openInNewTab("/resourceManagementDev");
                      } else if (rdp === "/seo") {
                        openInNewTab("/resourceManagementSeo");
                      } else {
                        navigate(rdp);
                      }

                      if (!storePages(userData?.role,userData?.permission).includes(ind)) {
                        dispatch(setRoutePage(rdp));

                        setDataInSessionStorage(STORAGE_KEY.ROUTE_PAGE, ind);
                      }

                      if (setting === "Sign Out") {
                        signoutPage(setToken, dispatch);
                      }
                    }}
                  >
                    {setting}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Loader open={isLoading} size={70} />
    </>
  );
};

Header.propTypes = {
  setToken: PropTypes.func,
  isJiraTimesheetLoading: PropTypes.bool,
};
Header.defaultProps = {
  setToken: noop,
  isJiraTimesheetLoading: false,
};

export default Header;
