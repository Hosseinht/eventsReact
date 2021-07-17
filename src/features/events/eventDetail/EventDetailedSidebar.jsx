import React from 'react';
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

const EventDetailedSidebar = () => {
    return (
        <EventDetailedSidebarWrapper>
            <p className='text-center '>2 People Going</p>

            <div className="sidebar-user">
                <Image src="/assets/user.png"/>
                <h5>Bob</h5>
            </div>
            <div className="sidebar-user">
                <Image src="/assets/user.png"/>
                <h5>Bob</h5>
            </div>
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
