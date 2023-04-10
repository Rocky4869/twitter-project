import { useNavigate , Link} from "react-router-dom";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import './App.css';
function Home(){
    return (
      <div className="app">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    
    );
}

export default Home;