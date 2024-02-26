import React, { useState, useEffect } from "react";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
// import Popover from "@mui/material/Popover";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FilePresentIcon from "@mui/icons-material/FilePresent";
// import ViewKnowledgeDialog from "../../../components/knowledegeDialog";
// import DeleteKnowledgeModalView from "../../../components/holidayKnowledgeModalView";
import DeleteKnowledgeModalView from "../holidayKnowledgeModalView";
import TextEditor from "./TextEditor";
import { getRequest, postMultiRequest, postRequest } from "../../services";
import {
  API_URL,
  createKnowledgeOrEditUrl,
  getGroupWiseUrl,
  viewOrDeleteKnowledgeUrl,
} from "../../constant/apiUrls";

// import Loader from "../../loader";
// import ShowTo from "./ShowTo";

import getSearchingData from "../../helpers/searching";
import getSearchUsers from "../../helpers/sorting";
import { handleViewerOpen } from "../../helpers/knowledgeView";
import SearchBar from "./SearchBar";
import fetchImage from "../../helpers/viewDocs";

const KnowledgeTabled = (props) => {
  const {
    setIsLoading,
    setSnackbarOpen,
    showGroupWiseKnowledge,
    knowledgeDash,
  } = props;

  const KnowledegeHead = [
    "Sr. No.",
    "Document Name",

    "Attachment",
    // "Document Link",
    "Action",
  ];

  const statuses = ["All", "Active", "Inactive"];

  const [knowledgelist, setKnowledgeList] = useState({});

  const [userknowledgeList, setUserKnowledgeList] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [editorOpen, setEditorOpen] = useState(false);

  const [viewerOpen, setViewerOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [viewKnowledgeData, setViewKnowledgeData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  ////here to code refactor bcz 4 state use ho rhe h

  const [getTitle, setGetTitle] = useState("");

  // const [getShowTo, setGetShowTo] = useState([]);

  const [getDiscription, setGetDiscription] = useState("");

  const [getFile, setGetFile] = useState(null); ///// koi ek function banake code short ho jaye//

  const [fileAttechments, setFileAttechments] = useState();

  const [updatedId, setUpdatedId] = useState();

  const [deleteKnowledgeData, setDeleteKnowledgeData] = useState(false);

  const formData = new FormData();

  if (!!updatedId) {
    formData.append("id", updatedId);
  }

  formData.append("title", getTitle);
  // formData.append("show_to", JSON.stringify(getShowTo?.map((cv) => cv.value)));
  formData.append("discription", getDiscription);

  formData.append("attechments", getFile);

  const handleSearch = (e) => {
    const value = e.target.value;

    const query = value.toLowerCase();

    const filtered = knowledgelist?.data?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(query) ||
        item?.knowledge
          ?.find((cv) => cv?.groups.toLowerCase() === query)
          ?.groups.toLowerCase() === query
    );

    setFilteredData(filtered);

    setSearchTerm(value);
    // setIsShorting(false);
  };

  const getKnowledgeList = getSearchUsers(
    searchTerm,
    filteredData,
    knowledgeDash === "All" ? knowledgelist?.data : userknowledgeList
  );

  const handleEditorOpen = (editParam) => () => {
    if (!!editParam) {
      const { id, title, discription, attechments } = editParam;

      setGetTitle(title);

      // setGetShowTo(
      //   knowledge.map((cv) => ({ value: cv.groups, label: cv.groups }))
      // );
      setGetDiscription(discription);
      setUpdatedId(id);

      setFileAttechments(attechments);
    }

    setEditorOpen(true);
  };

  const openDeleteModal = (deleteParam) => () => {
    setDeleteOpen(true);
    setDeleteKnowledgeData(deleteParam);
  };

  const handleDialogClose = () => {
    setEditorOpen(false);
    setDeleteOpen(false);
    setViewerOpen(false);

    ///// ho ske to in sbki ek state se kam chl jaye

    if (getTitle || getFile) {
      setGetTitle("");
      // setGetShowTo([]);
      setGetDiscription("");
      setGetFile(null);
      if (updatedId) {
        setUpdatedId(); ///for clear id
      }
    }
  };

  // ?folder_id=${knowledgeDash.id}

  const allKnowledgeBaseData = () => {
    setIsLoading(true);
    // getRequest(getGroupWiseUrl(knowledgeDash.title))  ///when use All folder then it's uses
    getRequest(
      `${API_URL.SHOW_GROUPWISE_KNOWLEDGEBASE}?folder_id=${knowledgeDash.id}`
    )
      .then((res) => {
        if (knowledgeDash === "All") {
          setKnowledgeList(res?.data);
        } else {
          setUserKnowledgeList(res?.data);
        }
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
    postRequest(API_URL.DELETE_KNOWLEDGEBASE, { id })
      .then((res) => {
        allKnowledgeBaseData();
        setDeleteKnowledgeData(false);

        setSnackbarOpen({
          setopen: true,
          message: "Document deleted successfully",
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

  const createOrEditKnowledgeBase = (e) => {
    e.preventDefault();

    setIsLoading(true);
    postMultiRequest(
      !!updatedId
        ? API_URL.EDIT_KNOWLEDGEBASE
        : `${API_URL.CREATE_KNOWLEDGEBASE}?id=${knowledgeDash.id}`,
      formData
    )
      .then((res) => {
        allKnowledgeBaseData();

        setSnackbarOpen({
          setopen: true,
          message: !!updatedId ? res.data : "Document created successfully",
          severity: "success",
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setSnackbarOpen({
          setopen: true,
          message: err.msg,
          severity: "error",
        });
      })
      .finally(() => {
        setGetTitle("");
        // setGetShowTo([]);
        setGetDiscription(""); ///// ho ske to in sbki ek state se kam chl jaye
        setGetFile(null);
        if (updatedId) {
          setUpdatedId(); ///for clear id
        }
      });

    setEditorOpen(false);
  };

  useEffect(() => {
    allKnowledgeBaseData();
  }, []);

  return (
    <>
      <span
        className="main-heading color-2E3192 pointer-cur ms-3"
        id="qw"
        onClick={showGroupWiseKnowledge(false)}
      >
        {knowledgeDash.title} Knowledge Base
      </span>

      <div className="d-flex justify-content-between mx-3 mt-3">
        <SearchBar
          handleSearch={handleSearch}
          statuses={statuses} ///here no need further remove after check
          searchTerm={searchTerm}
        />

        <span
          className="cancel-button px-3 py-1 align-self-center"
          onClick={handleEditorOpen()}
        >
          <CreateNewFolderIcon className="me-1" />
          Create Docs
        </span>

        <button
          className={`apply-pro-save-btn px-4 py-1 text-white`}
          onClick={showGroupWiseKnowledge(false)}
        >
          Back
        </button>
      </div>
      <hr className="border-DDE8F1" />

      <table className="width-100 mt-4">
        <tr className="background-EEF3F8">
          {KnowledegeHead.map((userDetail, ind) => (
            <th
              className={`text-center p-1 ${ind === 0 && "width-80"} ${
                ind === 1 && "width-400"
              }`}
              key={ind}
            >
              {userDetail}
            </th>
          ))}
        </tr>

        {getKnowledgeList?.map((know, ind) => (
          <tr key={ind}>
            <td className="text-center py-1">{ind + 1}</td>
            <td className="text-center py-1">{know?.title}</td>

            <td
              className={`text-center py-1  ${
                know?.attechments ? "color-2E3192 pointer-cur" : "color-BDBDBD"
              } `}
              onClick={() => {
                know?.attechments &&
                  fetchImage(
                    `/fileAccess?attechments=${know?.attechments}`,
                    setIsLoading
                  );
              }}
            >
              <FilePresentIcon />
              {know?.attechments || "No Attachment Included"}
            </td>
            {/* <td className="text-center py-1">
              <span
                className="cancel-button px-3 "
                onClick={handleViewerOpen({
                  open: true,
                  id: know.id,
                })}
              >
                View
              </span>
            </td> */}
            <td className="text-center py-1">
              <span
                className="cancel-button px-3 "
                onClick={handleViewerOpen({
                  open: true,
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

                  discription: know.discription,

                  // knowledge:know.knowledge

                  attechments: know?.attechments,
                })}
              >
                Edit
              </span>
              <span
                className="cancel-button px-2 "
                onClick={openDeleteModal(know.id)}
              >
                Delete
              </span>
            </td>
            {/* <td className="text-center py-1">
              <ShowTo />
            </td> */}
          </tr>
        ))}
      </table>

      <TextEditor
        editorOpen={editorOpen}
        handleDialogClose={handleDialogClose}
        createOrEditKnowledgeBase={createOrEditKnowledgeBase}
        primaryLabel={!!updatedId ? "Update" : "Submit"}
        getTitle={getTitle}
        setGetTitle={setGetTitle}
        // getShowTo={getShowTo}
        // setGetShowTo={setGetShowTo}
        getDiscription={getDiscription}
        setGetDiscription={setGetDiscription}
        getFile={getFile}
        setGetFile={setGetFile}
        fileAttechments={fileAttechments}
      />

      {/* {viewerOpen && (
        <ViewKnowledgeDialog
          dialogOpen={viewerOpen}
          handleDialogClose={handleDialogClose}
          viewKnowledgeData={viewKnowledgeData}
        />
      )} */}

      {deleteOpen && (
        <DeleteKnowledgeModalView
          modalOpne={deleteOpen}
          handleDialogClose={handleDialogClose}
          title="Are you sure you want to delete this document?"
          secondaryLabel="Cancel"
          primaryLabel="Delete"
          getHoliListOrDeleteDocs={deleteKnowledgeBase}
        />
      )}
    </>
  );
};

export default KnowledgeTabled;
