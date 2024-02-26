import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
// import ForgotPassword from "../forgotPassword";
import Login from "../login";
import Home from "../home";

import ManualWork from "../manualWork";
import PendingWork from "../pendingWork";
import Profile from "../profile";
// import Leave from "../leave";
import ResourceManagement from "../resourceManagement";
import ChangePassword from "../changePassword";
import Frontend from "../frontend";
import {
  deleteCookies,
  getCookiesToken,
  setCookiesToken,
} from "../../helpers/cookies";
import { API_URL, getNotificationUrl } from "../../constant/apiUrls";
import { EX_ONEDAY } from "../../constant";
import HrPanel from "../hrPanel";
import STORAGE_KEY from "../../constant/storageKey";
import { postRequest } from "../../services";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../helpers/localStorage";
import Team from "../team";
import User from "../user";
import { setDataInSessionStorage } from "../../helpers/sessionStorage";
import UserDetails from "../userDetails";
import InvalidNavigate from "../invalidNavigate";
import ViewKnowledgeDialog from "../../components/knowledegeDialog";
import { endDateMonth, startDateMonth } from "../../formatter/date";
import KnowledgeDashboardAndTable from "../knowledgeDashboardAndTable";


function RoutesComponent() {
  const [rememberMe, setRememberMe] = useState(false);

  let [number, setNumber] = useState(0);

  const [startEndDate, setStartEndDate] = useState([
    startDateMonth(number),
    endDateMonth(number),
  ]);

  const [token, setToken] = useState(getCookiesToken());

  const [opensnackbar, setSnackbarOpen] = useState({});

  const [showLeavesWfhStatus, setShowLeavesWfhStatus] = useState(false);

  const [showRightNav, setShowRightNav] = useState("dashboard");
  const [isEmpDetail, setIsEmpDetail] = useState("profile");

  // const [token, setToken] = useState(true);  ////temperary cheking

  const [isLoading, setIsLoading] = useState(false);

  const getLoginData = (crediantial) => {
    setIsLoading(true);

    postRequest(API_URL.LOGIN, crediantial)
      .then((res) => {
        setDataInLocalStorage(STORAGE_KEY.USER_DATA, res.data.userInfo);
        setDataInSessionStorage(STORAGE_KEY.CREDENTIAL, crediantial);

        if (!token) {
          setCookiesToken(res.data.token, EX_ONEDAY);

          setToken(res.data.token);
        }
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.response?.data,
          severity: "error",
        });
      })

      .finally(() => {
        setIsLoading(false);
        // setRememberMe(false);
      });
  };

  const handleClose = () => {
    setSnackbarOpen({ setopen: false });
  };

 


  const showGroupWiseKnowledge = (param) => (e) => {
    // setKnowledgeDash(param);
  };



  const empRole = getDataFromLocalStorage(STORAGE_KEY.USER_DATA)?.role;

  if (!token) {
    return (
      <Login
        getLoginData={getLoginData}
        isLoading={isLoading}
        opensnackbar={opensnackbar}
        handleClose={handleClose}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      />
    );
  }

  return (
    <div className="letter-space font-Poppins">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Frontend
                setToken={setToken}
                setShowRightNav={setShowRightNav}
                setShowLeavesWfhStatus={setShowLeavesWfhStatus}
                setIsEmpDetail={setIsEmpDetail}
                number={number}
                setNumber={setNumber}
                startEndDate={startEndDate}
                setStartEndDate={setStartEndDate}
              />
            }
          >
            <Route
              index
              element={
                <Home
                  opensnackbar={opensnackbar}
                  handleClose={handleClose}
                  setToken={setToken}
                />
              }
            />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            <Route
              path="/profiles"
              element={
                <Profile
                  opensnackbar={opensnackbar}
                  setSnackbarOpen={setSnackbarOpen}
                  setToken={setToken}
                  isEmpDetail={isEmpDetail}
                  setIsEmpDetail={setIsEmpDetail}
                />
              }
            />
            {empRole === "super_admin" && (
              <Route
                path="/hr-panel"
                element={
                  <HrPanel
                    setToken={setToken}
                    showRightNav={showRightNav}
                    setShowRightNav={setShowRightNav}
                    showLeavesWfhStatus={showLeavesWfhStatus}
                    setShowLeavesWfhStatus={setShowLeavesWfhStatus}
                  />
                }
              />
            )}

            <Route
              path="/manual-work"
              element={<ManualWork setToken={setToken} />}
            />

            <Route
              path="/knowledge-dashboard"
              element={<KnowledgeDashboardAndTable setToken={setToken} showGroupWiseKnowledge={showGroupWiseKnowledge} />}
            />

            {(empRole === "pm" ||
              empRole === "seo_tl" ||
              empRole === "super_admin") && (
              <>
                
                <Route
                  path="/pending-work"
                  element={<PendingWork setToken={setToken} />}
                />
                <Route path="/user" element={<User setToken={setToken} />} />
                <Route
                  path="/user-details"
                  element={<UserDetails setToken={setToken} />}
                />
                <Route
                  path="/team"
                  element={
                    <Team setToken={setToken} startEndDate={startEndDate} />
                  }
                />
              </>
            )}
            {/* <Route
              path="/resource-management"
              element={<ResourceManagement />}
            /> */}
          </Route>

          <Route
            path="/change-password"
            element={
              <ChangePassword
                setToken={setToken}
                setSnackbarOpen={setSnackbarOpen}
                opensnackbar={opensnackbar}
                handleClose={handleClose}
              />
            }
          />
          {empRole !== "super_admin" && (
            <Route path="/hr-panel" element={<InvalidNavigate />} />
          )}

          {(empRole === "normal_user" || empRole === "hr") && (
            <>
              <Route path="/user-details" element={<InvalidNavigate />} />
              <Route path="/user" element={<InvalidNavigate />} />
              <Route path="/pending-work" element={<InvalidNavigate />} />
              <Route path="/team" element={<InvalidNavigate />} />
            </>
          )}

          <Route path="/view-knowledge" element={<ViewKnowledgeDialog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesComponent;
