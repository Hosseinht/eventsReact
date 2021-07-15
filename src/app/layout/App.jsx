import '../../index.css';
import {Button} from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/eventDashboard";
import NavBar from "../../features/nav/NavBar";

function App() {
    return (
        <div>
            <NavBar/>
           <EventDashboard/>
        </div>
    );
}

export default App;
