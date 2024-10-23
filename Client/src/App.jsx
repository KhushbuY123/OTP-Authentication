import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Otp from "./pages/Otp";
import Header from "./components/Header";
import Error from "./pages/Error";
import DashBoard from "./pages/DashBoard";
import Charts from "./pages/Charts/Charts";
import DetailsPage from "./pages/Charts/DetailsPage";
import ActorDashBoard from "./pages/Actors/ActorDashBoard";
import ActorLogin from "./pages/Actors/ActorLogin";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="*" element={<Error />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/charts/:label" element={<DetailsPage />} />
          <Route path="/actorDash" element={<ActorDashBoard />} />
          <Route path="/actorLogin" element={<ActorLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
