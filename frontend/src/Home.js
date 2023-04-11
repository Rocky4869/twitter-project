import { useNavigate, Link } from "react-router-dom";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import SideBarContainer from "./sidebar/SideBarContainer";
import Sidebar from "./sidebar/Sidebar";
import Setting from "./Setting";
import Profile from "./Profile";

function Home() {
  return (
    <div className="app">
      <SideBarContainer />
      <Feed />
      <Widgets />
    </div>
  );
}

export default Home;
