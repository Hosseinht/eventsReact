import React from 'react';
import EventListitem from "./EventListItem";

const EventList = ({events, selectEvent, deleteEvent}) => {
    return (
        <div>
            {events.map(event => (
                <EventListitem
                    key={event.id}
                    event={event}


                />
            ))}
        </div>
    );
};

export default EventList;
