import React from 'react';
import EventListitem from "./EventListItem";

const EventList = ({events, selectEvent}) => {
    return (
        <div>
            {events.map(event => (
                <EventListitem key={event.id} event={event} selectEvent={selectEvent}/>
            ))}
        </div>
    );
};

export default EventList;
