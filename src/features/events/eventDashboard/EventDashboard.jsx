import React, {useEffect, useState} from 'react';
import EventList from "./EventList";
import EventFilters from "./EventFilter";
import {useDispatch, useSelector} from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import styled from "styled-components";

//Actions
import {fetchEvents} from "../eventActions";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import EventsFeed from "./EventsFeed";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {RETAIN_STATE} from "../eventConstant";

const EventDashboard = () => {
    const limit = 2
    const dispatch = useDispatch()
    const {events, moreEvents, filter, startDate, lastVisible, retainState} = useSelector(state => state.event)
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}
    const {loading} = useSelector(state => state.async)
    const [loadingInitial, setLoadingInitial] = useState(false)
    const {authenticated} = useSelector(state => state.auth)


    useEffect(() => {
        if (retainState) return;
        setLoadingInitial(true);
        dispatch(fetchEvents(filter, startDate, limit)).then(() => {
            setLoadingInitial(false);
        });
        return () => {
            dispatch({type: RETAIN_STATE})
        }
    }, [dispatch, filter, startDate, retainState]);

    function handleFetchNextEvent() {
        dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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
                            getNextEvents={handleFetchNextEvent}
                            loading={loading}
                            moreEvents={moreEvents}
                        />

                    </Col>
                    <Col lg={4} md={"auto"}>
                        {authenticated &&
                        <EventsFeed/>
                        }
                        <EventFilters loading={loading}/>
                    </Col>
                    <Col lg={8} md={"auto"}>
                        {loading &&
                        <LoadingComponent/>
                        }
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