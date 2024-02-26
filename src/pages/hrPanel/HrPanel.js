import React, { useEffect, useState } from "react";
import { LeftNavbar } from "./components";
import HrDashboard from "./hrDashboard";
import EmployeeLIst from "./employeeList";
import Holidays from "./holidays";
import HrLeaves from "./hrLeaves";
import HrWFH from "./hrWfh";
import KnowledgeBase from "./knowledgeBase";
import EmpProfile from "../../components/empProfile";
import EmpDetails from "../../components/empDetails";
import Loader from "../../components/loader";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";
import { getRequest } from "../../services";
import { getParticularUserUrl } from "../../constant/apiUrls";
import getSearchingData from "../../helpers/searching";
import { useSelector } from "react-redux";
import { validationSchemaHRProfile } from "../../schmas";

import {
  KnowledgeDashb,
  KnowledgeTabled,
} from "../../components/knowledgeDashAndTable";

const HrPanel = (props) => {
  const {
    setToken,
    showRightNav,
    setShowRightNav,
    showLeavesWfhStatus,
    setShowLeavesWfhStatus,
  } = props;

  const { notiFunc } = useSelector((cv) => cv.userInfoReducer);

  const [showLeftNav, setShowLeftNav] = useState(true);
  // const [showLeavesWfhStatus, setShowLeavesWfhStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [opensnackbar, setSnackbarOpen] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [getProfile, setGetProfile] = useState({});

  const [userId, setUserId] = useState({});

  const [isEmpList, setIsEmpList] = useState(true);

  const [knowledgeDash, setKnowledgeDash] = useState(false);

  const [showKnowledge, setShowKnowledge] = useState(false);

  const initialValues = {
    real_name: "",
    gender: "",
    user_key: getProfile?.user_key,
    display_name: getProfile?.display_name,
    department: "",
    // designation: "",
    DOB: "",
    DOJ: "",
    email: getProfile?.email,
    personalEmail: "",
    primaryContactNumber: "",
    secondaryContactNumber: "",
    secondaryContactName: "",
    address: "",
    pemanentaddress: "",
    panNumber: "",
    aadharNumber: "",
    otherValidIdsNumber: "",

    nomineeName: "",
    emergencyContactNumber1: "",
    emergencyContactNumber2: "",

    panImg: "",
    adharImg: "",
    otherImg: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
  };

  const showGroupWiseKnowledge = (param) => (e) => {
    setKnowledgeDash(param);
  };

  const handleClose = () => {
    setSnackbarOpen({ setopen: false });
  };

  const handleEmpList = (key, bool, disN, eml, drtm) => () => {
    setIsEmpList(false);
    setUserId({ key, bool, disN, eml, drtm });
  };

  const nameKey = [
    "user.user_name",
    "user.display_name",
    "user.department",
    "date_commasepreted",
    "leaveType",
    "day_type"
  ];

  const searchingData = (item, query, nm = 0) => {
    const bool = item?.[nameKey[nm]]?.toLowerCase()?.includes(query);

    if (bool) {
      return bool;
    } else {
      nm += 1;
      if (nm < nameKey.length) {
        return searchingData(item, query, nm);
      }
    }
  };

  const handleSearch = (list) => (e) => {
    const query = e.target.value.toLowerCase();

    // const filtered = getSearchingData(list?.data, query, { nm: "lve", no: 1 });

    const filtered = list?.data?.filter(
      (item) => searchingData(item, query)
      /// i think this code length so comments

      // item?.["user.user_name"]?.toLowerCase()?.includes(query) ||
      // item?.["user.display_name"]?.toLowerCase()?.includes(query) ||
      // item?.["user.department"]?.toLowerCase()?.includes(query) ||
      // item?.["leaveType"]?.toLowerCase()?.includes(query) || item?.["date_commasepreted"]?.toLowerCase()?.includes(query)
    );

    setFilteredData({ ...list, data: filtered });

    setSearchTerm(e.target.value);
  };

  const getUserDetails = () => {
    setIsLoading(true);
    getRequest(getParticularUserUrl(userId.key))
      .then((res) => {
        setGetProfile(res.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    !!userId.key && getUserDetails();
  }, [userId.key, userId.bool]);

  return (
    <>
      <div className="background-DCDFE4 py-3 ">
        <div
          className="background-FFFFFF min-height-69"
          onClick={() => {
            showKnowledge && setShowKnowledge(false);
          }}
        >
          <div className="row">
            <LeftNavbar
              showLeftNav={showLeftNav}
              setShowLeftNav={setShowLeftNav}
              setShowRightNav={setShowRightNav}
              showRightNav={showRightNav}
              setIsEmpList={setIsEmpList}
              setShowLeavesWfhStatus={setShowLeavesWfhStatus}
              setSearchTerm={setSearchTerm}
              knowledgeDash={knowledgeDash}
              setKnowledgeDash={setKnowledgeDash}
              setShowKnowledge={setShowKnowledge}
              showKnowledge={showKnowledge}
              showGroupWiseKnowledge={showGroupWiseKnowledge}
            />

            {(showRightNav === "dashboard" && (
              <HrDashboard
                showLeftNav={showLeftNav}
                setIsLoading={setIsLoading}
                setSnackbarOpen={setSnackbarOpen}
                setToken={setToken}
                setShowLeavesWfhStatus={setShowLeavesWfhStatus}
                setShowRightNav={setShowRightNav}
              />
            )) ||
              (showRightNav === "employeeList" &&
                (isEmpList ? (
                  <EmployeeLIst
                    showLeftNav={showLeftNav}
                    // setIsEmpList={setIsEmpList}
                    handleEmpList={handleEmpList}
                    setIsLoading={setIsLoading}
                    setSnackbarOpen={setSnackbarOpen}
                  />
                ) : (
                  <div
                    className={`${
                      showLeftNav ? "width-82per" : "col-11"
                    } py-2 px-2`}
                  >
                    {Object.keys(getProfile).length && (
                      <EmpDetails
                        getProfile={getProfile}
                        getUserDetails={getUserDetails}
                        setIsLoading={setIsLoading}
                        setSnackbarOpen={setSnackbarOpen}
                        isViewMode={userId.bool}
                        userId={userId}
                        setIsEmpList={setIsEmpList}
                        setShowRightNav={setShowRightNav}
                        initialValues={initialValues}
                        validationSchemaProfile={validationSchemaHRProfile}
                      />
                    )}
                  </div>
                ))) ||
              (showRightNav === "holidays" && (
                <Holidays
                  showLeftNav={showLeftNav}
                  setIsLoading={setIsLoading}
                  setSnackbarOpen={setSnackbarOpen}
                />
              )) ||
              (showRightNav === "leaves" && showLeavesWfhStatus && (
                <HrLeaves
                  showLeftNav={showLeftNav}
                  showLeavesWfhStatus={showLeavesWfhStatus}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setIsLoading={setIsLoading}
                  setSnackbarOpen={setSnackbarOpen}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  handleSearch={handleSearch}
                  notiFunc={notiFunc}
                />
              )) ||
              (showRightNav === "wfh" && showLeavesWfhStatus && (
                <HrWFH
                  showLeftNav={showLeftNav}
                  showLeavesWfhStatus={showLeavesWfhStatus}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setIsLoading={setIsLoading}
                  setSnackbarOpen={setSnackbarOpen}
                  filteredData={filteredData}
                  handleSearch={handleSearch}
                  notiFunc={notiFunc}
                />
              )) ||
              (showRightNav === "knowledge" && knowledgeDash ? (
                <div
                  className={`${showLeftNav ? "width-82per" : "col-11"} py-2 `}
                >
                  <KnowledgeTabled
                    setIsLoading={setIsLoading}
                    setSnackbarOpen={setSnackbarOpen}
                    showGroupWiseKnowledge={showGroupWiseKnowledge}
                    knowledgeDash={knowledgeDash}
                  />
                </div>
              ) : (
                <div
                  className={`${showLeftNav ? "width-82per" : "col-11"} py-4`}
                >
                  <KnowledgeDashb
                    setIsLoading={setIsLoading}
                    setSnackbarOpen={setSnackbarOpen}
                    showGroupWiseKnowledge={showGroupWiseKnowledge}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Loader open={isLoading} size={70} />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
};

export default HrPanel;
