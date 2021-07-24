/* global google */
import React from 'react';
import cuid from "cuid";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form as FormikForm} from 'formik';

import * as Yup from 'yup'
// Styled Component
import styled from "styled-components";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {createEvent, updateEvent} from "../eventActions";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";


const EventForm = ({match, history}) => {

    const dispatch = useDispatch();
    const selectedEvent = useSelector((state) =>
        state.event.events.find((e) => e.id === match.params.id)
    );
    // event is the reducer and events is property for events that we're storing our events. initialState{events:sampleData}
    // - ?? is null conditional validator. if it's null we pass anything to the right
    // if it's not our initial value is going to be set to our selectedEvent
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: {
            address: '',
            latLng: null
        },
        venue: {
            address: '',
            latLng: null
        },
        date: '',
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("You must provide a title"),
        category: Yup.string().required("You must provide a category"),
        description: Yup.string().required("description is required"),
        city: Yup.object().shape({
            address: Yup.string().required("City is required")
        }),
        venue: Yup.object().shape({
            address: Yup.string().required("Venue is required")
        }),
        date: Yup.string().required("Data is required"),
    })

    return (
        <EventFormWrapper>
            <Container className='form-container rounded-1'>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // we don't all the properties in our form and  we don't want to lose the properties from our selected event
                        // selected event contain all the information in sampleData and the data there is more than we have in our form
                        //with spread operator we will have all those properties
                        selectedEvent ?
                            dispatch(updateEvent({...selectedEvent, ...values})) :
                            dispatch(createEvent({
                                ...values,
                                id: cuid(),
                                hostedBy: 'Bob',
                                attendees: [],
                                hostPhotoURL: '/assets/user.png'
                            }));
                        history.push('/events');
                        console.log(values)
                    }}
                >
                    {({isSubmitting, dirty, isValid, values}) => (
                        <FormikForm>
                            <h3 className='text-muted fs-5'>Event Detail</h3>
                            <MyTextInput name='title' placeholder="Event Title"/>
                            <MySelectInput className='form-select' label='Category' name='category'>
                                <option> Select a Category</option>
                                <option value="drinks">Drink</option>
                                <option value="culture">Culture</option>
                                <option value="film">Film</option>
                                <option value="food">Food</option>
                                <option value="Music">music</option>
                                <option value="Travel">travel</option>
                            </MySelectInput>
                            <MyTextArea name='description' placeholder="Description"/>
                            <h3 className='text-muted fs-5 mt-5'>Event Location</h3>
                            <MyPlaceInput
                                className='form-control mt-3'
                                name='city'
                                placeholder="City"

                            />
                            <MyPlaceInput
                                className='form-control mt-3'
                                name='venue'
                                disabled={!values.city.latLng}
                                placeholder="Venue"
                                options={{
                                    location: new google.maps.LatLng(values.city.latLng),
                                    radius: 1000, //it's 1000KM
                                    type: ['establishment']
                                }}
                            />
                            {/*<MyTextInput name='date' placeholder='Event Data' type='datetime-local'/>*/}
                            <MyDateInput
                                className='form-control'
                                name='date'
                                placeholderText="Event Date"
                                timeFormat="HH:mm"
                                dateFormat="MMMM d, yyyy h:mm a"
                                showTimeSelect
                                timeCaption='time'
                            />

                            <div className="form-btn mt-5">
                                <Button
                                    disabled={isSubmitting}
                                    as={Link} to='/events'
                                    className='my-red-btn'
                                    variant="light"
                                    type="submit"
                                >
                                    Cancel
                                </Button> {""}
                                <Button
                                    className='my-blue-btn'
                                    variant="light"
                                    type='submit'
                                    loading={isSubmitting}
                                    disabled={!isValid || !dirty || isSubmitting}
                                >
                                    Submit
                                </Button>
                            </div>
                        </FormikForm>
                    )}

                </Formik>
            </Container>
        </EventFormWrapper>


    );
};

export default EventForm;

const EventFormWrapper = styled.div`
    select{
      margin-top: 20px;
    }
    .form-label {
      color: #f83b1e;
      border-color: #f83b1e;
      margin: 10px 0 0 10px;
    }
    .form-container {
       box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px ;
       padding: 40px;
      
    }
    .form-group {
      //margin-top: 20px !important;
    }
   
    .form-btn-cancel {
      margin-right: 5px;
      box-shadow: none !important;
      
    }
    .form-btn-submit {
      box-shadow: none !important;
      
        
    }
    
    
 
 }
    //input {
    //  padding: 10px 0;
    //  
    //}
    //placeholder {
    //  margin-left: 5px;    
    //}
`
// <Segment clearing>
//            <Header content={selectedEvent ? 'Edit' : 'Create new event'}/>
//            <Form onSubmit={handleFormSubmit}>
//                <Form.Field>
//                    <input
//                        type="text"
//                        placeholder="Event Title"
//                        value={values.title}
//                        name='title'
//                        onChange={handleChange}
//                    />
//                </Form.Field>
//                <Form.Field>
//                    <input
//                        type="text"
//                        placeholder="Category"
//                        value={values.category}
//                        name='category'
//                        onChange={(e) => handleInputChange(e)}/>
//                </Form.Field>
//                <Form.Field>
//                    <input
//                        type="text"
//                        placeholder="Description"
//                        value={values.description}
//                        name='description'
//                        onChange={(e) => handleInputChange(e)}/>
//                </Form.Field>
//                <Form.Field>
//                    <input
//                        type="text"
//                        placeholder="City"
//                        value={values.city}
//                        name='city'
//                        onChange={(e) => handleInputChange(e)}/>
//                </Form.Field>
//                <Form.Field>
//                    <input
//                        type="text"
//                        placeholder="Venue"
//                        value={values.venue}
//                        name='venue'
//                        onChange={(e) => handleInputChange(e)}/>
//                </Form.Field>
//                <Form.Field>
//                    <input
//                        type="date"
//                        placeholder="Date"
//                        value={values.date}
//                        name='date'
//                        onChange={(e) => handleInputChange(e)}/>
//                </Form.Field>
//                <Button type="submit" basic floated={"right"} content='Submit'/>
//                <Button type="submit" basic floated={"right"} onClick={() => setFormOpen(false)} content='Cancel'/>
//            </Form>
//        </Segment>