import React, {useEffect, useState} from 'react';
import EventList from "./EventList";
import EventFilters from "./EventFilter";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

//Actions
import {fetchEvents, listenToEvents} from "../eventActions";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "styled-components";
// FireStore
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import listenToEventsFromFirestore from "../../../app/firestore/firestoreService";
import EventsFeed from "./EventsFeed";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/cjs/Spinner";


const EventDashboard = () => {
    const limit = 2
    const dispatch = useDispatch()
    const {events, moreEvents} = useSelector(state => state.event)
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}
    const {loading} = useSelector(state => state.async)
    const [loadingInitial, setLoadingInitial] = useState(false)
    const {authenticated} = useSelector(state => state.auth)
    const [lastDocSnapshot, setLastDocSnapshot] = useState(null)

    // Map: a javascript object that allows us to use certain methods. and get and set different elements in the map
    const [predicate, setPredicate] = useState(new Map([
        ['startDate', new Date()],
        ['filter', 'all']
    ]))

    function handleSetPredicate(key, value) {
        setPredicate(new Map(predicate.set(key, value)))
    }

    useEffect(() => {
        setLoadingInitial(true)
        dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible)
            setLoadingInitial(false)
        })
    }, [dispatch, predicate])

    function handleFetchNextEvent() {
        dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible)
        })
    }

    return (
        <EventDashboardWrapper>
            <Container>
                <Row>
                    <Col lg={8} md={"auto"}>
                        {loadingInitial &&
                        <>
                            <EventListItemPlaceholder/>
                            <EventListItemPlaceholder/>
                        </>
                        }
                        <EventList
                            events={events}
                        />
                        <Button variant={'light'} disabled={!moreEvents} onClick={handleFetchNextEvent} className='my-blue-btn-invert'>
                            {loading ? <Spinner animation='border' size='sm'/> : "More..."}
                        </Button>
                    </Col>
                    <Col lg={4} md={"auto"}>
                        {authenticated &&
                        <EventsFeed/>
                        }
                        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
                    </Col>
                </Row>
            </Container>
        </EventDashboardWrapper>

    );
};

export default EventDashboard;

const EventDashboardWrapper = styled.div`
    .my-blue-btn-invert{
      min-width: 100px;
    }
`