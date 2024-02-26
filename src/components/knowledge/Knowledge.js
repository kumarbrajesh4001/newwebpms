import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ViewKnowledgeDialog from "../knowledegeDialog";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { getRequest, postRequest } from "../../services";
import { API_URL, createOrEditGroupKnbUrl } from "../../constant/apiUrls";
import { handleViewerOpen } from "../../helpers/knowledgeView";
import FolderKnowledge from "./FolderKnowledge";
import DocsUserKnowledge from "./DocsUserKnowledge";
import TextEditor from "../knowledgeDashAndTable/TextEditor";

const Knowledge = (props) => {
  const { setSnackbarOpen, setIsLoading } = props;

  const [isFolderShow, setIsFolderShow] = useState(false);



  const showDocs = (param)=>{
    setIsFolderShow(param)
  }

  return (
    <div>
      {isFolderShow ? (
        <DocsUserKnowledge
          setIsLoading={setIsLoading}
         
          showDocs={showDocs}
          isFolderShow={isFolderShow}
          setSnackbarOpen={setSnackbarOpen}
        
        />
      ) : (
        <FolderKnowledge
          setIsLoading={setIsLoading}
          
          showDocs={showDocs}
          setSnackbarOpen={setSnackbarOpen}
          // setIsAccess={setIsAccess}
        />
      )}

      {/* <div className="main-heading color-2E3192 pt-3">Knowlege Base</div>

      <hr className="border-DDE8F1" />

      <table className="width-100 mt-4">
        <tr className="background-EEF3F8">
          {KnowledegeHead.map((userDetail, ind) => (
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
            <td className="text-center p-1">
              <span
                className="cancel-button px-3"
                onClick={handleViewerOpen({
                  open: true,
                  id: know?.id,
                })}
              >
                View
              </span>
            </td>
          </tr>
        ))}
      </table>
    */}
    </div>
  );
};

export default Knowledge;
