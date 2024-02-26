
const empFullName = [
  "Serial number",
  // "Employee Id",
  // "Pseudo Name",
  // "Name",
  // "Department",
  // "Designation",
  // "Work From",
  "Date Of Birth",
  "Darte of Joining",
  // "Status",
  // "Reason",
  // "Date Of Ending",
];

export const fullName = (ind) => empFullName[ind];





const accending = (x, y) =>
  x?.DOJ?.localeCompare(y?.DOJ);

const sortingEmpData = (list, isExpand, isTrue) =>
  isExpand
    ? {
        ...list,
        data: list?.data?.sort((a, b) =>
          isTrue ? accending(b, a) : accending(a, b)
        ),
      }
    : list;

export default sortingEmpData;
