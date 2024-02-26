import React, { useEffect, useState } from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { getRequest, postMultiRequest } from "../../services";
import { API_URL, createKnowledgeOrEditUrl } from "../../constant/apiUrls";
import { handleViewerOpen } from "../../helpers/knowledgeView";
import TextEditor from "../knowledgeDashAndTable/TextEditor";
import fetchImage from "../../helpers/viewDocs";

const DocsUserKnowledge = (props) => {
  const { setIsLoading, showDocs, isFolderShow, setSnackbarOpen } = props;

  const KnowledegeHead = [
    "Sr. No.",
    "Document Name",
    "Attachment",
    // "Document Link",
    "Action",
  ];

  const [knowledgelist, setKnowledgeList] = useState([]);

  const [doctList] = knowledgelist;

  const [editorOpen, setEditorOpen] = useState(false);
  const [getTitle, setGetTitle] = useState("");
  const [getFile, setGetFile] = useState(null); ///// koi ek function banake code short ho jaye//
  const [getShowTo, setGetShowTo] = useState([]);

  const [getDiscription, setGetDiscription] = useState("");
  const [fileAttechments, setFileAttechments] = useState();

  const [updatedId, setUpdatedId] = useState();

  const formData = new FormData();

  if (!!updatedId) {
    formData.append("id", updatedId);
  }

  formData.append("title", getTitle);
  formData.append("show_to", JSON.stringify(getShowTo?.map((cv) => cv.value)));
  formData.append("discription", getDiscription);

  formData.append("attechments", getFile);

  const handleEditorOpen = (editParam) => () => {
    if (!!editParam) {
      const { id, title, discription, knowledge, attechments } = editParam;

      setGetTitle(title);

      setGetShowTo(
        knowledge?.map((cv) => ({ value: cv.groups, label: cv.groups }))
      );
      setGetDiscription(discription);
      setUpdatedId(id);

      setFileAttechments(attechments);
    }

    setEditorOpen(true);
  };

  const handleDialogClose = () => {
    setEditorOpen(false);
    // setDeleteOpen(false);
    // setViewerOpen(false);

    ///// ho ske to in sbki ek state se kam chl jaye

    if (getTitle || getShowTo.length || getDiscription || getFile) {
      setGetTitle("");
      setGetShowTo([]);
      setGetDiscription("");
      setGetFile(null);
      if (updatedId) {
        setUpdatedId(); ///for clear id
      }
    }
  };

  const showUserWiseDocs = () => {
    setIsLoading(true);
    getRequest(`${API_URL.SHOW_USERWISE_KNOWLEDGEBASE}?id=${isFolderShow.id}`)
      .then((res) => {
        setKnowledgeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createOrEditKnowledgeBase = (e) => {
    e.preventDefault();

    setIsLoading(true);
    postMultiRequest(
      `${createKnowledgeOrEditUrl(!!updatedId)}?id=${isFolderShow.id}`,
      formData
    )
      .then((res) => {
        showUserWiseDocs();

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
          message: "Something is went wrong",
          severity: "error",
        });
      })
      .finally(() => {
        setGetTitle("");
        setGetShowTo([]);
        setGetDiscription(""); ///// ho ske to in sbki ek state se kam chl jaye
        setGetFile(null);
        if (updatedId) {
          setUpdatedId(); ///for clear id
        }
      });

    setEditorOpen(false);
  };

  useEffect(() => {
    showUserWiseDocs();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div
          className="main-heading color-2E3192 pt-3 pointer-cur"
          onClick={() => {
            showDocs(false);
          }}
        >
          Docs Knowlege Base
        </div>
        {!!isFolderShow.access && (
          <span
            className="cancel-button px-3 py-1 align-self-center"
            onClick={handleEditorOpen()}
          >
            <CreateNewFolderIcon className="me-1" />
            Create Docs
          </span>
        )}
        <div className="align-self-center">
          <button
            className={`apply-pro-save-btn px-4 py-1 text-white`}
            onClick={() => {
              showDocs(false);
            }}
          >
            Back
          </button>
        </div>
      </div>
      <hr className="border-DDE8F1" />
      <table className="width-100 mt-4">
        <tr className="background-EEF3F8">
          {KnowledegeHead.filter(Boolean).map((userDetail, ind) => (
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

        {knowledgelist?.map((know, ind) => (
          <tr key={ind}>
            <td className="text-center p-1">{ind + 1}</td>
            <td className="text-center p-1">{know?.title}</td>
            <td
              className={`text-center p-1 ${
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

            {/*
             <td className="text-center p-1">
              <span
                className="cancel-button px-3 me-3"
                onClick={handleViewerOpen({
                  open: true,
                  id: know?.id,
                })}
              >
                View
              </span>
            </td> 
            */}

            <td className="text-center p-1">
              <span
                className="cancel-button px-3 me-3"
                onClick={handleViewerOpen({
                  open: true,
                  id: know?.id,
                })}
              >
                View
              </span>
              {!!isFolderShow.access && (
                <span
                  className="cancel-button px-4 ms-3"
                  onClick={handleEditorOpen({
                    id: know?.id,
                    title: know?.title,
                    discription: know.discription,
                    knowledge: know.knowledge,
                    attechments: know?.attechments,
                  })}
                >
                  Edit
                </span>
              )}
            </td>
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
        getShowTo={getShowTo}
        setGetShowTo={setGetShowTo}
        getDiscription={getDiscription}
        setGetDiscription={setGetDiscription}
        getFile={getFile}
        setGetFile={setGetFile}
        fileAttechments={fileAttechments}
      />
    </>
  );
};

export default DocsUserKnowledge;
