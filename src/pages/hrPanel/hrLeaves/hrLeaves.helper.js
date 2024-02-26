import moment from "moment";

const dateFormate = (num,startEndDate) => moment(startEndDate[num]).format("MM/DD/YYYY");

export const paddingConfirmLeave = (userFilterDetails,startEndDate,bool) =>
  userFilterDetails
    ?.filter((item) => bool?item?.status === "Pending":item?.status !== "Pending")
    .filter(
      (cv) =>
        cv?.date_commasepreted.split(",")[0] >= dateFormate(0,startEndDate) &&
        cv?.date_commasepreted.split(",")[0] <= dateFormate(1,startEndDate)
    ) || [];
