import React from 'react';
import styled from "styled-components";
import {FaFilter} from "react-icons/fa";
import {BsFillCalendarFill} from "react-icons/bs"
import {Calendar} from "react-calendar";

const EventFilters = () => {
    return (
        <>
            <EventFiltersWrapper className='mt-5'>
                <div className="filter-part d-flex align-items-center my-red-color">
                    <div>
                        <FaFilter/>
                    </div>
                    <div className='ms-2'>
                        Filters
                    </div>
                </div>
                <div className="filter-part-content border-top">
                    <div>
                        All Events
                    </div>
                    <div className='mt-3'>
                        I'm Going
                    </div>
                    <div className='mt-3'>
                        I'm Hosting
                    </div>
                </div>
            </EventFiltersWrapper>
            <EventFiltersDateWrapper>
                <div className="date-part my-box-shadow d-flex align-items-center mt-5 my-red-color">
                    <div>
                        <BsFillCalendarFill/>
                    </div>
                    <div className='ms-2'>
                        Select Date
                    </div>
                </div>
                <Calendar className='calendar-part my-box-shadow'/>
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
 
`

const EventFiltersDateWrapper = styled.div`
    
    .date-part {
      padding: 10px;
    }
   
`