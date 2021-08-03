import React from 'react';
import {Formik, Form as FormikForm} from 'formik';
import * as Yup from 'yup'

// Styled Component
import styled from "styled-components";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {toast} from "react-toastify";
import {updateUserProfile} from "../../../app/firestore/firestoreService";

const ProfileForm = ({profile}) => {
    return (
        <div>
            <Formik
                initialValues={{
                    displayName: profile.displayName,
                    description: profile.description
                }}
                validationSchema={Yup.object({
                    displayName: Yup.string().required()
                })}
                // we use async to able to loading(setSubmitting)
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        await updateUserProfile(values)
                    } catch (error) {
                        toast.error(error.message)
                    } finally {
                        setSubmitting(false)
                    }

                }}
            >
                {({isSubmitting, isValid, dirty}) => (
                    <ProfileFormWrapper>
                        <FormikForm className={'mt-3 py-2'}>
                            <MyTextInput name='displayName' placeholder='Display Name'/>
                            <MyTextArea name='description' placeholder='Description'/>
                            <Button variant='light' className='mt-3 my-blue-btn-invert ' type='submit'
                                    disabled={isSubmitting || !isValid || !dirty}>
                                {isSubmitting ?
                                    <div>
                                        < Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className='me-1'
                                        />
                                    </div>
                                    :
                                    <div>
                                        Update Form
                                    </div>

                                }
                            </Button>
                        </FormikForm>
                    </ProfileFormWrapper>

                )}

            </Formik>
        </div>
    );
};

export default ProfileForm;

const ProfileFormWrapper = styled.div`
  .my-blue-btn-invert{
    width: 150px; 
  }

`