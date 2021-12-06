import React from 'react'
import {
  Grid, GridItem,
} from '@chakra-ui/layout';
import Description from '../LandingDescription';

const AuthWrapper = ({ children }) => {
  return (
    <Grid
      w="100%"
      h="100%"
      autoFlow="column"
      gap={5}
    >
      <GridItem display={{ base: 'none', md: 'block' }}>
        <Description />
      </GridItem>
      {children}
    </Grid>
  )
}

export default AuthWrapper
