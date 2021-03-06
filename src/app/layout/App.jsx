import React from 'react'
import '../../index.css';
import Container from "react-bootstrap/Container";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import {Route, useLocation} from 'react-router-dom'
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
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";

function App() {
    const {key} = useLocation()
    const {initialized} = useSelector((state) => state.auth)
    // const {currentUserProfile} = useSelector(state => state.profile)


    if (initialized ) return <LoadingComponent content='Loading app...'/>

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
                <PrivateRoute path={['/createEvent', '/manage/:id']} component={EventForm} key={key}/>
                {/*<Route path='/eventDetail' component={EventDetailedPage} />*/}
                <PrivateRoute path='/account' component={AccountPage}/>
                <PrivateRoute path='/profile/:id' component={ProfilePage}/>
                <Route path='/error' component={ErrorComponent}/>
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