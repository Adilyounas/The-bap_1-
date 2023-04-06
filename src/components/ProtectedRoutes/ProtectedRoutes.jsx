// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import {redirect , Route } from "react-router-dom";

// const ProtectedRoutes = ({ element: Component, ...rest }) => {
//   const { loading, Authenticated } = useSelector(
//     (state) => state.userSlice
//   );
//   return (
//     <Fragment>
//       {!loading && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!Authenticated) {
//               return redirect("/login") ;
//             }
//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoutes;
