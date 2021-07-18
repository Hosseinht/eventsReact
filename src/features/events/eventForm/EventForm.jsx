import React, {useState} from 'react';
import cuid from "cuid";
import {useDispatch, useSelector} from "react-redux";
// Styled Component
import styled from "styled-components";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {createEvent, updateEvent} from "../eventActions";


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
        city: '',
        venue: '',
        date: '',
    }

    const [values, setValues] = useState(initialValues)

    function handleFormSubmit() {
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
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
        // it allows us to spread all of the properties inside of values
        // This says we're copying all of the current values, using spread operator.But the one that matches the name of the input
        //that we are changing we're going to set to whatever  its value is that we get from e.target value
    }

    return (
        <EventFormWrapper>
            <Container className=''>
                <Form onSubmit={handleFormSubmit}>
                    <h3>{selectedEvent ? 'Edit' : 'Create new event'}</h3>
                    <Form.Group className="mb-3 " controlId="titleInput">
                        {/*<Form.Label>Event Title</Form.Label>*/}
                        <Form.Control
                            type="text"
                            placeholder="Event Title"
                            value={values.title}
                            name='title'
                            onChange={(e) => handleInputChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="categoryInput">
                        <Form.Control
                            type="text"
                            placeholder="Category"
                            value={values.category}
                            name='category'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descriptionInput">
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            value={values.description}
                            name='description'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cityInput">
                        <Form.Control
                            type="text"
                            placeholder="City"
                            value={values.city}
                            name='city'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="venueInput">
                        <Form.Control
                            type="text"
                            placeholder="Venue"
                            value={values.venue}
                            name='venue'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateInput">
                        <Form.Control
                            type="date"
                            placeholder="Date"
                            value={values.date}
                            name='date'
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Form.Group>
                    <div className="form-btn">
                        <Button
                            as={Link} to='/events'
                            className='my-red-btn'
                            variant="light"
                            type="submit"

                        >
                            Cancel
                        </Button> {""}
                        <Button className='my-blue-btn' variant="light" type='submit'>
                            Submit
                        </Button>
                    </div>

                </Form>
            </Container>
        </EventFormWrapper>


    );
};

export default EventForm;

const EventFormWrapper = styled.div`
    .form-group {
      margin-top: 20px !important;
    }
   
    .form-btn-cancel {
      margin-right: 5px;
      box-shadow: none !important;
      
    }
    .form-btn-submit {
      box-shadow: none !important;
      
        
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
//                        onChange={(e) => handleInputChange(e)}
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