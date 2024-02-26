import moment from "moment";
import { DDMMYYYY, MMDDYYYY, MMM_DD_YYYY, YYYY, YYYY_MM_DD } from "../constant/datepicker";

export const getExDateTime = (days) =>
  new Date(moment().add(days, "days").toDate());

export const startDateMonth = (number) =>
  moment().add(number, "months").startOf("month").format(MMM_DD_YYYY);

export const endDateMonth = (number) =>
  moment().add(number, "months").endOf("month").format(MMM_DD_YYYY);

export const getSelectStartDate = (selectDate) =>
  selectDate
    ? moment(selectDate).format(MMM_DD_YYYY)
    : moment().startOf("month").format(MMM_DD_YYYY);

export const getSelectEndDate = (selectDate) =>
  selectDate
    ? moment(selectDate).format(MMM_DD_YYYY)
    : moment().endOf("month").format(MMM_DD_YYYY);

export const currentMonth = moment().format(YYYY_MM_DD);

export const getDateValue = (dateValue) =>
  moment(dateValue).endOf("month").format(YYYY_MM_DD);

export const fromTo = (value)=>  moment(value).format(MMDDYYYY);


export const getStEdDate = (date)=>moment(date).format(YYYY_MM_DD)

export const showDate = (number)=> moment().add(number, "months").format(YYYY_MM_DD);

export const getDDMMYYYY = (date)=> moment(date).format(DDMMYYYY);

export const getYear = moment().format(YYYY);

export const getFirstDaysMonth = moment().format("YYYY-MM-01");
 
// moment(userBirthday[0]?.date).format("DD/MM/YYYY")