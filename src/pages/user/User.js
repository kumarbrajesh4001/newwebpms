import React, { useEffect, useState } from "react";
import Loader from "../../components/loader";
import TableModal from "../../components/tablemodal";
import UserWorklog from "../../components/userWorklog";
import { getSelectUsersData } from "../../constant/apiUrls";
import { getRequest } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../helpers/localStorage";
import STORAGE_KEY from "../../constant/storageKey";
import {
  endDateMonth,
  getStEdDate,
  startDateMonth,
} from "../../formatter/date";
import moment from "moment";
import { getCalender } from "../../helpers/calender";
import signoutPage from "../../helpers/signout";

const User = (props) => {
  const { setToken } = props;

  const dispatch = useDispatch();

  const userId = useSelector(({ userInfoReducer }) => userInfoReducer?.userKey);

  const { id_A } = getDataFromLocalStorage(STORAGE_KEY.USER_DATA);

  const [jiraTimeSheet, setjiraTimeSheet] = useState({});

  let [number, setNumber] = useState(0);
  const [startEndDate, setStartEndDate] = useState([
    startDateMonth(number),
    endDateMonth(number),
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [tableModal, setTableModal] = useState(false);

  const [userLogs, setUserLogs] = useState([]);

  const tableModalClose = () => setTableModal(false);

  const calenderDate = getCalender(startEndDate);

  useEffect(() => {
    setIsLoading(true);
    getRequest(
      getSelectUsersData(
        userId ? userId : id_A,
        getStEdDate(startEndDate[0]),
        getStEdDate(startEndDate[1])
      )
    )
      .then((res) => {
        setjiraTimeSheet(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          signoutPage(setToken, dispatch);
        } else {
          console.log(error);
        }
      })
      .finally(() => setIsLoading(false));
  }, [userId, getStEdDate(startEndDate[1])]);

  return (
    <>
      <div className="background-DCDFE4 p-3">
        <UserWorklog
          jiraTimeSheet={jiraTimeSheet}
          setUserLogs={setUserLogs}
          setTableModal={setTableModal}
          number={number}
          setNumber={setNumber}
          startEndDate={startEndDate}
          setStartEndDate={setStartEndDate}
          calenderDate={calenderDate}
        />
      </div>
      <TableModal
        tableModal={tableModal}
        tableModalClose={tableModalClose}
        userLogs={userLogs}
        isUser={true}
      />
      <Loader open={isLoading} size={70} />
    </>
  );
};

export default User;
