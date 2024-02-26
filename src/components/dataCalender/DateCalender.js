import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import date from "../../assets/date.png";
import {
  currentMonth,
  endDateMonth,
  getDateValue,
  getSelectEndDate,
  getSelectStartDate,
  startDateMonth,
} from "../../formatter/date";

const DateCalender = (props) => {
  let { number, setNumber, startEndDate, setStartEndDate, hidden } = props;

  let [showDatePicker, setShowDatePicker] = useState(false);

  let [applyMonth, setApplyMonth] = useState([
    getSelectStartDate(),
    getSelectEndDate(),
  ]);

  const [dateRangeSt, setDateRangeSt] = useState("");

  const [dateRangeEd, setDateRangeEd] = useState("");

  const changeMonth = () => {
    setStartEndDate([startDateMonth(number), endDateMonth(number)]);
  };

  const previousMonth = () => {
    setNumber(--number);
    changeMonth();
  };

  const nextMonth = () => {
    setNumber(++number);
    changeMonth();
  };

  const calenderClose = () => {
    setShowDatePicker(false);
  };

  const handleSubmit = (e) => {
    setStartEndDate(applyMonth);
    e.preventDefault();
    calenderClose();
  };

  return (
    <div className="position-relative ">
      {!hidden && (
        <div className="color-2E3192 heading-home mb-2">DATE RANGE</div>
      )}

      <div className="d-flex">
        <button
          className="date-button p-1"
          onClick={() => {
            previousMonth();
            calenderClose();
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>

        <button
          className="mx-2 date-button width-100 p-1"
          onClick={() => {
            setShowDatePicker(!showDatePicker);
          }}
        >
          <span>
            <img src={date} alt="date" width="14px" className="mb-1" />
            {startEndDate?.map((cv, ind) => (
              <span className="ms-2" key={ind}>
                {cv} {ind < 1 && "-"}
              </span>
            ))}
          </span>
        </button>
        <button
          className="date-button p-1"
          onClick={() => {
            nextMonth();
            calenderClose();
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      </div>

      {showDatePicker && (
        <div className="modal2 modal21 p-3">
          <form onSubmit={handleSubmit}>
            <span className="color-2E3192 heading-home">DATE RANGE</span>
            <hr className="border-DDE8F1" />
            <div className="row mt-4">
              <div className="col-6">
                <label htmlFor="st" className="fontWeight-600 color-000000">
                  Start Date
                </label>

                <input
                  className="input-date-border input-pos ps-2 pointer-cur"
                  id="st"
                  type="date"
                  onChange={(e) => {
                    setApplyMonth([
                      getSelectStartDate(e.target.value),
                      applyMonth[1],
                    ]);
                    setDateRangeSt(e.target.value);
                  }}
                  onClick={(e) => {
                    e.target.showPicker();
                  }}
                  // max={hidden === "tms" || !hidden ? currentMonth : false}
                  max={
                    hidden === "lwd" ? dateRangeEd : dateRangeEd || currentMonth
                  }
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="end" className="fontWeight-600 color-000000">
                  End Date
                </label>
                <input
                  className="input-date-border input-pos ps-2 pointer-cur"
                  id="end"
                  type="date"
                  onChange={(e) => {
                    setApplyMonth([
                      applyMonth[0],
                      getSelectEndDate(e.target.value),
                    ]);
                    setDateRangeEd(e.target.value);
                  }}
                  onClick={(e) => {
                    e.target.showPicker();
                  }}
                  // max={
                  //   hidden === "tms" || !hidden
                  //     ? dateValue
                  //       ? getDateValue(dateValue)
                  //       : currentMonth
                  //     : false
                  // }
                  // max={dateValue? getDateValue(dateValue): currentMonth}
                  min={dateRangeSt}
                  max={hidden === "lwd" ? "" : currentMonth}
                  required
                />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col-6 text-end">
                <button className="border-0">
                  <span className="apply-pro-save-btn text-white py-1 px-4">
                    Apply
                  </span>
                </button>
              </div>
              <div className="col-6 text-start">
                <span
                  className="cancel-button px-3  py-1"
                  onClick={calenderClose}
                >
                  Cancel
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DateCalender;
