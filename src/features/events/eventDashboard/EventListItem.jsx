import React from 'react';
import EventListAttendee from "./EventListAttendee";
import './EventListItem.css'
import styled from "styled-components";
import EventList from "./EventList";

//Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {BsFillClockFill, BsGeoAlt} from "react-icons/bs"
import {Link} from "react-router-dom";

const EventListitem = ({event, selectEvent, deleteEvent}) => {
    return (
        <EventListWrapper>
            <div className="top-part">
                <div className="user-img">
                    <Image roundedCircle src={event.hostPhotoURL}/>
                </div>
                <div className="top-part-info">
                    <div className="event-title">
                        <h3>{event.title}</h3>
                    </div>
                    <div className="user-name">
                        <p>{event.hostedBy}</p>
                    </div>
                </div>
            </div>
            <div className="middle-part">
                <div className="middle-part-date">
                    <BsFillClockFill size='15px' className='middle-part-icon'/>
                    <div className="date">
                        {event.date}
                    </div>
                </div>
                <div className="middle-part-venue ">
                    <BsGeoAlt size='15px' className='middle-part-icon'/>
                    <div className="venue">
                        {event.venue}
                    </div>
                </div>
            </div>
            <div className="attendee-part">
                {event.attendees.map(attendee => (
                    <EventListAttendee attende={attendee} key={attendee.id}/>
                ))}
            </div>
            <div className="bottom-part">
                <div className="bottom-part-description">
                    <div className="description">
                        {event.description}
                    </div>
                    <div className="description-btns">
                        <Button
                            as={Link} to={`/events/${event.id}`}
                            className='py-2 px-4 description-view-btn'>
                            View
                        </Button>{' '}
                        <Button onClick={() => deleteEvent(event.id)}
                                className='p-2 px-3 description-delete-btn'>Delete</Button>
                    </div>
                </div>
            </div>
        </EventListWrapper>
    );
};

export default EventListitem;

const EventListWrapper = styled.div`
margin-bottom: 20px;
padding: 20px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
.top-part {
    display: flex;
    justify-content: start;

    .top-part-info{
    padding: 5px;
    margin-left: 10px;
}
    .user-name {
    margin-top: 10px;
    font-size:16px ;
}

}

.middle-part {
    padding: 15px 0;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
}
.middle-part-date{
    display: flex;

}
.middle-part-venue {
    display: flex;
}
.middle-part-icon {
    margin - right: 8px;
    margin-top: 3px;
}
.date {
    margin - right: 10px;
}
.attendee-part {
    display: flex;
    flex-wrap: wrap;
    margin:20px 0;

}
.description-btns {
    float: right;
    margin-right: 10px;
    margin-top: 10px;

}
.bottom-part{
    ::after{
    content: "";
    clear: both;
    display: table;
}
}
.description-view-btn {
    box - shadow: none;
    background-color: #47abd8;
    border: none;
    :hover {
    background-color:#95D2EC ;
    color: white;
    font-weight: bold;
}
}
.description-delete-btn{
    box - shadow: none;
    background-color:#FF4242;
    border: none  ;
    :hover {
    background-color:#ff5454;
    color: white;
    font-weight: bold;
}
}
`

    //
//     < Segment.Group
// style = {
// {
//     marginBottom: "15px"
// }
// }>
// <Segment>
// <Item.Group>
// <Item>
// <Item.Image size='tiny' circular src={event.hostPhotoURL}/>
// <Item.Content>
// <Item.Header content={event.title}/>
// <Item.Description>{event.hostedBy}</Item.Description>
// </Item.Content>
// </Item>
//
// </Item.Group>
// </Segment>
// <Segment borderless>
// <span>
//                        <Icon name='clock'/> {event.date}
//                        <Icon name='marker'/> {event.venue}
//                    </span>
// </Segment>
// <Segment secondary>
// <List horizontal>
// {event.attendees.map(attendee => (
//                            <EventListAttendee attende={attendee} key={attendee.id}/>
//                        ))}
//
//                    </List>
//                </Segment>
//                <Segment clearing>
//                    <div>{event.description}</div>
//                    <Button
//                        onClick={() => deleteEvent(event.id)}
//                        className='view-btn'
//                        style={{backgroundColor: '#FF4242'}}
//                        floated='right'
//                        content='Delete'
//                    />
//                    <Button
//                        onClick={() => selectEvent(event)}
//                        className='view-btn'
//                        style={{backgroundColor: '#26a5d4'}}
//                        floated='right'
//                        content='View'
//                    />
//
//                </Segment>
//            </Segment.Group>