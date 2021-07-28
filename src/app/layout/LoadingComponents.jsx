import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const LoadingComponent = ({inverted=true, content='Loading...'}) => {
    return (
        <EventListItemPlaceholderWrapper>
            <div>
              <Spinner animation="border" />
            </div>
        </EventListItemPlaceholderWrapper>
    );
};

export default LoadingComponent;

const EventListItemPlaceholderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 410px;
  
`