import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const keyName = (bool) => (bool ? "usrData" : "data");

const sortingByName = (
  name,
  userDetailsPage,
  expandLessMore,
  setUserDetailsPage,
  setFilteredData,
  searchTerm,
  bool
) => {
  const sortByEmail = userDetailsPage?.[keyName(bool)]?.sort((a, b) =>
    expandLessMore
      ? b?.[name]?a?.[name]?.localeCompare(b?.[name]):-1
      : a?.[name]?b?.[name]?.localeCompare(a?.[name]):-1
  );

  searchTerm
    ? setFilteredData({
        ...userDetailsPage,
        [keyName(bool)]: sortByEmail,
      })
    : setUserDetailsPage({
        ...userDetailsPage,
        [keyName(bool)]: sortByEmail,
      });
};

export const getShortingData = (
  ind,
  setIsShorting,
  setExpandLessMore,
  userDetailsPage,
  expandLessMore,
  setUserDetailsPage,
  setFilteredData,
  searchTerm,
  sortName,
  bool
) => {
  setIsShorting(ind);

  setExpandLessMore(!expandLessMore);

  sortingByName(
    sortName,
    userDetailsPage,
    expandLessMore,
    setUserDetailsPage,
    setFilteredData,
    searchTerm,
    bool
  );
};

const accending = (x, y, sortKey) => x?.[sortKey]?.localeCompare(y?.[sortKey]);

export const sortingDataByDateAndId = (
  list,
  setFilteredData,
  setOneUserWFHLeaveList,
  isShorting,
  searchTerm,
  sortKey
) => {
  const data = list?.data?.sort((a, b) =>
    isShorting ? accending(b, a, sortKey) : accending(a, b, sortKey)
  );
  searchTerm
    ? setFilteredData({ ...list, data })
    : setOneUserWFHLeaveList({ ...list, data });

  // setIsShorting(!isShorting);
};

export const sortingIcon = (isExpand, isShorting) =>
  isExpand ? (
    isShorting ? (
      <ExpandLessIcon />
    ) : (
      <ExpandMoreIcon />
    )
  ) : (
    <UnfoldMoreIcon />
  );

//here code refactor

export const setShortingIcon = (ind, isShorting, expandLessMore, els) =>
  ind &&
  (ind === isShorting ? (
    expandLessMore ? (
      <ExpandMoreIcon className={!!els ? "" : "float-end"} />
    ) : (
      <ExpandLessIcon className={!!els ? "" : "float-end"} />
    )
  ) : (
    <UnfoldMoreIcon className={!!els ? "" : "float-end"} />
  ));

const getSearchUsers = (isFilter, filteredUser, defaultGetUsers) =>
  isFilter ? filteredUser : defaultGetUsers;

export default getSearchUsers;
