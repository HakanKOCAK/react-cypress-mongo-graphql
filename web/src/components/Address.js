import React from 'react'
import PropTypes from 'prop-types';
import Icon from '@chakra-ui/icon'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text
} from '@chakra-ui/layout'
import { useTranslation } from 'react-i18next';

//This is the address container in home and screen and address list
const Address = ({
  actionIcon,
  actionIconOnClick,
  containerStyle,
  details,
  icon,
  onClick
}) => {
  const { t } = useTranslation();

  //Check if there is no address -> Only can be rendered by Home screen if user does not have selected address
  if (!details.address) {
    return (
      <Flex justifyContent="center">
        <HStack
          p={5}
          spacing={2}
          boxShadow="xl"
          rounded="3xl"
          bg="gray.100"
          w="620px"
          onClick={onClick}
          cursor="pointer"
          {...containerStyle}
        >
          <Box w="90%">
            <Text fontSize={['10px', '12px', '16px']}>{t('pleaseSelectAnAddress')}</Text>
          </Box>
          <Box w="10%" justifyContent="flex-end">
            <ChevronDownIcon />
          </Box>
        </HStack>
      </Flex>
    )
  }
  return (
    <Flex justifyContent="center">
      <HStack
        boxShadow="xl"
        rounded="3xl"
        bg="gray.100"
        w="620px"
        data-cy={`address${details.id}`}
        {...containerStyle}
      >
        <HStack
          spacing={5}
          cursor="pointer"
          p={3}
          onClick={onClick}
        >
          <Box w={['15%', '13%', '10%']}>
            <Icon as={() => <Image src={icon} alt="House" borderRadius="full" />} />
          </Box>

          <Box display={{ base: 'none', sm: 'block' }}>
            <Heading fontSize={['xs', 'md', 'xl']}>{details.title.toUpperCase()}</Heading>
          </Box>

          <Box>
            <HStack>
              <Heading
                fontSize="xs"
                display={{ base: 'none', sm: 'block' }}
              >
                {`${details.city}/${details.county}/${details.district}`}
              </Heading>

              <Heading
                fontSize="xs"
                display={{ base: 'block', sm: 'none' }}
              >
                {details.title.toUpperCase()}
              </Heading>
            </HStack>

            <HStack>
              <Text
                fontSize={['xs', 'sm', 'sm']}
                isTruncated
              >
                {details.address}
              </Text>
            </HStack>

            <HStack display={{ base: 'none', sm: 'flex' }}>
              <HStack mr={5}>
                <Heading fontSize="xs">{t('floor')}:</Heading>
                <Text fontSize="xs">{details.floor}</Text>
              </HStack>

              <HStack>
                <Heading fontSize="xs">{t('flat')}:</Heading>
                <Text fontSize="xs">{details.flat}</Text>
              </HStack>
            </HStack>
          </Box>

        </HStack>
        {/* Check if an action icon exists and render */}
        {actionIcon && (
          <HStack
            w="70px"
            alignItems="center"
            justifyContent="center"
            onClick={actionIconOnClick}
            cursor="pointer"
            data-cy={`delete-btn${details.id}`}
          >
            {actionIcon}
          </HStack>
        )}
      </HStack>
    </Flex >
  )
}

Address.propTypes = {
  actionIcon: PropTypes.element,
  actionIconOnClick: PropTypes.func,
  containerStyle: PropTypes.object,
  details: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    county: PropTypes.string,
    district: PropTypes.string,
    flat: PropTypes.number,
    floor: PropTypes.number,
    title: PropTypes.string
  }),
  icon: PropTypes.string,
  onClick: PropTypes.func
};

export default Address
