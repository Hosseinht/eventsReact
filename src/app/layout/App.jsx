import React, {useState} from 'react'
import '../../index.css';
import Container from "react-bootstrap/Container";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import {Route} from 'react-router-dom'
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetail/eEventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";

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
                <Route path='/' exact component={HomePage}/>
                <Route path='/events' exact component={EventDashboard}/>
                <Route path='/events:id' component={EventDetailedPage}/>
                <Route path='/createEvent' component={EventForm}/>
            </Container>

        </>
    );
}

export default App;
 // <EventDashboard
 //                    formOpen={formOpen}
 //                    setFormOpen={setOpenForm}
 //                    selectEvent={handleSelectEvent}
 //                    selectedEvent={selectedEvent}/>