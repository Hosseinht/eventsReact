import React from 'react';
import Container from "react-bootstrap/Container";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/cjs/Button";
import {Link} from "react-router-dom";
import styled from "styled-components";

const ErrorComponent = () => {
    const {error} = useSelector((state) => state.async)
    return (
        <ErrorComponentWrapper>
            <Container className='my-container'>
                <h2 className='text-center'>{error?.message || 'Oops - we have an error'}</h2>
                <Button as={Link} to={'/events'} variant='light' className='my-blue-btn mt-5'>
                    Return to events page
                </Button>
            </Container>
        </ErrorComponentWrapper>

    );
};

export default ErrorComponent;

const ErrorComponentWrapper = styled.div`
 
  .my-container {
       min-height: 60vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

`