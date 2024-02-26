import React, { useEffect } from "react";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { getRequest, postRequest } from "../../services";
import {
  API_URL,
  createOrEditGroupKnbUrl,
  getUserList,
} from "../../constant/apiUrls";
import { useState } from "react";
import TextEditor from "../knowledgeDashAndTable/TextEditor";
import { isEmpty } from "lodash";
import signoutPage from "../../helpers/signout";

const folderKnowledegeHead = [
  "Sr. No.",
  "Category Name",
  "Group Name",
  "Show To",
  // "Action",
];

const FolderKnowledge = (props) => {
  const { setIsLoading, showDocs, setSnackbarOpen, setIsAccess } = props;

  const [userDetailsPage, setUserDetailsPage] = useState({});
  const [folderWiseData, setFolderWiseData] = useState([]);

  const [getTitle, setGetTitle] = useState("");

  const [getShowTo, setGetShowTo] = useState([]);

  const [getAccess, setGetAccess] = useState([]);

  const [editorOpen, setEditorOpen] = useState(false);
  const [updatedId, setUpdatedId] = useState();

  const empList = userDetailsPage?.data?.map((cv, ind) => ({
    value: cv?.display_name,
    label: cv?.display_name,
    id: cv?.user_key,
  }));

  const getDisEmpName = (userId) =>
    empList?.find((emp) => emp?.id == userId)?.value;

    // for further used

  // const handleEditorOpen = (editParam) => (e) => {
  //   if (!!editParam) {
  //     const { id, title, knowledge, userAccess } = editParam;

  //     setGetTitle(title);

  //     setGetShowTo([{ value: knowledge, label: knowledge }]);

  //     setGetAccess([
  //       {
  //         value: getDisEmpName(userAccess),
  //         label: getDisEmpName(userAccess),
  //         id: userAccess,
  //       },
  //     ]);

  //     setUpdatedId(id);
  //   }

  //   setEditorOpen(true);
  //   e.preventDefault();
  // };

  const handleDialogClose = () => {
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

  const createGroupRequestPayload = {
    ...(updatedId ? { id: updatedId } : {}),

    title: getTitle,
    show_to_groups: JSON.stringify(getShowTo?.map((cv) => cv.value)),
    show_to_users: JSON.stringify(getAccess?.map((cv) => cv.id)),
  };

  async function getUserFolderKnowbase(bool) {
    setIsLoading(true);
    try {
      if (!!bool) {
        const userlist = await getRequest(getUserList(0, 1000));
        setUserDetailsPage(userlist.data);
      }
      const knowlist = await getRequest(API_URL.SHOWUSER_WISE_FOLDER);

      setFolderWiseData(knowlist.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
      } else {
        setSnackbarOpen({
          setopen: true,
          message: error.msg,
          severity: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const createOrEditGroupKnowledege = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postRequest(createOrEditGroupKnbUrl(!!updatedId), createGroupRequestPayload)
      .then((res) => {
        getUserFolderKnowbase();
        setSnackbarOpen({
          setopen: true,
          message: !!updatedId ? res.data : "KnowledgeBase Data created....",
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
        if (!!updatedId) {
          setUpdatedId(); ///for clear id
        }
        setIsLoading(false);
      });
    setEditorOpen(false);
  };

  const getGroupName = (name) => JSON.parse(name || "[]")?.filter(Boolean)[0];

  useEffect(() => {
    getUserFolderKnowbase(true);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="main-heading color-2E3192 pt-3 pointer-cur">
          Folder Knowlege Base
        </div>
      </div>
      <hr className="border-DDE8F1" />
      <table className="width-100 mt-4">
        <tr className="background-EEF3F8">
          {folderKnowledegeHead.map((userDetail, ind) => (
            <th
              className={`text-center p-1 ${
                ind === 0 ? "width-80" : "width-200"
              }`}
              key={ind}
            >
              {userDetail}
            </th>
          ))}
        </tr>

        {folderWiseData?.map((know, ind) => (
          <tr
            key={ind}
            className="pointer-cur"
            onClick={() => {
              showDocs({ bool: true, id: know.id, access: know.is_edit });
            }}
          >
            <td className="text-center py-1">{ind + 1}</td>

            <td className="text-center py-1"> {know.title}</td>

            <td className="text-center py-1" key={ind}>
              {getGroupName(know?.groups)}
              {getGroupName(know?.groups)?.length &&
                getGroupName(know?.users)?.length &&
                ","}
              {getDisEmpName(getGroupName(know?.users))}
              
             

              {/* {JSON.parse(know?.groups || "[]")?.filter(Boolean)[0]}
              {JSON.parse(know?.groups || "[]")?.filter(Boolean)[0]?.length &&
                JSON.parse(know?.users || "[]")?.filter(Boolean)[0]?.length &&
                ","}
              {JSON.parse(know?.users || "[]")?.filter(Boolean)[0]} */}
            </td>

            <td className="text-center py-1">
              <span className="cancel-button px-3 ">View</span>
            </td>
          </tr>
        ))}
      </table>
      <TextEditor
        editorOpen={editorOpen}
        handleDialogClose={handleDialogClose}
        createOrEditKnowledgeBase={createOrEditGroupKnowledege}
        primaryLabel="Update"
        getTitle={getTitle}
        setGetTitle={setGetTitle}
        getShowTo={getShowTo}
        setGetShowTo={setGetShowTo}
        getAccess={getAccess}
        setGetAccess={setGetAccess}
        sltOption1={empList}
        isCategory
      />
    </>
  );
};

export default FolderKnowledge;
