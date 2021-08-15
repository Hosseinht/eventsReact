import React from 'react';
import EventListAttendee from "./EventListAttendee";
import './EventListItem.css'
import styled from "styled-components";

import {format} from 'date-fns'
//Bootstrap
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {BsFillClockFill, BsGeoAlt} from "react-icons/bs"
import {Link} from "react-router-dom";
import {deleteEventInFirestore} from "../../../app/firestore/firestoreService";



const EventListitem = ({event}) => {

    return (
        <EventListWrapper className='mt-5'>
            <div className="top-part">
                <div className="user-img">
                    <Image roundedCircle src={event.hostPhotoURL}/>
                </div>
                <div className="top-part-info">
                    <div className="event-title">
                        <h3>{event.title}</h3>
                    </div>
                    <div className="user-name d-flex">
                        Hosted by
                        <Link className='ms-1' to={`/profile/${event.hostUid}`}>
                            <p>{event.hostedBy}</p>
                        </Link>

                    </div>
                </div>

            </div>

            {event.isCancelled && (
                // <Badge className='tag' bg="primary" style={{top: '-240px'}}>Danger</Badge>
                <div className="my-badge-label">
                    <span className="badge ">This event has been cancelled</span>
                </div>

            )}


            <div className="d-flex flex-wrap">
                <div className="d-flex align-items-center">
                    <BsFillClockFill size='15px' className='me-1'/>
                    <div className="date">
                        {format(event.date, 'MMMM d, yyyy h:mm a')}
                    </div>
                </div>
                <div className="d-flex align-items-center mt-lg-0 mt-sm-2  mt-md-2">
                    <BsGeoAlt size='15px' className='me-1'/>
                    <div className="venue">
                        {event.venue.address}
                    </div>
                </div>
            </div>
            <div className="attendee-part">
                {event.attendees.map(attendee => (
                    <EventListAttendee attendee={attendee} key={attendee.id}/>
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
                            className='py-2 px-4 my-blue-btn'>
                            View
                        </Button>{' '}
                        <Button onClick={() => deleteEventInFirestore(event.id)}
                                className='p-2 px-3 my-red-btn'>Delete</Button>
                    </div>
                </div>
            </div>
        </EventListWrapper>
    );
};

export default EventListitem;

const EventListWrapper = styled.div`
    .my-badge-label{
          display: flex!important;
          justify-content: center!important;
          transform: translateY(-160px);
          margin-right:-30px ;
          span {
            background-color: #f77462;
            color: white;
          }
        }
    margin-bottom: 30px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .top-part {
        display: flex;
        justify-content: start;
        img{
          width: 128px;
          height: 128px;
        }
    
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
        margin-right: 8px;
        margin-top: 3px;
    }
    .date {
        margin-right: 10px;
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
        box-shadow: none;
        background-color: transparent;
        border: none;
        color:#36bff7;
        :hover {
        background-color:#95D2EC ;
        color: white;
        font-weight: bold;
    }
    }
    .description-delete-btn{
        background-color:transparent;
        color: #f77462;
        border: none  ;
        :hover {
        background-color:#f77462;
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