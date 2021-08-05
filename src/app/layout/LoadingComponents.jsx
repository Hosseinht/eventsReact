import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const LoadingComponent = ({inverted=true, content='Loading...'}) => {
    return (
        <EventListItemPlaceholderWrapper>

            <div className='d-flex '>
              <Spinner animation="border" className='me-2' />
              <p className='fs-5'>...loading</p>
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