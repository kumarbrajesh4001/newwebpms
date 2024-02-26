import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import upload from "../../../assets/upload.png";
import { getRequest, postRequest } from "../../../services";
import { API_URL, getUserList } from "../../../constant/apiUrls";
import { DEFAULT_SELECTED_PAGE } from "../../../constant";
import Loader from "../../../components/loader";
import getSearchUsers, {
  getShortingData,
  getShortingDataEmp,
  setShortingIcon,
  setShortingIconEmp,
  sortingDataByDateAndId,
  sortingIcon,
} from "../../../helpers/sorting";
import getSearchingData from "../../../helpers/searching";
import sortingEmpData, { fullName } from "./empList.helper";
import { SearchBar } from "../components";

const EmployeeLIst = (props) => {
  const {
    showLeftNav,
    setIsEmpList,
    handleEmpList,
    setIsLoading,
    setSnackbarOpen,
  } = props;

  // const [empList, setEmpList] = useState({});
  const [userDetailsPage, setUserDetailsPage] = useState({});

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredData, setFilteredData] = useState({});

  const [isShorting, setIsShorting] = useState(false);
  const [expandLessMore, setExpandLessMore] = useState(true);

  const [isExpand, setIsExpand] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (userKey, disN, eml, id, drtm) => (event) => {
    event.stopPropagation();

    setAnchorEl({
      event: event.currentTarget,
      key: userKey,
      disN,
      eml,
      id,
      drtm,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl?.event);

  const empFNF = ["select", "FNF", "Abscond"];

  const statuses = ["All", "Active", "Inactive"];

  const fltr = ["Active", "Inactive"];

  const empDetails = [
    "S.N",
    "Employee Id",
    "Pseudo Name",
    "Name",
    "Department",
    // "DGN",
    "Work From",
    "DOB",
    "DOJ",
    "Status",
    // "RSN",
    // "DOE",
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    const query = value.toLowerCase();

    const filtered = getSearchingData(userDetailsPage?.data, query, {
      nm: "emp",
      no: 0,
    });

    setFilteredData({
      ...userDetailsPage,
      data: filtered,
      count: filtered?.length,
    });

    setSearchTerm(value);
    setIsShorting(false);
  };

  const getActiveEmp = (e) => {
    const value = e?.target?.value?.toLowerCase();

    const filtered = userDetailsPage?.data?.filter(
      (user) => user?.status?.toLowerCase() === value
    );

    setFilteredData({
      ...userDetailsPage,
      data: filtered,
      count: filtered?.length,
    });
    setSearchTerm(value === "all" ? "" : value);
    setIsShorting(false);
  };

  const getEmpList = getSearchUsers(
    searchTerm === "All" ? "" : searchTerm,
    filteredData,
    userDetailsPage
  );

  const empCsvData = [];

  for (let i = 0; i < getEmpList?.data?.length; i++) {
    empCsvData.push({
      Serial_No: i + 1,
      EmployeeId: getEmpList.data[i].user_name,
      PseudoName: getEmpList.data[i].display_name,
      Name: getEmpList.data[i].real_name,
      Department: getEmpList.data[i].department,
      // Designation: getEmpList.data[i].designation,
      Work_From: getEmpList.data[i].workFrom,
      DOB: getEmpList.data[i].DOB
        ? moment(getEmpList.data[i].DOB).format("DD/MM/YYYY")
        : "",
      DOJ: getEmpList.data[i].DOJ
        ? moment(getEmpList.data[i].DOJ).format("DD/MM/YYYY")
        : "",
      Status: getEmpList.data[i].status,
    });
  }

  const getEmployeeList = () => {
    setIsLoading(true);
    getRequest(getUserList(selectedPage, 1000))
      .then((res) => {
        setUserDetailsPage(res.data);
      })
      .catch((err) => {
        setSnackbarOpen({
          setopen: true,
          message: err.message,
          severity: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  //when use remove user then it's uses

  // const removeUsers = (id) => {
  //   setIsLoading(true);
  //   postRequest(API_URL.REMOVE_EMPLOYEE, { id })
  //     .then((res) => {
  //       setSnackbarOpen({
  //         setopen: true,
  //         message: "remove employee successfully",
  //         severity: "success",
  //       });

  //       getEmployeeList();
  //     })
  //     .catch((err) => {
  //       setSnackbarOpen({
  //         setopen: true,
  //         message: err.message,
  //         severity: "error",
  //       });
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const sortName = [
    "user_name",
    "display_name",
    "real_name",
    "department",
    "workFrom",
    "DOB",
    "DOJ",
    "status",
  ];

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <>
      <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2 px-4`}>
        <div className="d-flex justify-content-between mt-5">
          <SearchBar
            handleSearch={handleSearch}
            statuses={statuses}
            searchTerm={searchTerm}
          />
          {/* <div className="form-field">
            <input
              type="text"
              placeholder="Search"
              className="leaveInput-search_Bar ps-2"
              onChange={handleSearch}
              value={statuses.includes(searchTerm) ? "" : searchTerm}
            />
            <span className="empList-search pointer-cur">
              <SearchIcon className="color-2E3192" />
            </span>
          </div> */}
          <div className="row">
            <div className="col-9 input-bg-hight-border font-size-15 d-flex align-items-center px-2">
              <span>Status:</span>
              <select
                className="border-0 color-686868 ps-1 pointer-cur"
                onChange={getActiveEmp}
                required
              >
                {statuses.map((status, ind) => (
                  <option key={ind}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <CSVLink data={empCsvData} filename={"TableContent.csv"}>
                <img
                  src={upload}
                  alt="upload"
                  width="35px"
                  height="35px"
                  className="pointer-cur"
                />
              </CSVLink>
            </div>
          </div>
        </div>

        <div className="section-background-shadow-radius">
          <table className="width-100 mt-3">
            <tr className="background-F7F7F7 sticky-top">
              {empDetails.map((empDetail, ind) => (
                <th
                  colSpan={`${ind === 8 && 2}`}
                  className={`color-2E3192 py-2 border-start-0 border-end-0 ${
                    ind === 0 && "width-4"
                  }  ${(ind === 1 || ind === 2) && "width-14"} ${
                    ind === 5 && "empWidth-11"
                  } ${ind === 8 ? "ps-3" : "text-center"}`}
                  // className={`color-2E3192 py-2 border-start-0 border-end-0 ${
                  //   ind === 0
                  //     ? "empWidth-1 ps-1"
                  //     : ind === 1
                  //     ? "empWidth-9"
                  //     : "empWidth-11"
                  // } ${ind === 10 ? "ps-5" : "text-center"}`}

                  key={ind}
                  onClick={() => {
                    if (ind !== 0) {
                      getShortingData(
                        ind,
                        setIsShorting,
                        setExpandLessMore,
                        getEmpList,
                        expandLessMore,
                        setUserDetailsPage,
                        setFilteredData,
                        searchTerm,
                        sortName[ind - 1],
                        false
                      );
                    }
                  }}
                >
                  {/* <Tooltip
                    title={
                      <span className="fontWeight-600">{fullName(ind)}</span>
                    }
                  >
                    <span>
                      {empDetail}
                      {setShortingIconEmp(ind, isShorting, expandLessMore)}
                    </span>
                  </Tooltip> */}

                  <span>
                    {empDetail}
                    {setShortingIcon(ind===0?"":ind, isShorting, expandLessMore,"els")}
                  </span>
                </th>
              ))}
            </tr>

            {getEmpList?.data?.map((list, ind) => (
              <tr
                className="background-FFFFFF pointer-cur"
                key={ind}
                onClick={handleEmpList(
                  list.user_key,
                  true,
                  list.display_name,
                  list.email
                )}
              >
                <td className="text-center empList-txt py-2 border-start-0 border-end-0">
                  {ind + 1}
                </td>

                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.user_name}
                </td>
                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.display_name}
                </td>
                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.real_name}
                </td>
                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.department}
                </td>
                {/* when use then uses */}
                {/* <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.designation}
                </td> */}

                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.workFrom}
                </td>

                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.DOB ? moment(list.DOB).format("DD/MM/YY") : ""}
                </td>

                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  {list.DOJ ? moment(list.DOJ).format("DD/MM/YY") : ""}
                </td>
                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  <span
                    className={
                      list.status === "Active" && "approve_btn px-2 py-1"
                    }
                  >
                    {list.status}
                  </span>
                </td>

                {/* <td className="text-center empList-txt  py-2 border-start-0 border-end-0 empWidth-111">
                  <select
                    // id="entries"
                    className="empSelect1 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    required
                  >
                    {empFNF.map((entry, ind) => (
                      <option
                        key={ind}
                        value={ind === 0 ? "" : entry}
                        disabled={ind === 0 && true}
                        selected={ind === 0 && true}
                        hidden={ind === 0 && true}
                      >
                        {entry}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-center empList-txt py-2 border-start-0 border-end-0">
                  <input
                    type="date"
                    onClick={(e) => {
                      e.target.showPicker();
                      e.stopPropagation();
                    }}
                    className="empDate ps-1"
                  />
                </td> */}

                <td className="text-center empList-txt empWidth-111 py-2 border-start-0 border-end-0">
                  <MoreVertIcon
                    className="color-000000 pointer-cur"
                    onClick={handleClick(
                      list.user_key,
                      list.display_name,
                      list.email,
                      list.id,
                      list.department
                    )}
                  />
                </td>
              </tr>
            ))}
            {/* <tr><td>Total:</td><td>{getEmpList.data?.length}</td></tr> */}
          </table>
          <div className="row px-3 pt-3 pb-2 heading-home">
            <div className="col-8 text-end">Total </div>
            <div className="col-4 text-end">{getEmpList.data?.length}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="cus_radio_btn background-40BC39 d-inline-block"></div>
          <span className="ms-3 me-4">Active</span>
          <div className="cus_radio_btn background-E71D1D d-inline-block"></div>
          <span className="ms-3 me-4">Inactive</span>
          <div className="cus_radio_btn background-FDE642 d-inline-block"></div>
          <span className="ms-3">Pending</span>
        </div>
        {/* this will common bcz present allready in knowledgebase */}
        <Popover
          open={open}
          anchorEl={anchorEl?.event}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="empList-txt">
            <div
              className="pointer-cur popUp_app_rej width-100 mt-1 px-3 py-2"
              onClick={handleEmpList(
                anchorEl?.key,
                false,
                anchorEl?.disN,
                anchorEl?.eml,
                anchorEl?.drtm
              )}
            >
              <EditIcon fontSize="small" className="me-2" />
              Edit
            </div>
            <div
              className="my-2 pointer-cur popUp_app_rej width-100 mt-1 px-3 py-2"
              onClick={handleEmpList(
                anchorEl?.key,
                true,
                anchorEl?.disN,
                anchorEl?.eml
              )}
            >
              <VisibilityIcon fontSize="small" className="me-2" />
              View
            </div>

            {/* when use delete then use */}

            {/* <div
              className="pointer-cur popUp_app_rej width-100 my-1 px-3 py-2"
              onClick={() => {
                removeUsers(anchorEl?.id);
                handleClose();
              }}
            >
              <DeleteIcon fontSize="small" className="me-2" />
              Delete
            </div> */}
          </div>
        </Popover>
      </div>
      {/* <Loader open={isLoading} size={70} /> */}
    </>
  );
};

export default EmployeeLIst;
