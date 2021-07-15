import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

const EventListitem = () => {
    return (
        <div>
            <Segment.Group style={{marginBottom:"15px"}}>
                <Segment>
                    <Item.Group >
                        <Item>
                            <Item.Image size='tiny' circular src='/assets/user.png' />
                            <Item.Content>
                                <Item.Header content="Event Title" />
                                <Item.Description>Hosted by Bob</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='clock'/> Date
                        <Icon name='marker'/> Venue
                    </span>
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        <EventListAttendee/>
                        <EventListAttendee/>
                        <EventListAttendee/>
                    </List>
                </Segment>
                <Segment clearing>
                    <div>Description of event</div>
                    <Button color='red' floated='right' content='View'/>
                </Segment>
            </Segment.Group>
        </div>
    );
};

export default EventListitem;
