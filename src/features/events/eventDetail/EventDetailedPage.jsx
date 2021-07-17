import React from 'react';
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

const EventDetailedPage = () => {
    return (

        <EventDetailedPageWrapper>
            <Container>
                <Row>
                   <Col md={"auto"} lg={6}>
                        <EventDetailedHeader/>
                        <EventDetailedInfo/>
                        <EventDetailedChat/>
                   </Col>
                    <Col md={"auto"} lg={4}>
                        <EventDetailedSidebar/>
                   </Col>
                </Row>
            </Container>
        </EventDetailedPageWrapper>
    );
};

export default EventDetailedPage;

const EventDetailedPageWrapper = styled.div`
  

`