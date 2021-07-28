import React from 'react';
import {useDispatch, useSelector} from "react-redux";

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

//Firestore
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {listenToEventFromFirestore} from "../../../app/firestore/firestoreService";
import {listenToEvents} from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponents";


const EventDetailedPage = ({match}) => {
    const dispatch = useDispatch()
    //match allows us to access to params(id)
    const event = useSelector((state) => state.event.events.find(e => e.id === match.params.id))
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}

    const {loading} = useSelector((state) => state.async)

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps:[match.params.id, dispatch]
        // when the eventId(match.params.id) changes rerun the use effect
    })


    if (loading || !event) return <LoadingComponent content='loading...'/>
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
                        <EventDetailedSidebar attendees={event?.attendees}/>
                        {/* ?: we may have attendees or not */}
                    </Col>
                </Row>
            </Container>
        </EventDetailedPageWrapper>
    );
};

export default EventDetailedPage;

const EventDetailedPageWrapper = styled.div`
  

`