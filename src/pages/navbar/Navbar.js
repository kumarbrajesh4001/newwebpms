// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className="position-relative bg-primary link d-md-none d-flex">
//         <MenuIcon
//           onClick={() => {
//             setOpen(!open);
//           }}
//         />
//         {open && (
//           <div
//             className="menu-modal bg-primary ps-2"
//             onClick={() => setOpen(!open)}
//           >
//             <NavLink to="/" className="link d-flex">
//               Login
//             </NavLink>
//             <NavLink to="/reset-password" className="link d-flex py-1">
//               Reset Password
//             </NavLink>
//             <NavLink to="/dashboard" className="link d-flex">
//               Dashboard
//             </NavLink>
//             <NavLink to="/manual-work" className="link d-flex py-1">
//               ManualWork
//             </NavLink>
//             <NavLink to="/pending-work" className="link d-flex">
//               PendingWork
//             </NavLink>
//             <NavLink to="/profile" className="link d-flex py-1">
//               Profile
//             </NavLink>
//             <NavLink to="/leave" className="link d-flex">
//               Leave
//             </NavLink>
//           </div>
//         )}
//       </div>

//       <div className="d-flex justify-content-around  py-2 bg-primary d-md-flex d-none">
//         <NavLink to="/" className="link">
//           Login
//         </NavLink>
//         <NavLink to="/reset-password" className="link">
//           Reset Password
//         </NavLink>
//         <NavLink to="/dashboard" className="link">
//           Dashboard
//         </NavLink>
//         <NavLink to="/manual-work" className="link">
//           ManualWork
//         </NavLink>
//         <NavLink to="/pending-work" className="link">
//           PendingWork
//         </NavLink>
//         <NavLink to="/profile" className="link">
//           Profile
//         </NavLink>
//         <NavLink to="/leave" className="link">
//           Leave
//         </NavLink>
//       </div>
//     </>
//   );
// };

// export default Navbar;
