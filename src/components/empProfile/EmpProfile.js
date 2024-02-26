import React, { useEffect, useState } from "react";
import { API_URL } from "../../constant/apiUrls";
import { getRequest } from "../../services";
import EmpDetails from "../empDetails";
// import EmpDocumentation from "../empDocumentation";
import Loader from "../loader";
import ErrorSnackBar from "../snackBar/ErrorSnackBar";
import Leave from "../leave";
import WFH from "../wfh";
import signoutPage from "../../helpers/signout";
import { useDispatch } from "react-redux";
import getSearchUsers, { sortingDataByDateAndId } from "../../helpers/sorting";
import Knowledge from "../knowledge";
import { validationSchemaProfile } from "../../schmas";
import EmployeeDocumentation from "../empDocumentation/EmployeeDocumentation";

const EmpProfile = (props) => {
  const {
    opensnackbar,
    setSnackbarOpen,
    setToken,
    isEmpDetail,
    setIsEmpDetail,
  } = props;

  const dispatch = useDispatch();

  // const [isEmpDetail, setIsEmpDetail] = useState("profile");

  // const [opensnackbar, setSnackbarOpen] = useState({});

  const [oneUserWFHLeaveList, setOneUserWFHLeaveList] = useState({});

  const [getProfile, setGetProfile] = useState({});
  const [isShorting, setIsShorting] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const rjct = [
    "r",
    "re",
    "rej",
    "reje",
    "rejec",
    "reject",
    "rejecte",
    "rejected",
  ];

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
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
  };

  const handleSearch = (list, sortName) => (e) => {
    const query = e.target.value?.toLowerCase();

    const filtered = list?.data?.filter(
      (item) =>
        item?.date_commasepreted?.includes(query) ||
        item?.status
          ?.toLowerCase()
          ?.includes(rjct.includes(query) ? "canceled" : query) ||
        item?.[sortName]?.toLowerCase()?.includes(query)
    );

    setFilteredData({
      ...list,
      data: filtered,
      count: filtered?.length,
    });

    setSearchTerm(e.target.value);
    setIsExpand(false);
  };

  const handleClose = () => {
    setSnackbarOpen({ setopen: false });
  };

  const getUserDetails = () => {
    setIsLoading(true);
    getRequest(API_URL.USER_PROFILE_DETAILS)
      .then((res) => {
        setGetProfile(res.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          signoutPage(setToken, dispatch);
        } else {
          console.log(error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const WFHLeaveDetails = getSearchUsers(
    searchTerm,
    filteredData,
    oneUserWFHLeaveList
  );

  const wfhLeaveDataSorted = (key) => {
    sortingDataByDateAndId(
      WFHLeaveDetails,
      setFilteredData,
      setOneUserWFHLeaveList,

      isShorting,
      searchTerm,
      key
    );

    setIsShorting(!isShorting);
    setIsExpand(true);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className="pt-2 pb-5 px-3 scroll-Y-axis1">
        <div className="text-center my-4">
          <span
            className={`${
              isEmpDetail === "profile"
                ? "apply-pro-save-btn text-white"
                : "doc-button"
            } px-5 py-2 pointer-cur`}
            onClick={() => {
              setIsEmpDetail("profile");
            }}
          >
            Profile
          </span>
          <span
            className={`${
              isEmpDetail === "empdocs"
                ? "apply-pro-save-btn text-white"
                : "doc-button"
            } px-4 py-2 pointer-cur`}
            onClick={() => {
              setIsEmpDetail("empdocs");
            }}
          >
            Documentation
          </span>
          <span
            className={`${
              isEmpDetail === "leave"
                ? "apply-pro-save-btn text-white"
                : "doc-button"
            } px-5 py-2 pointer-cur`}
            onClick={() => {
              setIsEmpDetail("leave");
              setSearchTerm("");
              setFilteredData([]);
              setIsShorting(false);
              setIsExpand(false);
            }}
          >
            Leave
          </span>
          <span
            className={`${
              isEmpDetail === "WFH"
                ? "apply-pro-save-btn text-white"
                : "doc-button"
            } px-5 py-2 pointer-cur`}
            onClick={() => {
              setIsEmpDetail("WFH");
              setSearchTerm("");
              setFilteredData([]);
              setIsShorting(false);
              setIsExpand(false);
            }}
          >
            WFH
          </span>

          <span
            className={`${
              isEmpDetail === "knowledge"
                ? "apply-pro-save-btn text-white"
                : "doc-button"
            } px-4 py-2 pointer-cur`}
            onClick={() => {
              setIsEmpDetail("knowledge");
              setSearchTerm("");
              setFilteredData([]);
              setIsShorting(false);
              setIsExpand(false);
            }}
          >
            Knowledge Base
          </span>
        </div>
        {(isEmpDetail === "profile" && Object.keys(getProfile).length && (
          <EmpDetails
            getProfile={getProfile}
            getUserDetails={getUserDetails}
            setSnackbarOpen={setSnackbarOpen}
            setIsLoading={setIsLoading}
            isViewMode="prf"
            userId={{
              key: getProfile?.user_key,

              disN: getProfile?.display_name,
              eml: getProfile?.email,
            }}
            initialValues={initialValues}
            validationSchemaProfile={validationSchemaProfile}
          />
        )) ||
          (isEmpDetail === "empdocs" && (
            <EmployeeDocumentation
              getProfile={getProfile}
              setSnackbarOpen={setSnackbarOpen}
              setIsLoading={setIsLoading}
              getUserDetails={getUserDetails}
            />
          )) ||
          (isEmpDetail === "leave" && (
            <Leave
              setSnackbarOpen={setSnackbarOpen}
              setIsLoading={setIsLoading}
              handleSearch={handleSearch}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              oneUserWFHLeaveList={oneUserWFHLeaveList}
              setOneUserWFHLeaveList={setOneUserWFHLeaveList}
              WFHLeaveDetails={WFHLeaveDetails}
              wfhLeaveDataSorted={wfhLeaveDataSorted}
              isShorting={isShorting}
              isExpand={isExpand}
            />
          )) ||
          (isEmpDetail === "WFH" && (
            <WFH
              setSnackbarOpen={setSnackbarOpen}
              setIsLoading={setIsLoading}
              handleSearch={handleSearch}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              oneUserWFHLeaveList={oneUserWFHLeaveList}
              setOneUserWFHLeaveList={setOneUserWFHLeaveList}
              WFHLeaveDetails={WFHLeaveDetails}
              wfhLeaveDataSorted={wfhLeaveDataSorted}
              isShorting={isShorting}
              isExpand={isExpand}
            />
          )) ||
          (isEmpDetail === "knowledge" && (
            <Knowledge
              setSnackbarOpen={setSnackbarOpen}
              setIsLoading={setIsLoading}
            />
          ))}
      </div>


      <Loader open={isLoading} size={70} />
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
};

export default EmpProfile;
