import React from 'react';
import {
    Box,
    Text,
    Button
} from '@chakra-ui/react';
import { gql, useLazyQuery } from '@apollo/client'

const meQuery = gql`
query{
  me{
    id,
    email
  }
}
`;

const Home = (props) => {
    const [whoami] = useLazyQuery(meQuery)
    return (
        <Box textAlign="center" fontSize="xl">
            <Text>
                Home Pageeee.
            </Text>
            <Button onClick={async () => {
                const res = await whoami()
                console.log(res.data)
            }}>
                fetchXD
            </Button>
        </Box>
    );
}

export default Home;
