import React, { useEffect, useState } from "react";
import { getRequest } from "../../services";
import { getUserDetailsPage } from "../../constant/apiUrls";
import { DEFAULT_SELECTED_PAGE } from "../../constant";
import Loader from "../../components/loader";

import getSearchUsers, {
  getShortingData,
  getShortingDataUserDtl,
  setShortingIcon,
  setShortingIconUserDtl,
} from "../../helpers/sorting";
import getSearchingData from "../../helpers/searching";
import signoutPage from "../../helpers/signout";
import { useDispatch } from "react-redux";

function UserDetails(props) {
  const { setToken } = props;

  const dispatch = useDispatch();

  const [userDetailsPage, setUserDetailsPage] = useState({});

  const [selectedPage, setSelectedPage] = useState(DEFAULT_SELECTED_PAGE);
  const [selectEntries, setSelectEntries] = useState("1000");

  const [expandLessMore, setExpandLessMore] = useState(true);

  const [isShorting, setIsShorting] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const entries = ["25", "50", "100", "All"];

  const userDetailsHeading = [
    "Employee Id",
    "DOJ",
    "Pseudo Name",
    "Role",
    "Email",
    "First Login",
    "Status",
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = getSearchingData(userDetailsPage?.usrData, query, {
      nm: "usr",
      no: 0,
    });

    setFilteredData({
      ...userDetailsPage,
      usrData: filtered,
      count: filtered?.length,
    });

    setSearchTerm(e.target.value);
    setIsShorting(false);
  };

  const userFilterDetails = getSearchUsers(
    searchTerm,
    filteredData,
    userDetailsPage
  );


  const sortName = ["user_name", "DOJ", "display_name", "role", "email", "first_login", "status"];

  useEffect(() => {
    setIsLoading(true);
    getRequest(getUserDetailsPage(selectedPage, selectEntries))
      .then((res) => {
        setUserDetailsPage(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          signoutPage(setToken, dispatch);
        } else {
          console.log(error);
        }
      })
      .finally(() => setIsLoading(false));
  }, [selectedPage, selectEntries]);

  return (
    <>
      <div className="background-DCDFE4 p-3">
        <div className="background-FFFFFF min-height-69 px-4">
          <div className="main-heading color-2E3192 pt-3">USER DETAILS</div>

          <hr className="border-DDE8F1" />

          <div className="d-flex justify-content-between">
            <div>
              <label htmlFor="entries" className="date-no color-000000">
                Show
                <select
                  id="entries"
                  className="ps-1 mx-1"
                  onChange={(e) => {
                    setSelectEntries(
                      e.target.value === "All"
                        ? userDetailsPage?.count
                        : e.target.value
                    );
                  }}
                  value={
                    entries.includes(selectEntries) ? selectEntries : "All"
                  }
                >
                  {entries.map((entry, ind) => (
                    <option key={ind} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>
                Entries
              </label>
            </div>

            <div>
              <label
                htmlFor="entries"
                className="heading-home color-000000 me-2"
              >
                Search:
              </label>
              <input type="text" onChange={handleSearch} value={searchTerm} />
            </div>
          </div>

          <div className="pb-3">
            <table className="width-100 mt-4">
              <tr className="background-EEF3F8">
                {userDetailsHeading.map((userDetail, ind) => (
                  <th
                    className={`text-center py-1 ${ind > 1 && ind < 5 && "pointer-cur"
                      }`}
                    key={ind}
                    onClick={() => {
                      getShortingData(
                        ind,
                        setIsShorting,
                        setExpandLessMore,
                        userFilterDetails,
                        expandLessMore,
                        setUserDetailsPage,
                        setFilteredData,
                        searchTerm,
                        sortName[ind],
                        true
                      );
                    }}
                  >
                    {userDetail}
                    {setShortingIcon(ind + 1, isShorting, expandLessMore)}
                  </th>
                ))}
              </tr>

              {userFilterDetails?.usrData?.map((details, ind) => (

                <tr key={ind}>

                  <td className="text-center py-1">{details.user_name}</td>

                  <td className="text-center py-1">
                    {details.DOJ ? new Date(details.DOJ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }) : ''}
                  </td>

                  <td className="text-center py-1">{details.display_name}</td>

                  <td className="text-center py-1">{details.role}</td>

                  <td className="text-center py-1">{details.email}</td>

                  <td className="text-center py-1">{details.first_login}</td>

                  <td className={`text-center py-1  ${details.status === "Active" ? "approve_btn" : "reject_btn1"}`}>
                    {details.status}
                  </td>

                </tr>

              ))}
            </table>
          </div>
        </div>
      </div>
      <Loader open={isLoading} size={70} />
    </>
  );
}

export default UserDetails;
