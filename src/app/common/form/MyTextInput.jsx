import React from 'react';
import {useField} from "formik";
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'

import styled from "styled-components";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <FormGroup error={meta.touched && !!meta.error}>
            {/*error is an object with !! it's a boolean */}
            {/*if there is string we want it to be true if not we want it to be false. if both true form field border will be red */}
            <label>{label}</label>
            {/*we don't really use it in our application. it's label above our inputs*/}

            <input className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}  {...field} {...props}/>
            <FormControlWrapper>
                {meta.touched && meta.error ? (
                    <Form.Label className=''> {meta.error} </Form.Label>
                ) : null}
                {/*we only want to display the error  if the field has been touched not as soon as the form is open*/}
            </FormControlWrapper>

        </FormGroup>
    )
};

export default MyTextInput;

const FormControlWrapper = styled.div`
  .form-group {
    input{
      .error {
    border: 2px solid #FF6565;
  }
    }
  }
  
`