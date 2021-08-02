import React from 'react'
import '../../index.css';
import Container from "react-bootstrap/Container";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import {Route,useLocation} from 'react-router-dom'
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetail/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import {ToastContainer} from "react-toastify";
import ErrorComponent from "../common/errors/ErrorComponent.jsx";
import AccountPage from "../../features/auth/AccountPage";
import {useSelector} from "react-redux";
import LoadingComponent from "./LoadingComponents";

function App() {
    const {key} = useLocation()
    const {initialized} = useSelector((state) => state.auth)

    if(initialized) return <LoadingComponent content='Loading app...'/>

    return (
        <>
            <ModalManager/>
            <ToastContainer position='bottom-right' hideProgressBar/>
            <NavBar/>
            <Container className="main">
                <Route path='/' exact component={HomePage}/>
                <Route path='/events' exact component={EventDashboard}/>
                <Route path='/sandbox' exact component={Sandbox}/>
                <Route path='/events/:id' component={EventDetailedPage}/>
                <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
                {/*<Route path='/eventDetail' component={EventDetailedPage} />*/}
                <Route path='/account' component={AccountPage}/>
                <Route path='/error'  component={ErrorComponent}/>
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