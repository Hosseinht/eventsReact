import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";


const EventDashboard = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
               <EventList/>
            </Grid.Column>
            <Grid.Column width={6}>
               <h1>Right</h1>
            </Grid.Column>
        </Grid>

    );
};

export default EventDashboard;
