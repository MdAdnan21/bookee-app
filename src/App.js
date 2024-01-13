// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes, Switch } from 'react-router-dom';
// import MyShifts from './components/MyShifts';
// import AvailableShifts from './components/AvailableShifts'; // Corrected import statement

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/my-shifts">My Shifts</Link>
//             </li>
//             <li>
//               <Link to="/available-shifts">Available Shifts</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Switch>
//             <Route path="/my-shifts">
//               <MyShifts />
//             </Route>
//             <Route path="/available-shifts">
//               <AvailableShifts />
//             </Route>
//           </Switch>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



import React from 'react'
import MyShifts from './components/MyShifts'
import AvailableShifts from './components/AvailableShift'

const App = () => {
  return (
    <>
      <MyShifts/>
      <AvailableShifts/>
    </>
  )
}

export default App

