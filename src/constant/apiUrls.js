export const API_URL = {
  LOGIN: "/login",
  JIRATIMESHEET: "/JiraTimesheet",
  TEAMTIMESHEET: "/TeamTimesheet",
  USER_PROFILE_DETAILS: "/profile",
  APPLY_LEAVE: "/leave/ApplyLeave",
  ONE_USER_LEAVE_LIST: "/Leave/One",
  ALL_USER_LEAVE_LIST: "/Leave",
  APPLY_WFH: "/WFH",
  ALL_USERS_WFH_LIST: "/WFHlist",
  ONE_USER_WFH_LIST: "/WFHOneUser",
  USERLIST: "/userlist",
  MANUAL_WORK: "/manualWorkLog/GetJiraProjects",
  PROJECT_ISSUES_MWL: "/manualWorkLog/GetJiraProjectsIssues",
  SAVE_MWL: "/manualWorkLog/saveWorkLog",
  USER_DETAILS_PAGE: "/userdetailPage",
  FIND_USERS: "/TeamTimesheet/FindUsers",
  LEAVE_APPROVED_REJECT: "/LeaveApproval/ApproveRejectedLeave",
  WFH_APPROVED_REJECT: "/WFH/ApproveRejectedWFH",
  UPDATE_PASSWORD: "/updatePassword",
  UPDATE_PROFILE: "/updateprofile",
  UPLOAD_USER_FILE: "/uploaduserfile",
  UPLOAD_USER_DOCUMENT: "/updateDocument",
  PARTICULAR_USER_DETAILS: "/singleuser",
  HOLIDAYS: "holidaylist",
  REMOVE_EMPLOYEE: "removeEmployee",
  DASHBOARD_BIRTHDAY: "userbirthday",
  DASHBOARD_HOLIDAY: "holidaydateget",
  PENDING_WORK_LOG: "pendingWorkLog/pendingGetLogForApproval",
  APPROVED_PWL: "/pendingWorkLog/pendingEditWorkLogAttribute",
  REJECTED_PWL: "/pendingWorkLog/rejectWorkLog",
  COUNT_NOTIFICATION: "/getNotification",
  DELETE_NOTIFICATION: "/deleteNotification",
  USER_NOTIFICATION: "/getNotificationForUser",
  USER_DELETE_NOTIFICATION: "/deleteNotificationForUser",
  LEAVE_COUNT: "/leaveCount",
  WORKFROM_COUNT: "WFHcout",
  CREATE_KNOWLEDGEBASE: "/createKnowledgeBase",
  GET_ALL_KNOWLEDGEBASE: "/getAllKnowledgeBase",
  EDIT_KNOWLEDGEBASE: " /editKnowledgeBase",
  VIEW_DESCRIPTION_KNOWLEDGEBASE: "/getOneKnowledgeBaseData",
  DELETE_KNOWLEDGEBASE: "/deleteOneKnowledgeBaseData",
  SHOW_USERWISE_KNOWLEDGEBASE: "/showUserWise",
  SHOW_GROUPWISE_KNOWLEDGEBASE: "/showGroupWise",
  SHOW_DOCS:"empDocs",
  KNOW_ALL_FOLDER:"getAllFolder",
  CREATE_FOLDER_KNOWLEDGE:"createFolder",
  EDIT_GROUP_KNOWLEDGE:"EditFolder",
  DELETE_FOLDER_KNOWLEDGE:"deleteFolder",
  SHOWUSER_WISE_FOLDER:"showUserWiseFolder",
};




export const getUserDetailsPage = (page, limit) =>
  `${API_URL.USER_DETAILS_PAGE}?limit=${limit}&pageNo=${page}`;

export const getUserList = (page, limit) =>
  `${API_URL.USERLIST}?limit=${limit}&pageNo=${page}`;

export const oneUserLeaveListUrl = (page, limit) =>
  `${API_URL.ONE_USER_LEAVE_LIST}?limit=${limit}&pageNo=${page}`;

export const getAllUserLeaveList = (page, limit) =>
  `${API_URL.ALL_USER_LEAVE_LIST}?limit=${limit}&pageNo=${page}`;

export const getWFHList = (page, limit) =>
  `${API_URL.ALL_USERS_WFH_LIST}?limit=${limit}&pageNo=${page}`;

export const oneUserWFHListUrl = (page, limit) =>
  `${API_URL.ONE_USER_WFH_LIST}?limit=${limit}&pageNo=${page}`;

export const getSelectUsersData = (userId, st, ed) =>
  `${API_URL.JIRATIMESHEET}?user_name=${userId}&StartDate=${st}&EndDate=${ed}`;

export const getParticularUserUrl = (userId) =>
  `${API_URL.PARTICULAR_USER_DETAILS}?id=${userId}`;

export const getJiraTimesUrl = (url, st, ed) =>
  `${url}?StartDate=${st}&EndDate=${ed}`;

export const getNotificationUrl = (access) =>
  access === "super_admin"
    ? API_URL.COUNT_NOTIFICATION
    : API_URL.USER_NOTIFICATION;

export const getDeleteNotificationUrl = (access) =>
  access === "super_admin"
    ? API_URL.DELETE_NOTIFICATION
    : API_URL.USER_DELETE_NOTIFICATION;

export const createKnowledgeOrEditUrl = (id) =>
  id ? API_URL.EDIT_KNOWLEDGEBASE : API_URL.CREATE_KNOWLEDGEBASE;

  export const createOrEditGroupKnbUrl = (id) =>
  id ? API_URL.EDIT_GROUP_KNOWLEDGE : API_URL.CREATE_FOLDER_KNOWLEDGE;


export const viewOrDeleteKnowledgeUrl = (name) =>
  name === "delete"
    ? API_URL.DELETE_KNOWLEDGEBASE
    : API_URL.VIEW_DESCRIPTION_KNOWLEDGEBASE;
    
export const getGroupWiseUrl = (groupName) =>
  groupName === "All"
    ? API_URL.GET_ALL_KNOWLEDGEBASE
    : `${API_URL.SHOW_GROUPWISE_KNOWLEDGEBASE}?groups=${groupName}`;
