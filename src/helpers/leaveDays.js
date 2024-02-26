import moment from "moment";
import { getStEdDate } from "../formatter/date";

const getleaveDays = (fromDate, toDate) => {
  if (fromDate && toDate) {
    const st = getStEdDate(fromDate); // moment(fromDate).format("YYYY-MM-DD");
    const ed = getStEdDate(toDate);  // moment(toDate).format("YYYY-MM-DD");

    const date1 = moment(st);
    const date2 = moment(ed);
    const diffInDays = date2.diff(date1, "days");

    return diffInDays + 1;
  }
};

export default getleaveDays;
