import React from 'react';
import {useField} from "formik";
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'

import styled from "styled-components";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";

const MyPlaceInput = ({label, options, ...props}) => {
    // options: add places autocomplete some search options
    const [field, meta, helpers] = useField(props)

    function handleSelect(address) {
        geocodeByAddress(address)
            //address = the address that we select from our places auto complete
            .then((results) => getLatLng(results[0]))
            .then((latLng) => helpers.setValue({address, latLng}))
            // it won't be just a string of address it will be an object
            .catch((error) => helpers.setError(error));
    }

    function handleBlure(e) {
        field.onBlur(e)
        if (!field.value.latLng) {
            helpers.setValue({address: '', latLng: null})
        }
        // we check if it doesn't exist
    }

    return (

        <PlacesAutocomplete
            value={field.value['address']}
            //we are accessing a property of an object by it's name. it's bracket notation
            onChange={value => helpers.setValue({address: value})}
            onSelect={value => handleSelect(value)}
            searchOptions={options}
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <FormGroup error={meta.touched && !!meta.error}>

                    <input className={`form-control ${meta.touched && meta.error && 'is-invalid'}`} {...getInputProps({
                        name: field.name,
                        // onBlur: field.onBlur,
                        onBlur: (e) => handleBlure(e),
                        // onBlur check if someone touched the input and get out of it
                        ...props
                    })}/>
                    <FormControlWrapper>
                        {meta.touched && meta.error ? (
                            <Form.Label className=''> {meta.error['address']} </Form.Label>
                            // fix the error. it's error object not a string so we will have an error. so we want to get specifically the address error
                        ) : null}
                        {/*we only want to display the error  if the field has been touched not as soon as the form is open*/}

                        {suggestions?.length > 0 && (
                            // we can't use just .lenght on something doesn't exist
                            <Container style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}>
                                <ListGroup className='map-list-group mt-3' variant='flush' loading={loading}>
                                    {suggestions.map(suggestion => (
                                        <ListGroupItem
                                            className='border-0 map-input'  {...getSuggestionItemProps(suggestion)}>

                                            <p>{suggestion.formattedSuggestion.mainText}
                                                <span className='d-block'>
                                            {suggestion.formattedSuggestion.secondaryText}
                                            </span>
                                            </p>

                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Container>

                        )}
                    </FormControlWrapper>
                </FormGroup>
            )}

        </PlacesAutocomplete>

    )
};

export default MyPlaceInput;

const FormControlWrapper = styled.div`
  input {
    margin-top: 5px;
  }
  //.map-list-group {
  //  width: 100%;
  //  overflow-x: hidden;
  //}
  .list-group-item {
     overflow-x: hidden;
  }
  .map-input {
     cursor: pointer;
    
    p{
        font-size: 13px ;
        font-weight: bold;
        
      }
  span {
        font-size: 14px;
        font-weight: lighter;
      }
      :hover {
        background-color: #f5f5f5;
      }
  }
  .form-control {
    input {
    margin-top: 5px;
    }
    
  }
  .form-group {
    
    input{
      .error {
    border: 2px solid #FF6565;
  }
    }
  }

`