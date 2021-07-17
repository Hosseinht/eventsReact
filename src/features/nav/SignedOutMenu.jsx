import React from 'react';
import Button from "react-bootstrap/Button";
import styled from "styled-components";


const SignedOutMenu = () => {
    return (
        <SignoutMenuWrapper>
            <Button variant='outline-dark' className='singout-btn py-2'> Login </Button>{' '}
            <Button variant='outline-dark' className='singout-btn py-2'> Register </Button>
        </SignoutMenuWrapper>
    )
};

export default SignedOutMenu;

const SignoutMenuWrapper = styled.div`
  margin-right: 5px;
  .singout-btn {
    box-shadow: none;
    :hover{
    background-color:#95D2EC ;
    color: white;
    border: none;
    }
  }
  
`
// <Menu.Item position='right'>
//            <Button className={"login-btn"} basic content='Login'/>
//            <Button className={'signup-btn'} basic content='Register' style={{marginLeft: '0.5em'}}/>
//        </Menu.Item>
//    );