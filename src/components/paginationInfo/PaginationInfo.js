import React from "react";
import { PAGINATION_ROWS } from "../../constant";

const PaginationInfo = (props) => {
  const { selectedPage, currentPageCount, totalCount } = props;
  return (
    <span className="hr-secTxt mt-1">{`${
      1 + (selectedPage + 1 - 1) * PAGINATION_ROWS
    } of ${
      1 + (selectedPage + 1 - 1) * PAGINATION_ROWS + currentPageCount - 1
    } pages (${totalCount} items)`}</span>
  );
};

export default PaginationInfo;
