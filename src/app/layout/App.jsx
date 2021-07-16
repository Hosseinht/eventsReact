import React, {useState} from 'react'
import '../../index.css';
import {Button, Container} from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

function App() {
     const [formOpen, setOpenForm] = useState(true)
    return (
        <>
            <NavBar setFormOpen={setOpenForm} formOpen={formOpen}/>
            <Container className="main">
                <EventDashboard formOpen={formOpen} setFormOpen={setOpenForm}/>
            </Container>

        </>
    );
}

export default App;
