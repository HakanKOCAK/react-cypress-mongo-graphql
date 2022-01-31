import React from 'react'
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text
} from '@chakra-ui/react';

const CreditCard = ({
  actionIcon,
  background,
  cursor,
  onClick,
  actionIconOnClick,
  details
}) => {

  const getIconSpecs = () => {
    const issuer = details.issuer;

    switch (issuer) {
      case 'visa':
        return { src: '/visa.png', borderRadius: 'full' };
      case 'mastercard':
        return { src: '/mastercard.svg', borderRadius: 'full' };
      case 'maestro':
        return { src: '/maestro.png' };
      case 'amex':
        return { src: '/amex.png' };
      default:
        return { src: '/credit_card.svg', borderRadius: 'full' };
    }
  }


  return (
    <HStack
      spacing={2}
      boxShadow="md"
      cursor={cursor}
      bg={background ? background : 'gray.100'}
      h="60px"
      w="100%"
      mb={5}
    >
      <HStack w="100%" onClick={onClick}>
        <Box w={['30px', '40px', '50px']}>
          <Icon as={() => <Image alt="Card" {...getIconSpecs()} />} />
        </Box>

        <Box>
          <Heading fontSize={['15px', '18px', '18px']}>{details.description}</Heading>
          <Text fontSize={['13px', '16px', '16px']} letterSpacing={[1, 2, 3]}>{details.number}</Text>
        </Box>
      </HStack>
      {/* Check if an action icon exists and render */}
      {actionIcon && (
        <HStack
          w="50px"
          alignItems="center"
          justifyContent="center"
          onClick={actionIconOnClick}
          cursor="pointer"
          data-cy={`delete-card-${details.description.split(' ').join('-')}-btn`}
        >
          {actionIcon}
        </HStack>
      )
      }
    </HStack >
  )
}

CreditCard.propTypes = {
  actionIcon: PropTypes.element,
  actionIconOnClick: PropTypes.func,
  background: PropTypes.string,
  cursor: PropTypes.string,
  icon: PropTypes.string,
  details: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    issuer: PropTypes.string
  }),
  onClick: PropTypes.func
}

export default CreditCard
