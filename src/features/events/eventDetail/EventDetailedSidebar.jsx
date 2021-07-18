import React from 'react';
import styled from "styled-components";

import Image from "react-bootstrap/Image";

const EventDetailedSidebar = ({attendees}) => {
    return (
        <EventDetailedSidebarWrapper>
            <p className='text-center '>{attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Going</p>

            {attendees.map(attendee => (
                <div key={attendee.id} className="sidebar-user">
                    <Image src={attendee.photoURL || "/assets/user.png"}/>
                    <h5>{attendee.displayName}</h5>
                </div>
            ))}
        </EventDetailedSidebarWrapper>
    );
};

export default EventDetailedSidebar;

const EventDetailedSidebarWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
  .sidebar-info{
    background-color: #36bff7;
  }
  .sidebar-user{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img{
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }
    h5 {
      
    }
  }

`
