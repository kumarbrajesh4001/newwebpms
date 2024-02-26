import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import todo from "../../assets/to-do.png";
import { getRequest, postRequest } from "../../services";
import DeleteKnowledgeModalView from "../holidayKnowledgeModalView";
import {
  API_URL,
  createOrEditGroupKnbUrl,
  getGroupWiseUrl,
  getUserList,
} from "../../constant/apiUrls";
import TextEditor from "./TextEditor";

const KnowledegeHead = [
  "S.No.",
  "Category Name",
  "View access ",
  "Edit access",
  // "Show To",
  "Action",
];

const KnowledgeDashb = (props) => {
  const { setIsLoading, setSnackbarOpen, showGroupWiseKnowledge } = props;

  const [knowledgeList, setKnowledgeList] = useState({});

  const [editorOpen, setEditorOpen] = useState(false);

  const [userDetailsPage, setUserDetailsPage] = useState({});

  const [getTitle, setGetTitle] = useState("");

  const [getShowTo, setGetShowTo] = useState([]);

  const [getAccess, setGetAccess] = useState([]);

  const [updatedId, setUpdatedId] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteKnowledgeData, setDeleteKnowledgeData] = useState(false);

  const empList = userDetailsPage?.data?.map((cv, ind) => ({
    value: cv?.display_name,
    label: cv?.display_name,
    id: cv?.user_key,
  }));

  const createGroupRequestPayload = {
    ...(updatedId ? { id: updatedId } : {}),
    title: getTitle,
    show_to_groups: JSON.stringify(
      getShowTo?.map((cv) => !cv.id && cv.value).filter(Boolean)
    ),
    show_to_users: JSON.stringify(
      getShowTo?.map((cv) => !!cv.id && cv.id).filter(Boolean)
    ),

    access_to_groups: JSON.stringify(
      getAccess?.map((cv) => !cv.id && cv.value).filter(Boolean)
    ),
    access_to_users: JSON.stringify(
      getAccess?.map((cv) => !!cv.id && cv.id).filter(Boolean)
    ),
  };

  const getUserName = (id) =>
    userDetailsPage?.data?.find((cv) => cv.user_key === id)?.display_name;

  const getGroupsUsers = (group, user, bool) => [
    ...group?.filter((cv) => (bool ? cv?.is_edit : !cv?.is_edit)),
    ...user
      ?.map(
        (cv) =>
          (bool ? cv?.is_edit : !cv?.is_edit) && {
            groups: getUserName(cv.users),
          }
      )
      .filter(Boolean),
  ];

  const getDisEmpName = (userId) =>
    empList.find((emp) => emp.id == userId).value;

  const handleEditorOpen = (editParam) => (e) => {
    if (!!editParam) {
      const { id, title, knowledge, userAccess } = editParam;

      setGetTitle(title);

      setGetShowTo([
        ...knowledge
          ?.map((cv) => !cv.is_edit && { value: cv?.groups, label: cv?.groups })
          .filter(Boolean),
        ...userAccess
          ?.map(
            (cv) =>
              !cv.is_edit && {
                value: getDisEmpName(cv?.users),
                label: getDisEmpName(cv?.users),
                id: cv?.users,
              }
          )
          .filter(Boolean),
      ]);

      setGetAccess([
        ...knowledge
          ?.map((cv) => cv.is_edit && { value: cv?.groups, label: cv?.groups })
          .filter(Boolean),
        ...userAccess
          ?.map(
            (cv) =>
              cv.is_edit && {
                value: getDisEmpName(cv?.users),
                label: getDisEmpName(cv?.users),
                id: cv?.users,
              }
          )
          .filter(Boolean),
      ]);

      setUpdatedId(id);
    }

    setEditorOpen(true);
    e.preventDefault();
  };

  const handleDialogClose = () => {
    setDeleteOpen(false);
    setEditorOpen(false);
    if (getTitle || getShowTo.length || getAccess.length) {
      setGetTitle("");
      setGetShowTo([]);
      setGetAccess([]);
      if (!!updatedId) {
        setUpdatedId(); ///for clear id
      }
    }
  };

  const getAllGroupFolderKnowbase = () => {
    setIsLoading(true);
    getRequest(API_URL.KNOW_ALL_FOLDER)
      .then((res) => {
        setKnowledgeList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const viewDeleteDocsKnowledge = (id) => {
    setIsLoading(true);
    postRequest(API_URL.DELETE_FOLDER_KNOWLEDGE, { id })
      .then((res) => {
        getAllGroupFolderKnowbase();
        setDeleteKnowledgeData(false);

        setSnackbarOpen({
          setopen: true,
          message: "Folder deleted successfully",
          severity: "error",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        setSnackbarOpen({
          setopen: true,
          message: err.msg,
          severity: "error",
        });
      });
  };

  const deleteKnowledgeBase = () => {
    viewDeleteDocsKnowledge(deleteKnowledgeData);
  };

  const createOrEditGroupKnowledege = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postRequest(createOrEditGroupKnbUrl(!!updatedId), createGroupRequestPayload)
      .then((res) => {
        getAllGroupFolderKnowbase();
        setSnackbarOpen({
          setopen: true,
          message: !!updatedId ? res.data : "Folder created successfully",
          severity: "success",
        });
      })
      .catch((error) => {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: "error",
        });
      })
      .finally(() => {
        setGetTitle("");
        setGetShowTo([]);
        setGetAccess([]);
        if (updatedId) {
          setUpdatedId(); ///for clear id
        }
        setIsLoading(false);
      });
    setEditorOpen(false);
  };

  // for get all user list for select show

  const openDeleteModal = (deleteParam) => () => {
    setDeleteOpen(true);
    setDeleteKnowledgeData(deleteParam);
  };

  const getEmployeeList = () => {
    setIsLoading(true);
    getRequest(getUserList(0, 1000))
      .then((res) => {
        setUserDetailsPage(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getEmployeeList();
    getAllGroupFolderKnowbase();
  }, []);

  const commonClass =
    "col-4 d-flex justify-content-around align-items-center section-background-shadow-radius hr-section-height pointer-cur";

  return (
    <>
      <div className="d-flex justify-content-end me-3">
        <span
          className="cancel-button px-3 py-1 align-self-center"
          onClick={handleEditorOpen()}
        >
          <CreateNewFolderIcon className="me-1" />
          Add Folder
        </span>
      </div>

      <table className="width-100 mt-4">
        <tr className="background-EEF3F8">
          {KnowledegeHead?.map((userDetail, ind) => (
            <th
              className={`text-center p-1 ${
                (ind === 1 || ind === 4) && "width-28"
              } ${(ind === 2 || ind === 3) && "width-23"}`}
              key={ind}
            >
              {userDetail}
            </th>
          ))}
        </tr>

        {knowledgeList?.data?.map((know, ind) => (
          <tr
            key={ind}
            className="pointer-cur"
            onClick={showGroupWiseKnowledge({ title: know.title, id: know.id })}
          >
            <td className="text-center py-1">{ind + 1}</td>

            <td className="text-center py-1"> {know.title}</td>
            <td className="text-center py-1">
              {/* {console.log(getGroupsUsers(
                know?.knowledgeBase_folder_groups,
                know?.knowledgeBase_folder_users,
                false
              ))} */}

              {getGroupsUsers(
                know?.knowledgeBase_folder_groups,
                know?.knowledgeBase_folder_users,
                false
              ).map((cv, ind, arr) => (
                <div key={ind}>
                  {cv.groups}
                  {ind < arr.length - 1 && ","} &nbsp;
                </div>
              ))}
            </td>

            <td className="text-center py-1">
              {getGroupsUsers(
                know?.knowledgeBase_folder_groups,
                know?.knowledgeBase_folder_users,
                true
              ).map((cv, ind, arr) => (
                <div key={ind}>
                  {cv.groups}
                  {ind < arr.length - 1 && ","} &nbsp;
                </div>
              ))}
            </td>

            {/* <td className="text-center py-1">
              <span className="cancel-button px-3 ">View</span>
            </td> */}

            <td
              className="text-center py-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span
                className="cancel-button px-3 "
                onClick={showGroupWiseKnowledge({
                  title: know.title,
                  id: know.id,
                })}
              >
                View
              </span>
              <span
                className="cancel-button px-3 mx-3"
                onClick={handleEditorOpen({
                  id: know?.id,

                  title: know?.title,

                  knowledge: know.knowledgeBase_folder_groups,
                  userAccess: know.knowledgeBase_folder_users,
                })}
              >
                Edit
              </span>
              <span
                className="cancel-button px-2"
                onClick={openDeleteModal(know.id)}
              >
                Delete
              </span>
            </td>
          </tr>
        ))}
      </table>

      <TextEditor
        editorOpen={editorOpen}
        handleDialogClose={handleDialogClose}
        createOrEditKnowledgeBase={createOrEditGroupKnowledege}
        primaryLabel={!!updatedId ? "Update" : "Submit"}
        getTitle={getTitle}
        setGetTitle={setGetTitle}
        getShowTo={getShowTo}
        setGetShowTo={setGetShowTo}
        getAccess={getAccess}
        setGetAccess={setGetAccess}
        sltOption1={empList}
        isCategory
      />

      <DeleteKnowledgeModalView
        modalOpne={deleteOpen}
        handleDialogClose={handleDialogClose}
        title="Are you sure you want to delete this folder?"
        secondaryLabel="Cancel"
        primaryLabel="Delete"
        getHoliListOrDeleteDocs={deleteKnowledgeBase}
      />

      {/* <div className="d-flex justify-content-around mx-3">
          <div className={commonClass} onClick={showGroupWiseKnowledge("All")}>
            <div>
              <img src={todo} alt="leave" />
            </div>
            <div>
              <div className="hr-secHeading ">All</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knowledgeList?.allCount}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("AIS HR")}
          >
            <div>
              <img src={todo} alt="AIS HR" />
            </div>
            <div>
              <div className="hr-secHeading">AIS HR</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["AIS HR"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5">
          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Ais Sales Inbound")}
          >
            <div>
              <img src={todo} alt="Ais Sales Inbound" />
            </div>
            <div>
              <div className="hr-secHeading">Ais Sales Inbound</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Ais Sales Inbound"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`${commonClass} ps-3 pe-1`}
            onClick={showGroupWiseKnowledge("Ais Sales Outreach")}
          >
            <div>
              <img src={todo} alt="Ais Sales Outreach" />
            </div>

            <div>
              <div className="hr-secHeading">Ais Sales Outreach</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Ais Sales Outreach"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5">
          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Ais Sales Portal")}
          >
            <div>
              <img src={todo} alt="Ais Sales Portal" />
            </div>
            <div>
              <div className="hr-secHeading">Ais Sales Portal</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Ais Sales Portal"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("AIS Sales")}
          >
            <div>
              <img src={todo} alt="AIS Sales" />
            </div>
            <div>
              <div className="hr-secHeading">AIS Sales</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["AIS Sales"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5">
          <div
            className={`${commonClass} ps-3 pe-1`}
            onClick={showGroupWiseKnowledge("Alliance Delivery")}
          >
            <div>
              <img src={todo} alt="Alliance Delivery" />
            </div>

            <div>
              <div className="hr-secHeading">Alliance Delivery</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Alliance Delivery"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Alliance Franchise")}
          >
            <div>
              <img src={todo} alt="Alliance Franchise" />
            </div>
            <div>
              <div className="hr-secHeading">Alliance Franchise</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Alliance Franchise"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5">
          <div
            className={`${commonClass} ps-3 pe-1`}
            onClick={showGroupWiseKnowledge("Alliance HR")}
          >
            <div>
              <img src={todo} alt="Alliance HR" />
            </div>

            <div>
              <div className="hr-secHeading">Alliance HR</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Alliance HR"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Alliance Operations")}
          >
            <div>
              <img src={todo} alt="Alliance Operations" />
            </div>
            <div>
              <div className="hr-secHeading">Alliance Operations</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Alliance Operations"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5">
          <div
            className={`${commonClass} ps-3 pe-1`}
            onClick={showGroupWiseKnowledge("Alliance Sales")}
          >
            <div>
              <img src={todo} alt="Alliance Sales" />
            </div>

            <div>
              <div className="hr-secHeading">Alliance Sales</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Alliance Sales"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div className={commonClass} onClick={showGroupWiseKnowledge("BA")}>
            <div>
              <img src={todo} alt="BA" />
            </div>
            <div>
              <div className="hr-secHeading">BA</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["BA"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5 mb-2">
          <div
            className={`${commonClass} ps-3 pe-1`}
            onClick={showGroupWiseKnowledge("Design")}
          >
            <div>
              <img src={todo} alt="Design" />
            </div>

            <div>
              <div className="hr-secHeading">Design</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Design"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div className={commonClass} onClick={showGroupWiseKnowledge("HTML")}>
            <div>
              <img src={todo} alt="HTML" />
            </div>
            <div>
              <div className="hr-secHeading">HTML</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["HTML"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5 mb-2">
          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Laravel")}
          >
            <div>
              <img src={todo} alt="Laravel" />
            </div>
            <div>
              <div className="hr-secHeading">Laravel</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Laravel"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Mobile")}
          >
            <div>
              <img src={todo} alt="Mobile" />
            </div>
            <div>
              <div className="hr-secHeading">Mobile</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Mobile"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around mx-3 mt-5 mb-2">
          <div className={commonClass} onClick={showGroupWiseKnowledge("Node")}>
            <div>
              <img src={todo} alt="Node" />
            </div>
            <div>
              <div className="hr-secHeading">Node</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["NODE"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div className={commonClass} onClick={showGroupWiseKnowledge("PM")}>
            <div>
              <img src={todo} alt="PM" />
            </div>
            <div>
              <div className="hr-secHeading">PM</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["PM"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5 mb-2">
          <div className={commonClass} onClick={showGroupWiseKnowledge("QA")}>
            <div>
              <img src={todo} alt="QA" />
            </div>
            <div>
              <div className="hr-secHeading">QA</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["QA"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("React JS")}
          >
            <div>
              <img src={todo} alt="React JS" />
            </div>
            <div>
              <div className="hr-secHeading">React JS</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["React JS"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5 mb-2">
          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("React Native")}
          >
            <div>
              <img src={todo} alt="React Native" />
            </div>
            <div>
              <div className="hr-secHeading">React Native</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["React Native"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div className={commonClass} onClick={showGroupWiseKnowledge("Seo")}>
            <div>
              <img src={todo} alt="Seo" />
            </div>
            <div>
              <div className="hr-secHeading">Seo</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Seo"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around mx-3 mt-5 mb-2">
          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Unity")}
          >
            <div>
              <img src={todo} alt="Unity" />
            </div>
            <div>
              <div className="hr-secHeading">Unity</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Unity"] || "0"}
                </span>
              </div>
            </div>
          </div>

          <div
            className={commonClass}
            onClick={showGroupWiseKnowledge("Wordpress")}
          >
            <div>
              <img src={todo} alt="Wordpress" />
            </div>
            <div>
              <div className="hr-secHeading">Wordpress</div>
              <div>
                <span className="hr-secNo color-000000">
                  Total no. of documents:
                </span>
                <span className="hr-secNo color-686868 ms-1">
                  {knwCount?.["Wordpress"] || "0"}
                </span>
              </div>
            </div>
          </div>
        </div> */}
    </>
  );
};

export default KnowledgeDashb;
