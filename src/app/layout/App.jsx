import React, {useState} from 'react'
import '../../index.css';
import {Button, Container} from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

function App() {
    const [formOpen, setOpenForm] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)

    function handleSelectEvent(event) {
        setSelectedEvent(event)
        setOpenForm(true)
        //View button
    }

    //Clear selected event when we open the form fully created
    function handleCreateFormOpen() {
        setSelectedEvent(null);
        setOpenForm(true)
        //Create event button
    }

    return (
        <>
            <NavBar setFormOpen={handleCreateFormOpen} formOpen={formOpen}/>
            <Container className="main">
                <EventDashboard
                    formOpen={formOpen}
                    setFormOpen={setOpenForm}
                    selectEvent={handleSelectEvent}
                    selectedEvent={selectedEvent}/>
            </Container>

        </>
    );
}

export default App;
