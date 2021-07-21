import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {Formik, Form as FormikForm,} from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../app/common/form/MyTextInput";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const LoginForm = () => {
    return (
        <ModalWrapper header='Sign in' size='md'>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={values => {
                    console.log(values)
                }}
            >
                {({isSubmitting, dirty, isValid}) => (
                    <LoginFormWrapper>
                        <FormikForm>
                            <MyTextInput className={`form-control ${!isValid && 'is-invalid'}` } name='email' placeholder='Email Address'/>
                            <MyTextInput className={`form-control ${!isValid && 'is-invalid'}` } name='password' placeholder='Password'
                                         type='password'/>
                            <Button
                                variant='light'
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type='submit'
                                className='my-blue-btn mt-3  w-100'
                            >
                                Login
                            </Button>
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