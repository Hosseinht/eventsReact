import React from 'react';
import EventList from "./EventList";
import EventFilters from "./EventFilter";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

//Actions
import {listenToEvents} from "../eventActions";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// FireStore
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import listenToEventsFromFirestore from "../../../app/firestore/firestoreService";


const EventDashboard = () => {
    const dispatch = useDispatch()
    const {events} = useSelector(state => state.event)
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}
    const {loading} = useSelector(state => state.async)


    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(listenToEvents(events)),
        deps: [dispatch]
    })

    return (

        <Container>
            <Row>
                <Col lg={8} md={"auto"}>
                    {loading &&
                    <>
                        <EventListItemPlaceholder/>
                        <EventListItemPlaceholder/>
                    </>
                    }
                    <EventList
                        events={events}
                    />
                </Col>
                <Col lg={4} md={"auto"}>
                    <EventFilters/>
                </Col>
            </Row>
        </Container>

    );
};

export default EventDashboard;

// <Grid>
//             <Grid.Column width={10}>
//                 <EventList
//                     events={events}
//                     selectEvent={selectEvent}
//                     deleteEvent={handleDeleteEvent}
//                 />
//             </Grid.Column>
//             <Grid.Column width={6}>
//                 {formOpen &&
//                 <EventForm
//                     setEvents={setEvents}
//                     setFormOpen={setFormOpen}
//                     createEvent={handleCreateEvent}
//                     selectedEvent={selectedEvent}
//                     updateEvent={handleUpdateEvent}
//                     key={selectedEvent ? selectedEvent.id : null}
//                     // Issue with clicking on the view button.
//                     // with this react create a new component instance rather than update the current one
//                 />}
//                 {/*it says if form is false don't show it*/}
//
//             </Grid.Column>
//         </Grid>