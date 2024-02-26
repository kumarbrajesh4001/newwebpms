import moment from "moment";

export const getCalender = (startEndDate) => {
  const firstDate = startEndDate[0].split(",")[0].split(" ")[1];
  const lastDate = startEndDate[1].split(",")[0].split(" ")[1];

  let daysInMonth = [];

  for (let i = firstDate; i <= lastDate; i++) {
    daysInMonth.push({
      date: `${i}`.padStart(2, "0"),
      day: moment(startEndDate[0]).date(i).format("dd").toUpperCase(),
    });
  }

  return daysInMonth;
};


// export const getStEdDate = (date)=>moment(date).format("YYYY-MM-DD");