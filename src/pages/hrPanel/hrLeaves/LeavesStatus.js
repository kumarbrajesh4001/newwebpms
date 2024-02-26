import React from "react";
import head from "lodash/head";
import last from "lodash/last";
import Loader from "../../../components/loader";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import getleaveDays from "../../../helpers/leaveDays";
import { getDDMMYYYY } from "../../../formatter/date";

const LeavesStatus = (props) => {
  const { confirmUsers } = props;

  console.log(confirmUsers,12);

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
    "Status",
  ];

  return (
    <>
      <table className="width-100 mt-3">
        <tr className="background-F7F7F7">
          {leaveDetails.map((empDetail, ind) => (
            <th
             
              className={`color-2E3192 py-2 border-start-0 border-end-0 text-center width-111 ${ind===1&&"width-14"} ${ind===6&&"rt"}`}
              key={ind}
            >
              {empDetail}
            </th>
          ))}
        </tr>

        {confirmUsers?.map((leaveDetail, ind) => (
          <tr key={ind} className="background-FFFFFF">
            {/* <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {ind + 1}
            </td> */}
            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {leaveDetail?.["user.user_name"]}
            </td>
            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {leaveDetail?.["user.display_name"]}
            </td>

            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {leaveDetail?.["user.department"]}
            </td>

            {/* <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {leaveDetail?.["user.designation"]}
            </td> */}

            {/* <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {getleaveDays(
                head(leaveDetail?.date_commasepreted?.split(",")),
                last(leaveDetail?.date_commasepreted?.split(","))
              )}
            </td> */}

            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {leaveDetail?.leaveType}
            </td>
            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {leaveDetail?.day_type}
            </td>
            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
            {JSON.parse(leaveDetail?.notify_PM||"[]")?.map((pm,ind,arr)=><span key={ind}>{pm}{ind<arr.length-1&&","}</span>)}
            </td>
            <td className="text-center empList-txt width-131 py-2 border-start-0 border-end-0 ws">
          <Tooltip title= {<span className="fontWeight-600">{`[${getDDMMYYYY(leaveDetail?.createdAt)}]  ${leaveDetail?.body}`}</span>} >
              <Button>{"details..."}</Button>
            </Tooltip>
            
          </td>


            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {getDDMMYYYY(head(leaveDetail?.date_commasepreted?.split(",")))}
            </td>
            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              {getDDMMYYYY(last(leaveDetail?.date_commasepreted?.split(",")))}
            </td>

            <td className="text-center empList-txt py-2 border-start-0 border-end-0">
              <span
                className={`${
                  leaveDetail?.status === "Approved"
                    ? "approve_btn"
                    : "reject_btn"
                } px-2 py-1`}
              >
                {leaveDetail?.status === "Canceled"
                  ? "Rejected"
                  : leaveDetail?.status}
              </span>
            </td>
          </tr>
        ))}
      </table>

      {/* <Loader open={isLoading} size={70} /> */}
    </>
  );
};

export default LeavesStatus;
