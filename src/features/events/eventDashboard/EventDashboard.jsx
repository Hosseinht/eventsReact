import React from 'react';
import EventList from "./EventList";
//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useSelector} from "react-redux";

const EventDashboard = () => {
    const {events} = useSelector(state => state.event)
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}


    // function handleCreateEvent(event) {
    //     setEvents([...events, event])
    //     // it's an array cuz sampleData is an array
    //     //event = the event that we receive. and this is going to add this on as an individual element inside the array
    //     //it returns a new array that we then use is inside setEvent. when we submit our form and call this function
    //     // we should get a new event in our list
    // }
    //
    // function handleUpdateEvent(updatedEvent) {
    //     setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt))
    //
    // }

    function handleDeleteEvent(eventId){
        // setEvents(events.filter(evt => evt.id !== eventId))
        // تمام اونایی که یکی نیستن رو نگه دار یکی هست پاک کن
    }

    return (

        <Container>
            <Row>
                <Col lg={8} md={"auto"}>
                    <EventList
                        events={events}
                        deleteEvent={handleDeleteEvent}
                    />
                </Col>
                <Col lg={8} md={"auto"}>
                    <h2>Event Filters</h2>
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