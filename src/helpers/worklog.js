import LOG_STATUS from "../constant/logStatus";

const USER_STATUS = {
  [LOG_STATUS.PRE_APPROVED]: "Pre-Approved",
  [LOG_STATUS.PENDING]: "Pending",
  [LOG_STATUS.APPROVED]: "Approved",
  [LOG_STATUS.REJECTED]: "Rejected",
};

export const logStatus = (state) => USER_STATUS[state];

export const dailyHoursTotal = (totalDailyHours, weekHours) => {
  let a = 0;
  let b = 0;

  return totalDailyHours?.map((hours, ind) => {
    if (hours) {
      return hours;
    } else {
      if (weekHours[a]?.col + b === ind) {
        b += weekHours[a]?.col;
        a++;
        return "SUN";
      } else {
        return "";
      }
    }
  });
};

const sumHoursByDate = (inputs) => {
  let qw = "1";

  return Object.values(
    inputs.reduce((a, { worklog_date, worklog_time, AttrValue }, ind, arr) => {
      const key = `${worklog_date}}`;

      if (ind !== 0 && arr[ind - 1].worklog_date !== worklog_date) {
        qw = "1";
        if (AttrValue !== "1") {
          qw = AttrValue;
        }
      } else {
        if (AttrValue !== "1") {
          qw = AttrValue;
        }
      }

      return {
        ...a,
        [key]: {
          AttrValue: qw,
          worklog_date,
          worklog_time: ((a[key] && a[key].worklog_time) || 0) + worklog_time,
        },
      };
    }, {})
  );
};

export const getHoursByDate = (asd, cl) => {
  const userHours = sumHoursByDate(asd);

  const collectHours = [];

  let j = 0;

  for (let i = 1; i <= cl; i++) {
    if (userHours[j]?.worklog_date === i) {
      collectHours.push(userHours[j]);

      j++;
    } else {
      collectHours.push({ worklog_time: "" });
    }
  }

  return collectHours;
};

const getWorkLogTime = (worklogs, calenderLength, endWeek, firstDate) => {
  return worklogs?.map((worklog) => {
    for (const key in worklog) {
      return Object.keys(worklog[key]).map((cv) => {
        const arr = Array(calenderLength);

        let j = 0;
        let d = 0;
        let k = 0;

        for (let i = firstDate; i <= calenderLength; i++) {
          if (i === worklog[key][cv]?.logs[j]?.worklog_date) {
            arr[worklog[key][cv]?.logs[j]?.worklog_date - 1] = {
              [cv]: worklog[key][cv]?.logs[j]?.worklog_total_time,
              issue_key: worklog[key][cv]?.issue_key,
              date: worklog[key][cv]?.logs[j]?.worklog_Full_Date,
            };

            j++;

            if (endWeek[d]?.col + k === i - 1) {
              k += endWeek[d]?.col;
              d++;
            }
          } else if (
            worklog[key][cv]?.logs[j - 1]?.worklog_date ===
            worklog[key][cv]?.logs[j]?.worklog_date
          ) {
            i--;
            j++;
          } else if (endWeek[d]?.col + k === i - 1) {
            arr[i - 1] = {
              [5]: "",
            };
            k += endWeek[d]?.col;
            d++;
          } else {
            arr[i - 1] = {
              [6]: "",
            };
          }
        }

        return arr;
      });
    }
  });
};

export default getWorkLogTime;
