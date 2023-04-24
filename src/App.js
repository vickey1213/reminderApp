import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Reminder from "./Components/Reminder";

import Authorization from "./Firebase/Authorization";

function App() {
  return (
    <>
      <Router>
        <Authorization>
      
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="reminder" element={<Reminder/>}></Route>
            <Route path="/" element={<Signup />}></Route>
            
          </Routes>
        </Authorization>
      </Router>
    </>
  );
}

export default App;
