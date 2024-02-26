const flt1 = ["user_name", "user_id", "display_name", "name"];
const flt2 = ["display_name", "user.display_name", "issue_key", "key"];
const flt3 = ["real_name", "role", "user.department", "issue_name", "total"];

const flt4 = ["department", "email", "leaveType", "time_spent_seconds", "pre"];
const flt5 = ["workFrom", "first_login", "status", "workLog_date", "pen"];

const getSearchingData = (list, query, { nm, no }) =>
  list?.filter(
    (item) =>
      item?.[flt1[no]]?.toLowerCase()?.includes(query) ||
      item?.[flt2[no]]?.toLowerCase()?.includes(query) ||
      item?.[nm === "emp" ? flt3[no] : flt3[no + 1]]
        ?.toLowerCase()
        ?.includes(query) ||
      `${item?.[nm === "emp" ? flt4[no] : flt4[no + 1]]}`
        ?.toLowerCase()
        ?.includes(query) ||
      `${item?.[nm === "emp" ? flt5[no] : flt5[no + 1]]}`
        ?.toLowerCase()
        ?.includes(query)
  );

// const getSearchingData = (list, query, { nm, no }) =>

//   list?.filter(
//     (item) =>

//     item?.name?.toLowerCase()?.includes(query) ||
//     item?.key?.toLowerCase()?.includes(query) ||
//     item?.total
//       ?.toLowerCase()
//       ?.includes(query)
//         // ||
//         //  item?.total?.toLowerCase()?.includes(query) ||
//         //  item?.[nm === "emp" ? flt5[no] : flt5[no + 1]]?.toLowerCase()?.includes(query)

//   );

export default getSearchingData;
