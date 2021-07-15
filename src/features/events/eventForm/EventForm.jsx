import React from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";

const EventForm = ({setFormOpen}) => {
    return (
        <Segment clearing>
            <Header content={'Create new event'}/>
            <Form>
                <Form.Field>
                    <input type="text" placeholder="Event Title"/>
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Category"/>
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Description"/>
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="City"/>
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Venue"/>
                </Form.Field>
                <Form.Field>
                    <input type="date" placeholder="Date"/>
                </Form.Field>
               <Button type="submit" basic floated={"right"} content='Submit'/>
               <Button type="submit" basic floated={"right"} onClick={() =>setFormOpen(false)} content='Cancel'/>
            </Form>
        </Segment>
    );
};

export default EventForm;
