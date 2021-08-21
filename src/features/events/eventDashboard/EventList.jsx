import React from 'react';
import EventListitem from "./EventListItem";
import InfiniteScroll from 'react-infinite-scroller'

const EventList = ({events, getNextEvents, loading, moreEvents,}) => {
    return (
        <div>
            {events.length !== 0 && (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={getNextEvents}
                    hasMore={!loading && moreEvents}
                    initialLoad={false}
                >
                    {events.map(event => (
                        <EventListitem
                            key={event.id}
                            event={event}
                        />
                    ))}
                </InfiniteScroll>
            )}

        </div>
    );
};

export default EventList;
