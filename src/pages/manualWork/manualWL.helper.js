let hourSecond = 0;
let minuteSecond = 0;

const totalTimeInSecond = (param, value) => {
  if (param === "hour") {
    hourSecond = value * 60 * 60;
  } else if (param === "minute") {
    minuteSecond = value * 60;
  } else {
    hourSecond = value;
    minuteSecond = value;
  }

  return hourSecond + minuteSecond;
};

export default totalTimeInSecond;
