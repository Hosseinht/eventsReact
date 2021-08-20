import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {Formik, Form as FormikForm,} from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {closeModal} from "../../app/common/modals/modalReducer";
import {signInWithEmail} from "../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
    const dispatch = useDispatch()
    return (
        <ModalWrapper header='Sign in' size='md'>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    //setSubmitting give us ability to turn off the submitting status or set it to false after submitted data
                    try {
                        await signInWithEmail(values)
                        setSubmitting(false)
                        dispatch(closeModal())
                    } catch (error) {
                        setErrors({auth: error.message})
                        // because we are using modal we don't use toast
                        setSubmitting(false)
                    }
                }}
            >
                {({isSubmitting, dirty, isValid, errors}) => (
                    <LoginFormWrapper>
                        <FormikForm>
                            <MyTextInput className={`form-control ${!isValid && 'is-invalid'}`} name='email'
                                         placeholder='Email Address'/>
                            <MyTextInput className={`form-control ${!isValid && 'is-invalid'}`} name='password'
                                         placeholder='Password'
                                         type='password'/>
                            {errors.auth &&
                            <div className='p-2'>
                                <span className='my-red-color'>{errors.auth}</span>
                            </div>
                            }
                            <Button
                                variant='light'
                                disabled={!isValid || !dirty || isSubmitting}
                                type='submit'
                                className='my-blue-btn-invert mt-3 mb-3 w-100'
                            >
                                {isSubmitting && <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className='me-2'
                                />}

                                Login
                            </Button>
                            <p className='text-center'>Or</p>
                            <SocialLogin/>
                        </FormikForm>
                    </LoginFormWrapper>

                )}
            </Formik>
        </ModalWrapper>
    );
};

export default LoginForm;

const LoginFormWrapper = styled.div`
  .form-label {
    color: red;
    padding: 5px;
    margin-left: 5px;
    
  }
`