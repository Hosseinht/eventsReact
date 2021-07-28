import React, {useEffect} from 'react';
import EventList from "./EventList";
import EventFilters from "./EventFilter";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import getEventsFromFirestore, {dataFromSnapshot} from "../../../app/firestore/firestoreService";
import {listenToEvents} from "../eventActions";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../../../app/async/asyncReducer";
// for loading indicator

const EventDashboard = () => {
    const dispatch = useDispatch()
    const {events} = useSelector(state => state.event)
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}
    const {loading} = useSelector(state => state.async)

    useEffect(() => {
        dispatch(asyncActionStart())
        const unsubscribe = getEventsFromFirestore({
            // after we've received the data back from firestore, what we want to do next?
            // our data from firestore comes back as a snapshot
            next: snapshot => {
                dispatch(listenToEvents(snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot))));
                dispatch(asyncActionFinish())
            },
            // this is a collection and returns us an array of documents
            error: error => dispatch(asyncActionError(error)),
            complete: () => console.log('Hi there')
        })
        // when component unmount. to unsubscribe we need to call it
        return unsubscribe
    }, [dispatch])

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