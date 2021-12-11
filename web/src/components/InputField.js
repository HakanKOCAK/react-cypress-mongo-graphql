import React from 'react'
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Textarea } from '@chakra-ui/react';

function InputField({ label, textArea, ...props }) {
    const [field, { error, touched }] = useField(props);

    let Type = Input;

    //Set input field type to textArea if specified
    if (textArea) {
        Type = Textarea
    }

    return (
        <FormControl isInvalid={touched && error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Type {...field} {...props} id={field.name} />
            <Box h="23px" mt={2}>
                {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
            </Box>
        </FormControl>
    )
}

InputField.propTypes = {
    label: PropTypes.string,
    textArea: PropTypes.bool
};

export default InputField;
