import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableModal from "../../components/tablemodal";
import { API_URL, getJiraTimesUrl } from "../../constant/apiUrls";
import { getRequest } from "../../services";
import Loader from "../../components/loader";
import UserWorklog from "../../components/userWorklog";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";
import { deleteCookies } from "../../helpers/cookies";
import {
  endDateMonth,
  getStEdDate,
  startDateMonth,
} from "../../formatter/date";
import moment from "moment";
import { getCalender } from "../../helpers/calender";
import signoutPage from "../../helpers/signout";

function Home(props) {
  const { opensnackbar, handleClose, setToken } = props;

  const dispatch = useDispatch();

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
      getJiraTimesUrl(
        API_URL.JIRATIMESHEET,
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

    // after 24 hours so automatic logout

    const timer = setTimeout(deleteCookies, 24 * 60 * 60 * 1000);

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, [getStEdDate(startEndDate[1])]);

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
      <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
    </>
  );
}

export default Home;
