// import React, { useState, useEffect } from "react";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Button from "@mui/material/Button";
// import Popover from "@mui/material/Popover";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import ViewKnowledgeDialog from "../../../components/knowledegeDialog";
// import DeleteKnowledgeModalView from "../../../components/holidayKnowledgeModalView";
// import TextEditor from "./TextEditor";
// import { getRequest, postMultiRequest, postRequest } from "../../../services";
// import {
//   API_URL,
//   createKnowledgeOrEditUrl,
//   getGroupWiseUrl,
//   viewOrDeleteKnowledgeUrl,
// } from "../../../constant/apiUrls";

// import Loader from "../../../components/loader";
// // import ShowTo from "./ShowTo";


// import { SearchBar } from "../components";
// import getSearchingData from "../../../helpers/searching";
// import getSearchUsers from "../../../helpers/sorting";
// import { handleViewerOpen } from "../../../helpers/knowledgeView";

// const KnowledgeBase = (props) => {
//   const {
//     showLeftNav,
//     setIsLoading,
//     setSnackbarOpen,
//     showGroupWiseKnowledge,
//     knowledgeDash,
//   } = props;

//   const KnowledegeHead = [
//     "Sr. No.",
//     "Document Name",
//     "Category",
//     "Document Link",
//     "Action",
//   ];

//   const statuses = ["All", "Active", "Inactive"];

//   const [knowledgelist, setKnowledgeList] = useState({});

//   const [userknowledgeList, setUserKnowledgeList] = useState([]);

//   const [filteredData, setFilteredData] = useState([]);

//   const [editorOpen, setEditorOpen] = useState(false);

//   const [viewerOpen, setViewerOpen] = useState(false);

//   const [deleteOpen, setDeleteOpen] = useState(false);

//   const [viewKnowledgeData, setViewKnowledgeData] = useState({});

//   const [searchTerm, setSearchTerm] = useState("");

//   ////here to code refactor bcz 4 state use ho rhe h

//   const [getTitle, setGetTitle] = useState("");

//   const [getShowTo, setGetShowTo] = useState([]);

//   const [getDiscription, setGetDiscription] = useState("");

//   const [getFile, setGetFile] = useState(null); ///// koi ek function banake code short ho jaye//

//   const [fileAttechments, setFileAttechments] = useState();

//   const [updatedId, setUpdatedId] = useState();

//   const [deleteKnowledgeData, setDeleteKnowledgeData] = useState(false);

//   // const [createKnowledge, setCreateknowledge] = useState({
//   //   title: "",
//   //   discription: "",
//   // });

//   const formData = new FormData();

//   if (!!updatedId) {
//     formData.append("id", updatedId);
//   }

//   formData.append("title", getTitle);
//   formData.append("show_to", JSON.stringify(getShowTo?.map((cv) => cv.value)));
//   formData.append("discription", getDiscription);

//   formData.append("attechments", getFile);

//   const handleSearch = (e) => {
//     const value = e.target.value;

//     const query = value.toLowerCase();

//     const filtered = knowledgelist?.data?.filter(
//       (item) =>
//         item?.title?.toLowerCase().includes(query) ||
//         item?.knowledge
//           ?.find((cv) => cv?.groups.toLowerCase() === query)
//           ?.groups.toLowerCase() === query
//     );

//     setFilteredData(filtered);

//     setSearchTerm(value);
//     // setIsShorting(false);
//   };

//   const getKnowledgeList = getSearchUsers(
//     searchTerm,
//     filteredData,
//     knowledgeDash === "All" ? knowledgelist?.data : userknowledgeList
//   );

//   const handleEditorOpen = (editParam) => () => {
//     if (!!editParam) {
//       const { id, title, discription, knowledge, attechments } = editParam;

//       setGetTitle(title);

//       setGetShowTo(
//         knowledge.map((cv) => ({ value: cv.groups, label: cv.groups }))
//       );
//       setGetDiscription(discription);
//       setUpdatedId(id);

//       setFileAttechments(attechments);
//     }

//     setEditorOpen(true);
//   };

//   const openDeleteModal = (deleteParam) => () => {
//     setDeleteOpen(true);
//     setDeleteKnowledgeData(deleteParam);
//   };

//   const handleDialogClose = () => {
//     setEditorOpen(false);
//     setDeleteOpen(false);
//     setViewerOpen(false);

//     // setCreateknowledge({ title: "", discription: "" });

//     ///// ho ske to in sbki ek state se kam chl jaye

//     if (getTitle || getShowTo.length || getDiscription || getFile) {
//       setGetTitle("");
//       setGetShowTo([]);
//       setGetDiscription("");
//       setGetFile(null);
//       if (updatedId) {
//         setUpdatedId(); ///for clear id
//       }
//     }
//   };

//   const allKnowledgeBaseData = () => {
//     setIsLoading(true);
//     getRequest(getGroupWiseUrl(knowledgeDash))
//       .then((res) => {
//         if (knowledgeDash === "All") {
//           setKnowledgeList(res?.data);
//         } else {
//           setUserKnowledgeList(res?.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const viewDeleteDocsKnowledge = (id) => {
//     setIsLoading(true);
//     postRequest(API_URL.DELETE_KNOWLEDGEBASE, { id })
//       .then((res) => {
//         allKnowledgeBaseData();
//         setDeleteKnowledgeData(false);

//         setSnackbarOpen({
//           setopen: true,
//           message: "This data delete successfully......",
//           severity: "success",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsLoading(false);

//         setSnackbarOpen({
//           setopen: true,
//           message: "Something is went wrong",
//           severity: "success",
//         });
//       });
//   };

//   const deleteKnowledgeBase = () => {
//     viewDeleteDocsKnowledge(deleteKnowledgeData);
//   };

//   // const getKnowledgeValue = (e) => {
//   //   let name = e?.target?.name;

//   //   if (!!name) {
//   //     setCreateknowledge({ ...createKnowledge, [name]: e?.target?.value });
//   //   } else {
//   //     name = "discription";
//   //     setCreateknowledge({ ...createKnowledge, [name]: e });
//   //   }
//   // };

//   // const handleSubmit = ()=>{

//   // }

//   const createOrEditKnowledgeBase = () => {
//     setIsLoading(true);
//     postMultiRequest(createKnowledgeOrEditUrl(!!updatedId), formData)
//       .then((res) => {
//         allKnowledgeBaseData();

//         setSnackbarOpen({
//           setopen: true,
//           message: !!updatedId ? res.data : "KnowledgeBase Data created....",
//           severity: "success",
//         });
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         setSnackbarOpen({
//           setopen: true,
//           message: "Something is went wrong",
//           severity: "error",
//         });
//       })
//       .finally(() => {
//         setGetTitle("");
//         setGetShowTo([]);
//         setGetDiscription(""); ///// ho ske to in sbki ek state se kam chl jaye
//         setGetFile(null);
//         if (updatedId) {
//           setUpdatedId(); ///for clear id
//         }
//       });

//     setEditorOpen(false);
//   };

//   useEffect(() => {
//     allKnowledgeBaseData();
//   }, [knowledgeDash]);

//   return (
//     <div className={`${showLeftNav ? "width-82per" : "col-11"} py-2 `}>
//       <span
//         className="main-heading color-2E3192 pointer-cur ms-3"
//         id="qw"
//         onClick={showGroupWiseKnowledge(false)}
//       >
//         {knowledgeDash} Knowledge Base
//       </span>

//       <div className="d-flex justify-content-between mx-3 mt-3">

//       <SearchBar
//           handleSearch={handleSearch}
//           statuses={statuses} ///here no need further remove after check
//           searchTerm={searchTerm}
//         />

//         <span
//           className="cancel-button px-3 py-1 align-self-center"
//           onClick={handleEditorOpen()}
//         >
//           <CreateNewFolderIcon className="me-1" />
//           Create Docs
//         </span>

       
//         <button
//           className={`apply-pro-save-btn px-4 py-1 text-white`}
//           onClick={showGroupWiseKnowledge(false)}
//         >
//           Back
//         </button>
       
//       </div>
//       <hr className="border-DDE8F1" />

//       <table className="width-100 mt-4">
//         <tr className="background-EEF3F8">
//           {KnowledegeHead.map((userDetail, ind) => (
//             <th
//               className={`text-center p-1 ${ind === 0 && "width-80"} ${
//                 ind === 1 && "width-400"
//               }`}
//               key={ind}
//             >
//               {userDetail}
//             </th>
//           ))}
//         </tr>

//         {getKnowledgeList?.map((know, ind) => (
//           <tr key={ind}>
//             <td className="text-center py-1">{ind + 1}</td>
//             <td className="text-center py-1">
//               {knowledgeDash === "All"
//                 ? know?.title
//                 : know?.knowledgeBase?.title}
//             </td>
//             {knowledgeDash === "All" ? (
//               <td className="text-center py-1">
//                 {know?.knowledge?.map((cv, ind, arr) => (
//                   <span key={ind}>
//                     {cv.groups} {ind < arr.length - 1 && ","} &nbsp;
//                   </span>
//                 ))}
//               </td>
//             ) : (
//               <td className="text-center py-1">{know?.groups}</td>
//             )}

//             <td className="text-center py-1">
//               <span
//                 className="cancel-button px-3 "
//                 onClick={handleViewerOpen({
//                   open: true,
//                   id:
//                     knowledgeDash === "All" ? know.id : know?.knowledgeBase?.id,
//                   // title: know.title,
//                   // discription: know.discription,
//                 })}
//               >
//                 View
//               </span>
//             </td>
//             <td className="text-center py-1">
//               <span
//                 className="cancel-button px-3 me-3"
//                 onClick={handleEditorOpen({
//                   id:
//                     knowledgeDash === "All"
//                       ? know?.id
//                       : know?.knowledgeBase?.id,
//                   title:
//                     knowledgeDash === "All"
//                       ? know?.title
//                       : know?.knowledgeBase?.title,
//                   discription:
//                     knowledgeDash === "All"
//                       ? know.discription
//                       : know?.knowledgeBase?.discription,
//                   knowledge:
//                     knowledgeDash === "All"
//                       ? know.knowledge
//                       : [{ groups: know?.groups }],

//                   attechments:
//                     knowledgeDash === "All"
//                       ? know?.attechments
//                       : know?.knowledgeBase?.attechments,
//                 })}
//               >
//                 Edit
//               </span>
//               <span
//                 className="cancel-button px-2 "
//                 onClick={openDeleteModal(
//                   knowledgeDash === "All" ? know.id : know?.knowledgeBase?.id
//                 )}
//               >
//                 Delete
//               </span>
//             </td>
//             {/* <td className="text-center py-1">
//               <ShowTo />
//             </td> */}
//           </tr>
//         ))}
//       </table>

//       {editorOpen && (
//         <TextEditor
//           editorOpen={editorOpen}
//           handleDialogClose={handleDialogClose}
//           createOrEditKnowledgeBase={createOrEditKnowledgeBase}
//           // getKnowledgeValue={getKnowledgeValue}
//           // createKnowledge={createKnowledge}
//           primaryLabel={!!updatedId ? "Update" : "Submit"}
//           getTitle={getTitle}
//           setGetTitle={setGetTitle}
//           getShowTo={getShowTo}
//           setGetShowTo={setGetShowTo}
//           getDiscription={getDiscription}
//           setGetDiscription={setGetDiscription}
//           getFile={getFile}
//           setGetFile={setGetFile}
//           fileAttechments={fileAttechments}
//         />
//       )}

//       {/* {viewerOpen && (
//         <ViewKnowledgeDialog
//           dialogOpen={viewerOpen}
//           handleDialogClose={handleDialogClose}
//           viewKnowledgeData={viewKnowledgeData}
//         />
//       )} */}

//       {deleteOpen && (
//         <DeleteKnowledgeModalView
//           modalOpne={deleteOpen}
//           handleDialogClose={handleDialogClose}
//           title="Are you Sure for delete this docs"
//           secondaryLabel="Cancel"
//           primaryLabel="Delete"
//           getHoliListOrDeleteDocs={deleteKnowledgeBase}
//         />
//       )}
//     </div>
//   );
// };

// export default KnowledgeBase;
