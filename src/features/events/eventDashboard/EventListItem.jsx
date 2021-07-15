import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import './EventListItem.css'

const EventListitem = ({event}) => {
    return (
        <div>
            <Segment.Group style={{marginBottom: "15px"}}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' circular src={event.hostPhotoURL}/>
                            <Item.Content>
                                <Item.Header content={event.title}/>
                                <Item.Description>{event.hostedBy}</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='clock'/> {event.date}
                        <Icon name='marker'/> {event.venue}
                    </span>
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        {event.attendees.map(attende => (
                            <EventListAttendee attende={attende} key={attende.id}/>
                        ))}

                    </List>
                </Segment>
                <Segment clearing>
                    <div>{event.description}</div>
                    <Button className='view-btn' style={{backgroundColor: '#26a5d4'}} floated='right' content='View'/>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default EventListitem;
