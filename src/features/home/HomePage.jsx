import React from 'react';
import {Container, Segment} from "semantic-ui-react";
import styled from 'styled-components'

const HomePage = () => {
    return (
            <HomeWrapper>
                <h1>Congratulations! you found the empty Home page:)</h1>
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
