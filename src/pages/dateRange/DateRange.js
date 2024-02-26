import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { showDate } from "../../formatter/date";

const DateRange = (props) => {
  const {
    showDatePicker,
    handleClose,
    onChange,
    setStartEndDate,
    applyMonth,
    number,
  } = props;

  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };

  return (
    <Popover
      open={showDatePicker}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <DateRangePicker
        onChange={handleOnChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        shownDate={new Date(showDate(number))}
        months={2}
        ranges={state}
        color="#3d91ff"
        direction="horizontal"
      />

      <div className="mb-3 text-center">
        <button
          className="background-2E3192 border-button text-white col-2 col-md-1"
          onClick={() => {
            setStartEndDate(applyMonth);
            handleClose();
          }}
        >
          Apply
        </button>
        <button
          className="border-button color-2E3192 ms-5 col-2 col-md-1 "
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Popover>
  );
};

// DateRange.propTypes = {
//   onChange: PropTypes.func,
// };

export default DateRange;
