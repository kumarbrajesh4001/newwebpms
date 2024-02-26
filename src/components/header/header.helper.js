export const actPages = (role, knwPermision) =>
  [
    "Profile",
    role === "super_admin" && "HR Panel",
    "Change Password",
    "Manual Work Log",

    (role === "pm" || role === "seo_tl" || role === "super_admin") &&
      "Pending Work Log",
    (role === "pm" || role === "super_admin") && "Resource Management",
    (role === "seo_tl" || role === "super_admin") && "SEO Resource Management",
    ...(role === "pm" || role === "seo_tl" || role === "super_admin"
      ? ["User", "User Details", "Team"]
      : []),
    !!knwPermision && "Knowledge Base",
    "Sign Out",
  ].filter(Boolean);

{
  /* permission:["createKnowledgeBase"]  */
}

export const redirectPage = (role, ind, knwPermision) =>
  [
    "/profiles",
    role === "super_admin" && "/hr-panel",
    "/change-password",
    "/manual-work",

    (role === "pm" || role === "seo_tl" || role === "super_admin") &&
      "/pending-work",
    (role === "pm" || role === "super_admin") && "/resource-management",
    (role === "seo_tl" || role === "super_admin") && "/seo",
    ...(role === "pm" || role === "seo_tl" || role === "super_admin"
      ? ["/user", "/user-details", "/team"]
      : []),
    !!knwPermision && "/knowledge-dashboard",
    "/",
  ].filter(Boolean)[ind];

export const storePages = (role, knwPermision) =>
  (role === "super_admin" && [2, 10]) ||
  ((role === "pm" || role === "seo_tl") && [1, !!knwPermision ? 9 : 8]) ||
  ((role === "normal_user" || role === "hr") && [1, !!knwPermision ? 4 : 3]);

/* 

//////// in this code filter loop call many time so ignore ///////////


const sltPages = [
  "Profile",
  "HR Panel",
  "Change Password",
  "Manual Work Log",
  "Pending Work Log",
  "Resource Management",
  "SEO Resource Management",
  "User",
  "User Details",
  "Team",
  "Sign Out",
];

const sltRdPage = [
  "/profile",
  "/hr-panel",
  "/change-password",
  "/manual-work",
  "/pending-work",
  "/resource-management",
  "/seo",
  "/user",
  "/user-details",
  "/team",
  "/",
];


const ad = [1, 6];
const ad2 = [1, 5];
const nrmlEmp = [1, 4, 5, 6, 7, 8,9];

const filterActRdPages = (pagesAct, needPage) =>
  pagesAct.filter((_, ind) => !needPage.includes(ind));  //// here loop call many times

export const actPages = (role) => 
  role === "super_admin"
    ? sltPages
    : filterActRdPages(
        sltPages,
        (role === "normal_user" ||  role === "hr") ? nrmlEmp : role === "pm" ? ad : ad2
      );

export const redirectPage = (role, ind) =>
  role === "super_admin"
    ? sltRdPage[ind]
    : filterActRdPages(
        sltRdPage,
        (role === "normal_user" ||  role === "hr")? nrmlEmp : role === "pm" ? ad : ad2
      )[ind];

export const storePages = (role) =>
  (role === "super_admin" && [2, 10]) ||
  ((role === "pm" || role === "seo_tl") && [1, 8]) ||
  ((role === "normal_user" ||  role === "hr")  && [1, 3]);

   */
