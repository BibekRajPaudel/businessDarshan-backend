import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Loginregister from "../Pages/Loginregister";
import "./App.css";
import Country from "../Pages/Country";
import Packages from "../Pages/Packages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginregister />} />
        </Routes>

        <Routes>
          <Route>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/packages" element={<Packages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
