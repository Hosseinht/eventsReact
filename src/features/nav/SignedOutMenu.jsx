import React from 'react';
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {openModal} from "../../app/common/modals/modalReducer";


const SignedOutMenu = () => {
    const dispatch = useDispatch()
    return (
        <SignoutMenuWrapper>
            <Button onClick={() => dispatch(openModal({modalType: 'LoginForm'}))} variant='light'
                    className='singout-btn py-2'> Login </Button>{' '}
            <Button variant='outline-light' className='singout-btn py-2'> Register </Button>
        </SignoutMenuWrapper>
    )
};

export default SignedOutMenu;

const SignoutMenuWrapper = styled.div`
  margin-right: 5px;
  .singout-btn {
    box-shadow: none;
    border: none;
    color:#36bff7;
    font-weight:bold;
    background-color: transparent;
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