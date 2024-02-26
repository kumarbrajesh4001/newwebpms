// import moment from "moment";
import { fromTo } from "../../formatter/date";
const fromToDate = [];
const saprateDate = (name, id, value) => {
  if (id === "from") {
    fromToDate[0] = fromTo(value);
  } else if (id === "to") {
    fromToDate[1] = fromTo(value);
  }

  return name === "date_commasepreted" ? fromToDate.join() : value;
};

export default saprateDate;
