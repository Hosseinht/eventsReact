import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import {sampleData} from "../../../app/api/sampleData";

const EventDashboard = ({formOpen, setFormOpen}) => {
    const [events, setEvents] = useState(sampleData)

    function handleCreateEvent(event) {
        setEvents([...events, event])
        // it's an array cuz sampleData is an array
       //event = the event that we receive. and this is going to add this on as an individual element inside the array
        //it returns a new array that we then use is inside setEvent. when we submit our form and call this function
        // we should get a new event in our list
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen && <EventForm setEvents={setEvents} setFormOpen={setFormOpen} createEvent={handleCreateEvent()}/>}
                {/*it says if form is false don't show it*/}

            </Grid.Column>
        </Grid>

    );
};

export default EventDashboard;
