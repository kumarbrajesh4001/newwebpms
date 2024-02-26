import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import getleaveDays from "../../../helpers/leaveDays";
import moment from "moment";
import { head, last } from "lodash";
import { getShortingData, setShortingIcon } from "../../../helpers/sorting";
import { getDDMMYYYY } from "../../../formatter/date";

const leaveDetails = [
  "EmpId",
  "User Name",
  "Department",
  "Leave Type",
  "Day Type",
  "Notify To",
  "Description",
  "From Date",
  "To Date",
  "",
];

const sortName = [
  "user.user_name",
  "user.display_name",
  "user.department",
  "leaveType",
  "", //4 index is
  "date_commasepreted",
];

const PendingLeaves = (props) => {
  const {
    handleClick,
    pendingUsers,
    isShorting,
    expandLessMore,
    setIsShorting,
    setExpandLessMore,
    setUserDetailsPage,
    setFilteredData,
    searchTerm,
  } = props;

  return (
    <table className="width-100 mt-3">
      <tr className="background-F7F7F7">
        {leaveDetails.map((empDetail, ind) => (
          <th
            className={`color-2E3192 py-2 border-start-0 border-end-0 text-center ${ind===1&&"width-14"} ${
              ind !== 6 && ind !== 9 && "pointer-cur"
            }`}

            // onClick={() => {
            //   if (![4, 6, 7].includes(ind)) {
            //     getShortingData(
            //       ind,
            //       setIsShorting,
            //       setExpandLessMore,
            //       pendingUsers,
            //       expandLessMore,
            //       setUserDetailsPage,
            //       setFilteredData,
            //       searchTerm,
            //       sortName[ind],
            //       false
            //     );
            //   }
            // }}
            
            key={ind}
          >
            <span>
              {empDetail}
              {/* {setShortingIcon(
                ![4, 6, 7].includes(ind) && ind + 1,
                isShorting,
                expandLessMore,
                "els"
              )} */}
            </span>
          </th>
        ))}
      </tr>

      {pendingUsers?.map((leaveDetail, ind) => (
        <tr key={ind} className="background-FFFFFF">
          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {leaveDetail?.["user.user_name"]}
          </td>
          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {leaveDetail?.["user.display_name"]}
          </td>

          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {leaveDetail?.["user.department"]}
          </td>

          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {leaveDetail?.leaveType}
          </td>
          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {leaveDetail?.day_type}
          </td>
          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {JSON.parse(leaveDetail?.notify_PM||"[]")?.map((pm,ind,arr)=><span key={ind}>{pm}{ind<arr.length-1&&","}</span>)}
            {/* {JSON.parse(leaveDetail?.notify_PM)[0]} */}
            {/* {console.log(JSON.parse(leaveDetail?.notify_PM||"[]"))} */}
          </td>
          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0 word-brk">
            <Tooltip
              title={
                <span className="fontWeight-600">{`[${getDDMMYYYY(leaveDetail?.createdAt)}]  ${leaveDetail?.body}`}</span>
              }
            >
              <Button>{"details..."}</Button>
            </Tooltip>
          </td>

          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {getDDMMYYYY(head(leaveDetail?.date_commasepreted?.split(",")))}
          </td>
          <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0">
            {getDDMMYYYY(last(leaveDetail?.date_commasepreted?.split(",")))}
          </td>

          <td className="text-end empList-txt width-131 py-2 border-start-0 border-end-0">
            <MoreVertIcon
              className="color-000000 pointer-cur me-2"
              onClick={handleClick(leaveDetail?.id)}
            />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default PendingLeaves;
