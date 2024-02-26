import React from "react";
import EmpProfile from "../../components/empProfile";

const Profile = (props) => {

  const {opensnackbar,setSnackbarOpen,setToken,isEmpDetail,setIsEmpDetail} = props;

  return (
    <>
      <div className="background-DCDFE4 py-3">
        <div className="background-FFFFFF min-height-69">
          <div className="montserrat-fontFamily">
            <EmpProfile opensnackbar={opensnackbar} setSnackbarOpen={setSnackbarOpen} setToken={setToken}
            
            isEmpDetail={isEmpDetail}
            setIsEmpDetail={setIsEmpDetail}
            
            
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
