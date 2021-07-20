import React from 'react';
import {useField} from "formik";
import {Field} from "formik";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const MyTextArea = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (

        <Form.Group  error={meta.touched && !!meta.error}>

            {/*error is an object with !! it's a boolean */}
            {/*if there is string we want it to be true if not we want it to be false. if both true form field border will be red */}
            <label>{label}</label>
            {/*we don't really use it in our application. it's label above our inputs*/}

            <textarea className={`form-select ${meta.touched && meta.error && 'is-invalid'}`}{...field} {...props}/>



            {meta.touched && meta.error ? (
                // <FormControlWrapper>
                    <Form.Label> {meta.error} </Form.Label>
                // </FormControlWrapper>
            ) : null}
            {/*we only want to display the error  if the field has been touched not as soon as the form is open*/}


        </Form.Group>
    )
};

export default MyTextArea;
