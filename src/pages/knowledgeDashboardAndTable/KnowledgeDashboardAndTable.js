import React, { useState } from "react";
import {
  KnowledgeDashb,
  KnowledgeTabled,
} from "../../components/knowledgeDashAndTable";
import Loader from "../../components/loader";
import ErrorSnackBar from "../../components/snackBar/ErrorSnackBar";

const KnowledgeDashboardAndTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [opensnackbar, setSnackbarOpen] = useState({});
  const [knowledgeDash, setKnowledgeDash] = useState(false);

  const showGroupWiseKnowledge = (param) => (e) => {
    setKnowledgeDash(param);
  };

  const handleClose = () => {
    setSnackbarOpen({ setopen: false });
  };

  return (
    <div className="background-DCDFE4 py-3">
      <div className="background-FFFFFF min-height-69 pt-5 pb-4">
        {knowledgeDash ? (
          <KnowledgeTabled
            setIsLoading={setIsLoading}
            setSnackbarOpen={setSnackbarOpen}
            showGroupWiseKnowledge={showGroupWiseKnowledge}
            knowledgeDash={knowledgeDash}
          />
        ) : (
          <KnowledgeDashb
          setIsLoading={setIsLoading}
          setSnackbarOpen={setSnackbarOpen}
           showGroupWiseKnowledge={showGroupWiseKnowledge}
          />
        )}

        <Loader open={isLoading} size={70} />
        <ErrorSnackBar opensnackbar={opensnackbar} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default KnowledgeDashboardAndTable;
