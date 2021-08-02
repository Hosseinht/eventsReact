import React from 'react';
import {useHistory} from "react-router-dom";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {Formik, Form as FormikForm,} from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {closeModal} from "../../app/common/modals/modalReducer";
import {registerInFirebase, signInWithEmail} from "../../app/firestore/firebaseService";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <ModalWrapper header='Register' size='md'>
            <Formik
                initialValues={{displayName: '', email: '', password: ''}}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    //setSubmitting give us ability to turn off the submitting status or set it to false after submitted data
                    try {
                        await registerInFirebase(values)
                        setSubmitting(false)
                        dispatch(closeModal())
                        history.push('/events')
                    } catch (error) {
                        setErrors({auth: error.message})
                        setSubmitting(false)
                    }
                }}
            >
                {({isSubmitting, dirty, isValid, errors}) => (
                    <LoginFormWrapper>
                        <FormikForm>
                            <MyTextInput className={`form-control ${!isValid && 'is-invalid'}`} name='displayName'
                                         placeholder='Display Name'/>
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
                                className='my-blue-btn mt-3  w-100'
                            >
                                {isSubmitting && <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className='me-2'
                                />}

                                Register
                            </Button>
                        </FormikForm>
                    </LoginFormWrapper>

                )}
            </Formik>
        </ModalWrapper>
    );
};

export default RegisterForm;

const LoginFormWrapper = styled.div`
  .form-label {
    color: red;
    padding: 5px;
    margin-left: 5px;
    
  }
`