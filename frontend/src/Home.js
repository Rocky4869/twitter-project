import { useNavigate, Link } from "react-router-dom";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import SideBarContainer from "./sidebar/SideBarContainer";
import Sidebar from "./sidebar/Sidebar";
import Setting from "./Setting";

function Home() {
  return (
    <div className="app">
      <SideBarContainer />
      <Setting />
      {/* <Feed /> */}
      {/* <Widgets /> */}
    </div>
  );
}

export default Home;
