import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import getleaveDays from "../../../helpers/leaveDays";
import { head, last } from "lodash";
import { getDDMMYYYY } from "../../../formatter/date";

const WFHStatus = (props) => {
  const { confirmWFH } = props;

  const wfhDetails = [
   
    "EmpId",
    "User Name",
    "Department",
    "Day Type",
    "Notify To",
    "Description",
    
    "From Date",
    "To Date",
    "Status",
  ];

  return (
    <>
      <table className="width-100 mt-3">
        <tr className="background-F7F7F7">
          {wfhDetails.map((wfhDetail, ind) => (
            <th
              className={`color-2E3192 py-2 border-start-0 border-end-0 text-center width-111 ${ind===1&&"width-14"}  ${
                ind === 5 && "rt"
              }`}
              key={ind}
            >
              {wfhDetail}
            </th>
          ))}
        </tr>

        {confirmWFH?.map((list, ind) => (
          <tr className="background-FFFFFF" key={ind}>
            {/* <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {ind + 1}
            </td> */}

            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {list?.["user.user_name"]}
            </td>

            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {list?.["user.display_name"]}
            </td>

            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {list?.["user.department"]}
            </td>

            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {list?.day_type}
            </td>
            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
            {JSON.parse(list?.notify_PM||"[]")?.map((pm,ind,arr)=><span key={ind}>{pm}{ind<arr.length-1&&","}</span>)}
            </td>
            {/* <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {list?.["user.designation"]}
            </td> */}

            <td className="text-center empList-txt width-161  py-2 border-start-0 border-end-0 ws">
              <Tooltip
                title={
                  <span className="fontWeight-600">{`[${getDDMMYYYY(list?.createdAt)}] ${list?.discription}`}</span>
                }
              >
                <Button>{"details..."}</Button>
              </Tooltip>
            </td>

            {/* <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {getleaveDays(
                head(list?.date_commasepreted?.split(",")),
                last(list?.date_commasepreted?.split(","))
              )}
            </td> */}

            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {getDDMMYYYY(head(list?.date_commasepreted?.split(",")))}
            </td>
            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              {getDDMMYYYY(last(list?.date_commasepreted?.split(",")))}
            </td>
            <td className="text-center empList-txt width-111 py-2 border-start-0 border-end-0">
              <span
                className={`${
                  list?.status === "Approved" ? "approve_btn" : "reject_btn"
                } px-2 py-1`}
              >
                {list?.status === "Canceled" ? "Rejected" : list?.status}
              </span>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default WFHStatus;
