import React from 'react'
import { HStack, Heading } from '@chakra-ui/layout'

const Brand = ({ containerStyles, animation, headingStyles, onClick }) => {
  const defaultContainerStyles = containerStyles || {
    mb: 10,
    w: '100%',
    justifyContent: 'center'
  };

  const defaultHeadingStyles = headingStyles || {
    size: '2xl'
  }

  return (
    <HStack {...defaultContainerStyles} animation={animation}>
      <Heading
        cursor={onClick ? 'pointer' : ''}
        onClick={() => {
          if (onClick) {
            onClick();
          }

          return;
        }}
        {...defaultHeadingStyles}
        color="#38B2AC"
      >Food
        <span style={{ color: '#ED64A6' }}>er</span>
      </Heading>
    </HStack >
  )
}

export default Brand;

