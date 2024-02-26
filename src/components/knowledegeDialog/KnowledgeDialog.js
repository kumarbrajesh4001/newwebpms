import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import upload from "../../assets/upload.png";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ftr from "../../assets/ftr-logo.png";
import aisLogoHeader from "../../assets/ais-logo-header.png";
import { getRequest } from "../../services";
import { API_URL } from "../../constant/apiUrls";
import Loader from "../loader";
import fetchImage from "../../helpers/viewDocs";

const ViewKnowledgeDialog = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const viewOpen = urlParams.get("open");
  const id = urlParams.get("id");

  const [knowledgeData, setKnowledgeData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const dwnOrShowKnowkedg = () => {
    console.log("hello");
  };

  useEffect(() => {
    setIsLoading(true);
    getRequest(`${API_URL.VIEW_DESCRIPTION_KNOWLEDGEBASE}?id=${id}`)
      .then((res) => {
        setKnowledgeData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Dialog
      open={viewOpen}
      // onClose={handleDialogClose}
      fullScreen
    >
      <div className="d-flex flex-wrap h-100">
        <div className="w-100">
          <div className="leave-apply m-3 ">
            <img src={aisLogoHeader} alt="ais-logo-header" />
            <div className="row mt-3">
              <div className="col-9">
                <span className="color-000000 me-2">Title:</span>
                <span className="color-2E3192">{knowledgeData?.title}</span>
              </div>
              {!!knowledgeData?.attechments && (
                <div className="col-3 text-end">
                  {/* <span
                    className="pointer-cur"
                    onClick={() => {
                      fetchImage(
                        `/fileAccess?attechments=${knowledgeData?.attechments}`,
                        setIsLoading
                      );
                    }}
                  >
                    <span className="me-1 select-profile">Attached Document</span>
                    <img
                      src={upload}
                      alt="upload"
                      width="38px"
                      height="38px"
                      className="pointer-cur"
                    />
                  </span> */}

                  <Tooltip
                    className="pointer-cur"
                    onClick={() => {
                      fetchImage(
                        `/fileAccess?attechments=${knowledgeData?.attechments}`,
                        setIsLoading
                      );
                    }}
                    title={
                      <span className="fontWeight-600">
                        Click here to view the attached document
                      </span>
                    }
                  >
                    <span className="me-1 select-profile"><FilePresentIcon />Linked File</span>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>

          <div className="mx-3">
            <span className="fontWeight-500 ">
              <u>Description:</u>
            </span>
            <span
              dangerouslySetInnerHTML={{ __html: knowledgeData?.discription }}
            />
          </div>
        </div>

        <div className="text-center color-2E3192 w-100 align-self-end my-2">
          www.aistecnolabs.com ---------------------{" "}
          <img
            src={ftr}
            alt="footer-logo"
            className="ms-1 opacity-07 frt-logo-size"
          />
        </div>
      </div>
      <Loader open={isLoading} size={70} />
    </Dialog>
  );
};

export default ViewKnowledgeDialog;
