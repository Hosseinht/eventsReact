import React from 'react';
import styled from "styled-components";
import {Calendar} from "react-calendar";
import {useDispatch, useSelector} from "react-redux";

import {FaFilter} from "react-icons/fa";
import {BsFillCalendarFill} from "react-icons/bs"
import ListGroup from "react-bootstrap/ListGroup";

import {setFilter, setStartDate} from "../eventActions";

const EventFilters = ({loading}) => {
    const dispatch = useDispatch()
    const {authenticated} = useSelector(state => state.auth)
    const {filter, startDate} = useSelector((state) => state.event);

    return (
        <>
            <EventFiltersWrapper className='mt-5'>
                {authenticated &&
                <div>
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
                            active={filter === 'all'}
                            onClick={() => dispatch(setFilter('all'))}
                            disabled={loading}
                        >
                            All Events
                        </ListGroup.Item>
                        <ListGroup.Item
                            className='mt-3 border-0'
                            active={filter === 'isGoing'}
                            onClick={() => dispatch(setFilter('isGoing'))}
                            disabled={loading}
                        >
                            I'm Going
                        </ListGroup.Item>
                        <ListGroup.Item
                            className='mt-3 border-0'
                            active={filter === 'isHosting'}
                            onClick={() => dispatch(setFilter('isHosting'))}
                            disabled={loading}
                        >
                            I'm Hosting
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                }
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
                    onChange={(date) => dispatch(setStartDate(date))}
                    value={startDate || new Date()}
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
      cursor: pointer;
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