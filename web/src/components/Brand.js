import React from 'react';
import PropTypes from 'prop-types';
import { HStack, Heading } from '@chakra-ui/layout'

const Brand = ({ containerStyles, animation, headingStyles, onClick }) => {
  const defaultContainerStyles = {
    mb: 10,
    w: '100%',
    justifyContent: 'center'
  };

  const defaultHeadingStyles = {
    size: '2xl'
  }

  return (
    <HStack {...defaultContainerStyles} {...containerStyles} animation={animation}>
      <Heading
        cursor={onClick ? 'pointer' : ''}
        onClick={() => {
          if (onClick) {
            onClick();
          }

          return;
        }}
        {...defaultHeadingStyles}
        {...headingStyles}
        color="#38B2AC"
      >Food
        <span style={{ color: '#ED64A6' }}>er</span>
      </Heading>
    </HStack >
  )
}

Brand.propTypes = {
  containerStyles: PropTypes.object,
  headingStyles: PropTypes.object,
  animation: PropTypes.string,
  onClick: PropTypes.func
}

export default Brand;
