import {useField} from "formik";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import {categoryData} from "../../api/categorySnippet";

const MySelectInput = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return (
        <Form.Group error={meta.touched && !!meta.error}>
            {/*<label htmlFor={props.is || props.name} >{label}</label>*/}
            <select className={`form-select form-control ${meta.touched && meta.error && 'is-invalid'}`}  {...field} {...props} />
            {meta.touched && meta.error ? (
                <Form.Label className=''> {meta.error} </Form.Label>
            ) : null}
        </Form.Group>
        // <FormGroup error={meta.touched && !!meta.error}>
        //     {/*error is an object with !! it's a boolean */}
        //     {/*if there is string we want it to be true if not we want it to be false. if both true form field border will be red */}
        //     <label>{label}</label>
        //     {/*we don't really use it in our application. it's label above our inputs*/}
        //
        //     <select className='form-select '{...field} {...props} />
        //
        //
        //     {meta.touched && meta.error ? (
        //         <Form.Label className='error is-invalid'> {meta.error} </Form.Label>
        //     ) : null}
        //     {/*we only want to display the error  if the field has been touched not as soon as the form is open*/}
        //
        // </FormGroup>
    )
};

export default MySelectInput;