import React from 'react'
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';

function InputField({ label, ...props }) {
    const [field, { error, touched }] = useField(props);
    return (
        <FormControl isInvalid={touched && error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} />
            {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}

InputField.propTypes = {
    label: PropTypes.string
};

export default InputField;
