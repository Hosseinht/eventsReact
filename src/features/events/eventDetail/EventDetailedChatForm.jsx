import React, {useEffect} from 'react';
import {Formik, Form as FormikForm} from 'formik';
import {toast} from "react-toastify";
import {addEventChatComment, firebaseObjectToArray, getEventChatRef} from "../../../app/firestore/firebaseService";
import MyTextArea from "../../../app/common/form/MyTextArea";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/cjs/Spinner";
import {FaRegEdit} from "react-icons/fa";
// Styled Component
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {listenToEventChat} from "../eventActions";

const EventDetailedChatForm = ({eventId}) => {


    return (
        <Formik
            initialValues={{comment: ''}}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                try {
                    await addEventChatComment(eventId, values.comment)
                    resetForm()
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({isSubmitting}) => (
                <ChatBtn>
                    <FormikForm>
                        <MyTextArea
                            name='comment'
                            placeholder='Please enter your comment here'
                        />

                        <Button type='submit' variant='light' className='w-20 my-blue-btn-invert mt-2 '>
                            {isSubmitting ?
                                <Spinner animation='border' size='sm'/> :
                                <div className='d-flex justify-content-center align-items-center'>
                                    <FaRegEdit className='me-1'/> Add reply
                                </div>
                            }
                        </Button>

                    </FormikForm>
                </ChatBtn>
            )}
        </Formik>
    );
};

export default EventDetailedChatForm;

const ChatBtn = styled.div`
    .my-blue-btn-invert{
       min-width: 130px ; 
    }

`