import React, {useEffect} from 'react';
import {Formik, Form as FormikForm, Field} from 'formik';
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
import * as Yup from 'yup'

const EventDetailedChatForm = ({eventId, parentId, closeForm}) => {


    return (
        <Formik
            initialValues={{comment: ''}}
            validationSchema={Yup.object({
                comment: Yup.string().required()
            })}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                try {
                    await addEventChatComment(eventId, {...values, parentId})
                    resetForm()
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setSubmitting(false)
                    closeForm({open:false, commentId:null})
                }
            }}
        >
            {({isSubmitting, handleSubmit, isValid}) => (
                <ChatBtn>
                    <FormikForm className='form-control  border-0 '>
                        <Field name='comment'>
                            {({field}) => (
                                <div style={{position: 'relative'}}>
                                    {isSubmitting ? <Spinner animation="border" size='sm'/>
                                        :
                                        <textarea

                                            className='form-control w-100'
                                            {...field}
                                            placeholder='Enter your comment (Enter to submit, Shift + Enter for new line)'
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                    // do your normal behaviour
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault()
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        > </textarea>
                                    }
                                </div>
                            )}
                        </Field>
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
    
     .form-control:focus {
       box-shadow:none !important;
      
    }

    textarea {
      
    }
`