import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import {sampleData} from "../../../app/api/sampleData";

const EventDashboard = ({formOpen, setFormOpen}) => {
    const [events, setEvents] = useState(sampleData)

    return (
        <Grid>
            <Grid.Column width={10}>
               <EventList events={events }/>
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen && <EventForm setEvents={setEvents} setFormOpen={setFormOpen}/>}
                {/*it says if form is false don't show it*/}

            </Grid.Column>
        </Grid>

    );
};

export default EventDashboard;
