import React from 'react';
import {useSelector} from "react-redux";

import styled from "styled-components";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Components
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";


const EventDetailedPage = ({match}) => {
    //match allows us to access to params(id)
    const event = useSelector(state => state.event.events.find(e => e.id === match.params.id))
    return (

        <EventDetailedPageWrapper>
            <Container>
                <Row>
                    <Col md={"auto"} lg={6}>
                        <EventDetailedHeader event={event}/>
                        <EventDetailedInfo event={event}/>
                        <EventDetailedChat/>
                    </Col>
                    <Col md={"auto"} lg={4}>
                        <EventDetailedSidebar attendees={event.attendees}/>
                    </Col>
                </Row>
            </Container>
        </EventDetailedPageWrapper>
    );
};

export default EventDetailedPage;

const EventDetailedPageWrapper = styled.div`
  

`