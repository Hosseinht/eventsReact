import React from 'react';
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import {Link} from "react-router-dom";
// import {Image, List} from "semantic-ui-react";

const EventListAttendee = ({attendee}) => {
    return (

        <AttendeeListWrapper>
            <Link to={`/profile/${attendee.id}`}>
                <Image className='attendee-img me-2' roundedCircle src={attendee.photoURL}/>
            </Link>

        </AttendeeListWrapper>


    );
};

export default EventListAttendee;

const AttendeeListWrapper = styled.div`
  .attendee-img {
  width: 30px;
  height: 30px;
  }
    
`
