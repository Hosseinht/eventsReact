import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const EventListItemPlaceholder = () => {
    return (
        <EventListItemPlaceholderWrapper>
            <div>
              <Spinner animation="border" />
            </div>
        </EventListItemPlaceholderWrapper>
    );
};

export default EventListItemPlaceholder;

const EventListItemPlaceholderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 410px;
  
`