import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getHoursByDate } from "../../helpers/worklog";

const activeTime = (teamTimeSheet, cl) =>
  teamTimeSheet?.userDisplay_name?.map((name, ind) => {
    const qwe = {
      name,
      key: teamTimeSheet?.user_worklog[name]?.user_key,
      pre: 0,
      pen: 0,
      apr: 0,
      rej: 0,
      total: teamTimeSheet?.user_worklog[name]?.total,
      workHours: getHoursByDate(teamTimeSheet?.user_worklog[name]?.logs, cl),
    };

    for (let i = 0; i < teamTimeSheet?.user_worklog[name]?.logs?.length; i++) {
      if (teamTimeSheet?.user_worklog[name]?.logs[i]?.AttrValue === "1") {
        qwe.pre =
          qwe.pre + teamTimeSheet?.user_worklog[name]?.logs[i]?.worklog_time;
      } else if (
        teamTimeSheet?.user_worklog[name]?.logs[i]?.AttrValue === "2"
      ) {
        qwe.pen =
          qwe.pen + teamTimeSheet?.user_worklog[name]?.logs[i]?.worklog_time;
      } else if (
        teamTimeSheet?.user_worklog[name]?.logs[i]?.AttrValue === "3"
      ) {
        qwe.apr =
          qwe.apr + teamTimeSheet?.user_worklog[name]?.logs[i]?.worklog_time;
      } else {
        qwe.rej =
          qwe.rej + teamTimeSheet?.user_worklog[name]?.logs[i]?.worklog_time;
      }
    }

    return qwe;
  });

const accending = (x, y) => x?.key?.localeCompare(y?.key);

const isSortingTeamData = (isExpand, isTrue, teamTimeSheet, cl) =>
  isExpand
    ? activeTime(teamTimeSheet, cl).sort((a, b) =>
        isTrue ? accending(b, a) : accending(a, b)
      )
    : activeTime(teamTimeSheet, cl);

export default isSortingTeamData;

export const getAllHours = (userFilterDetails, teamTimeSheet) => {
  const hrsObj = {
    dh: [],
    wh: [],
    mh: 0,
  };

  userFilterDetails?.forEach((cv) => {
    cv.workHours?.forEach((hrs, ind) => {
      hrsObj.dh[ind] = +((hrsObj.dh[ind] || 0) + hrs.worklog_time);
    });
  });

  let w = 0;
  for (let k = 0; k < teamTimeSheet?.sumWeekData?.length; k++) {
    for (let j = w; j < teamTimeSheet?.sumWeekData[k]?.col + w; j++) {
      hrsObj.wh[k] = {
        col: teamTimeSheet?.sumWeekData[k]?.col,
        time: (hrsObj.wh[k]?.time || 0) + hrsObj.dh[j],
      };
    }
    w = w + teamTimeSheet?.sumWeekData[k].col;
  }

  hrsObj.mh = hrsObj.dh.reduce((ac, cv) => ac + cv, 0);

  return hrsObj;
};

export const getDecimalValue = (value, no) => value.toFixed(no);
