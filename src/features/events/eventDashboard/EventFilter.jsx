import React from 'react';
import styled from "styled-components";
import {FaFilter} from "react-icons/fa";
import {BsFillCalendarFill} from "react-icons/bs"
import {Calendar} from "react-calendar";
import ListGroup from "react-bootstrap/ListGroup";

const EventFilters = ({predicate, setPredicate, loading}) => {
    return (
        <>
            <EventFiltersWrapper className='mt-5'>
                <div className="filter-part d-flex align-items-center my-blue-color ms-2">
                    <div>
                        <FaFilter/>
                    </div>
                    <div className='ms-2 mt-1 '>
                        Filters
                    </div>
                </div>
                <ListGroup variant='flush' className="filter-part-content border-top">
                    <ListGroup.Item
                        className=' border-0'
                        active={predicate.get('filter') === 'all'}
                        onClick={() => setPredicate('filter', "all")}
                        disabled={loading}
                    >
                        All Events
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mt-3 border-0'
                        active={predicate.get('filter') === 'isGoing'}
                        onClick={() => setPredicate('filter', "isGoing")}
                        disabled={loading}
                    >
                        I'm Going
                    </ListGroup.Item>
                    <ListGroup.Item
                        className='mt-3 border-0'
                        active={predicate.get('filter') === 'isHosting'}
                        onClick={() => setPredicate('filter', "isHosting")}
                        disabled={loading}
                    >
                        I'm Hosting
                    </ListGroup.Item>
                </ListGroup>
            </EventFiltersWrapper>
            <EventFiltersDateWrapper>
                <div className="date-part my-box-shadow d-flex align-items-center mt-5 my-blue-color">
                    <div>
                        <BsFillCalendarFill/>
                    </div>
                    <div className='ms-2 mt-1'>
                        Select Date
                    </div>
                </div>
                <Calendar
                    onChange={date => setPredicate('startDate', date)}
                    value={predicate.get('startDate') || new Date()}
                    tileDisabled={() => loading}
                    className='calendar-part my-box-shadow'
                />
                {/*date= date that's been selected*/}
            </EventFiltersDateWrapper>

        </>

    );
};

export default EventFilters;

const EventFiltersWrapper = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .filter-part {
      padding: 10px;
    }
    .filter-part-content {
      padding: 10px;
    }
    .list-group-item.active{
      background-color: white;
      //border-color: #36bff7;
      color: #36bff7;
      border: none;
      border-top: none;
    }
 
`

const EventFiltersDateWrapper = styled.div`
    
    .date-part {
      padding: 10px;
    }
   
`