import React from 'react';
import {useField} from "formik";
import Form from "react-bootstrap/Form";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <Form.Group error={meta.touched && !!meta.error}>

            {/*error is an object with !! it's a boolean */}
            {/*if there is string we want it to be true if not we want it to be false. if both true form field border will be red */}
            <label>{label}</label>
            {/*we don't really use it in our application. it's label above our inputs*/}
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Form.Label> {meta.error} </Form.Label>
            ) : null}
            {/*we only want to display the error  if the field has been touched not as soon as the form is open*/}
        </Form.Group>
    )
};

export default MyTextInput;
