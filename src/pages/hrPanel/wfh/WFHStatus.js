import React, { useEffect } from "react";
import { getRequest } from "../../../services";

const WFHStatus = () => {
  const wfhDetails = [
    "Pseudo Name",
    "Employee Name",
    "From Date",
    "To Date",
    "Status",
  ];

  const wfhLists = ["Jonny", "Olive", "01/01/23", "03/03/23", "Approve"];

  useEffect(() => {
    // setIsLoading(true);
    getRequest("/WFHlist")
      .then((res) => {
        console.log(res,18);
      })
      // .finally(() => setIsLoading(false));
  }, []);

  return (
    <table className="width-100 mt-3">
      <tr className="background-F7F7F7">
        {wfhDetails.map((wfhDetail, ind) => (
          <th
            className="color-2E3192 py-2 border-start-0 border-end-0 text-center"
            key={ind}
          >
            {wfhDetail}
          </th>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center   empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
      <tr className="background-FFFFFF">
        {wfhLists.map((empList, ind) => (
          <td
            className="text-center empList-txt py-2 border-start-0 border-end-0"
            key={ind}
          >
            {empList}
          </td>
        ))}
      </tr>
    </table>
  );
};

export default WFHStatus;
