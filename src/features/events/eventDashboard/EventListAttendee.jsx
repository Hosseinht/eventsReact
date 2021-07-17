import React from 'react';
import Image from "react-bootstrap/Image";
import styled from "styled-components";
// import {Image, List} from "semantic-ui-react";

const EventListAttendee = ({attende}) => {
    return (

        <AttendeeListWrapper>
            <Image className='attendee-img' roundedCircle src={attende.photoURL}/>
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
