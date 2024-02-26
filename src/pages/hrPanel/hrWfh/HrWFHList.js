import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import getleaveDays from "../../../helpers/leaveDays";
import { head, last } from "lodash";
import { getDDMMYYYY } from "../../../formatter/date";

const WFHList = (props) => {
  const { handleClick, pendingWFH } = props;
  const wfhDetails = [
    
    "EmpId",
    "User Name",
    "Department",
    "Day Type",
    "Notify To",
    "Description",
    "From Date",
    "To Date",
    "",
  ];

  return (
    <table className="width-100 mt-3">
      <tr className="background-F7F7F7">
        {wfhDetails.map((wfhDetail, ind) => (
          <th
            className={`color-2E3192 py-2 border-start-0 border-end-0 text-center width-161 ${
              ind === 5 && "rt"
            } `}
            key={ind}
          >
            {wfhDetail}
          </th>
        ))}
      </tr>

      {pendingWFH?.map((list, ind) => (
        <tr className="background-FFFFFF" key={ind}>
          {/* <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {ind + 1}
          </td> */}

          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {list?.["user.user_name"]}
          </td>

          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {list?.["user.display_name"]}
          </td>

          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {list?.["user.department"]}
          </td>
          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {list?.day_type}
          </td>

          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
          {JSON.parse(list?.notify_PM||"[]")?.map((pm,ind,arr)=><span key={ind}>{pm}{ind<arr.length-1&&","}</span>)}
          </td>
          {/* <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {list?.["user.designation"]}
          </td> */}

          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0 ws">
            {/* {list?.discription} */}
            <Tooltip title={<span className="fontWeight-600">{`[${getDDMMYYYY(list?.createdAt)}] ${list?.discription}`}</span>} >
              <Button>{"details..."}</Button>
            </Tooltip>
            
          </td>

          {/* <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {getleaveDays(
              head(list?.date_commasepreted?.split(",")),
              last(list?.date_commasepreted?.split(","))
            )}
          </td> */}
          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {getDDMMYYYY(head(list?.date_commasepreted?.split(",")))}
          </td>
          <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0">
            {getDDMMYYYY(last(list?.date_commasepreted?.split(",")))}
          </td>

          <td className="text-end empList-txt width-161  py-2 border-start-0 border-end-0">
            <MoreVertIcon
              className="color-000000 pointer-cur me-2"
              onClick={handleClick(list?.id)}
            />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default WFHList;
