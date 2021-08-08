import React from 'react';
import styled from "styled-components";

import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";

const EventDetailedSidebar = ({attendees, hostUid}) => {
    return (
        <EventDetailedSidebarWrapper>
            <p className='text-center '>{attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Going</p>

            {attendees.map(attendee => (
                <>
                    <div key={attendee.id} className="sidebar-user">
                        <Link to={`/profile/${attendee.id}`}>
                            <div className='d-flex align-items-center'>
                                <Image src={attendee.photoURL || "/assets/user.png"}/>
                                <h5 className='text-start my-blue-color'>{attendee.displayName}</h5>
                            </div>
                        </Link>
                        {hostUid === attendee.id &&
                        <div className="my-badge-label">
                            <span className="badge ">Host</span>
                        </div>
                        }
                    </div>

                </>

            ))}
        </EventDetailedSidebarWrapper>
    );
};

export default EventDetailedSidebar;

const EventDetailedSidebarWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
  position: relative;
  
  .sidebar-info{
    background-color: #36bff7;
   
  }
  .sidebar-user{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    img{
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }
    h5 {
      text-align: start;
    }
  }
  .my-badge-label{
          display: flex!important;
          justify-content: center!important;
          //transform: translateY(-10px);
          margin-right:-30px ;
          
          span {
            background-color: #36bff7;
            border: none;
            color: white;
            width: 80px;
          }
        }


`
