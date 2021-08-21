import React from 'react';
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {closeModal} from "../../app/common/modals/modalReducer";
import {socialLogin} from "../../app/firestore/firebaseService";

const SocialLogin = () => {
    const dispatch = useDispatch()

    function handleSocialLogin(provider) {
        dispatch(closeModal());
        socialLogin(provider)
    }

    return (
        <SocialLoginWrapper>
            <Button onClick={() => handleSocialLogin('google')} className='google-btn w-100  d-flex justify-content-center align-items-center p-2' variant='light'>
                <FaGoogle  size='20px' className='me-2 mt-1'/>Login with Google </Button>
        </SocialLoginWrapper>
    );
};

export default SocialLogin;

const SocialLoginWrapper = styled.div`
  color: white;
  .facebook-btn {
    background-color: #4267B2;
    padding-bottom: 10px!important;
     color: white;
  }
  .google-btn{
    background-color: #DB4437;
    padding-bottom: 10px!important;
     color: white;
  }
`