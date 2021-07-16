import React, {useState} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";

const EventForm = ({setFormOpen, setEvents}) => {
    const initialValues = {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
    }

    const [values, setValues] = useState(initialValues)

    function handleFormSubmit() {
        console.log(values)
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
        // it allows us to spread all of the properties inside of values
        // This says we're copying all of the current values, using spread operator.But the one that matches the name of the input
        //that we are changing we're going to set to whatever  its value is that we get from e.target value
    }

    return (
        <Segment clearing>
            <Header content={'Create new event'}/>
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={values.title}
                        name='title'
                        onChange={(e) => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Category"
                        value={values.category}
                        name='category'
                        onChange={(e) => handleInputChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Description"
                        value={values.description}
                        name='description'
                        onChange={(e) => handleInputChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="City"
                        value={values.city}
                        name='city'
                        onChange={(e) => handleInputChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Venue"
                        value={values.venue}
                        name='venue'
                        onChange={(e) => handleInputChange(e)}/>
                </Form.Field>
                <Form.Field>
                    <input
                        type="date"
                        placeholder="Date"
                        value={values.date}
                        name='date'
                        onChange={(e) => handleInputChange(e)}/>
                </Form.Field>
                <Button type="submit" basic floated={"right"} content='Submit'/>
                <Button type="submit" basic floated={"right"} onClick={() => setFormOpen(false)} content='Cancel'/>
            </Form>
        </Segment>
    );
};

export default EventForm;
