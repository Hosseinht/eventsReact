import React from 'react';
import {useField, useFormikContext} from "formik";
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const MyDateInput = ({label, ...props}) => {
    const {setFieldValue} = useFormikContext()
    const [field, meta] = useField(props)

    return (
        <Form.Group error={meta.touched && !!meta.error}>

            <label>{label}</label>
            <DatePicker
                className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => setFieldValue(field.name, value)}
            />

            {meta.touched && meta.error ? (
                <Form.Label className=''> {meta.error} </Form.Label>
            ) : null}

        </Form.Group>
    )
};

export default MyDateInput;