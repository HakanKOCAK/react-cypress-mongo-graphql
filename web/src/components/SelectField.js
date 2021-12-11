import React from 'react'
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Box, Select } from '@chakra-ui/react';

const SelectField = ({ label, options, ...props }) => {
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={touched && error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props} id={field.name}>
        {
          (options).map((opt, index) => (
            <option key={`${field.name}${index}`} value={opt}>{opt}</option>
          ))
        }
      </Select>
      <Box h="23px" mt={2}>
        {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
      </Box>
    </FormControl>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectField
