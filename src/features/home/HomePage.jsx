import React from 'react';
import styled from 'styled-components'
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
            <HomeWrapper>
                <h1>Hello, This is the empty Home page:)</h1>
                <Button as={Link} to='/events' className='my-blue-btn-invert mt-3 p-2 w-25'>Events</Button>
            </HomeWrapper>
    );
};

export default HomePage;

const HomeWrapper = styled.div`
 .ui.main.container {
    margin-top: 0 !important;
  }
  margin-top: 0 !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`
