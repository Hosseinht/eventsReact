import React from 'react';
import {Formik, Form as FormikForm} from "formik";
import * as Yup from 'yup'

import styled from "styled-components";


import MyTextInput from "../../app/common/form/MyTextInput";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {updateUserPassword} from "../../app/firestore/firebaseService";
import Spinner from "react-bootstrap/Spinner";

const AccountPage = () => {
    const {currentUser} = useSelector((state) => state.auth)
    return (
        <AccountPageWrapper>
            <Container className='w-75'>
                <p className='display-6'>Account</p>
                {currentUser.providerId === 'password' &&
                <>
                    <p>Use this form to change your password</p>
                    <Formik
                        initialValues={{newPassword1: '', newPassword2: ''}}
                        validationSchema={Yup.object({
                            newPassword1: Yup.string().required('Password is required'),
                            newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], "Passwords do not match")
                        })}
                        onSubmit={async (values, {setSubmitting, setErrors}) => {
                            try {
                                await updateUserPassword(values)
                                setSubmitting(false)
                            } catch (error) {
                                setErrors({auth: error.message})
                                setSubmitting(false)
                            }
                        }}
                    >
                        {({errors, isSubmitting, isValid, dirty}) => (
                            <FormikForm>
                                <MyTextInput name='newPassword1' type='password' placeholder='New Password'/>
                                <MyTextInput name='newPassword2' type='password' placeholder='Confirm Password'/>
                                {errors.auth &&
                                <div className='p-2'>
                                    <span className='my-red-color'>{errors.auth}</span>
                                </div>
                                }
                                <Button type='submit' variant='light' className='my-blue-btn mt-3 mb-5'
                                        disabled={!isValid || isSubmitting || !dirty}>
                                    {isSubmitting && <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className='me-2'
                                    />}
                                    Update Password
                                </Button>
                            </FormikForm>
                        )}

                    </Formik>
                </>
                }
                {currentUser.providerId === 'facebook.com' &&
                <div className="facebook-part mb-4">
                    <p className='fs-5 my-blue-color'>Facebook account</p>
                    <p>Please visit Facebook to update your account</p>
                    <Button
                        className='facebook-btn  mb-3  p-2'
                        variant='light'
                        as={Link}
                        to="https://facebook.com"
                    >
                        <div className='d-flex justify-content-center align-items-center'>
                            <FaFacebookSquare size='20px' className='me-2 mt-1 '/> Go to Facebook
                        </div>

                    </Button>
                </div>
                }
                {currentUser.providerId === 'google.com' &&
                <div className="facebook-part">
                    <p className='fs-5 my-blue-color'>Google account</p>
                    <p>Please visit Google to update your account</p>
                    <Button
                        className='google-btn  mb-3  p-2'
                        variant='light'
                        as={Link}
                        to="https://google.com"
                    >
                        <div className='d-flex justify-content-center align-items-center'>
                            <FaGoogle size='20px' className='me-2 mt-1'/> Go to Google
                        </div>

                    </Button>
                </div>
                }
            </Container>
        </AccountPageWrapper>
    );
};

export default AccountPage;

const AccountPageWrapper = styled.div`
  
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