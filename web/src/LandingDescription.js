import React from "react";
import {
  Box,
  Text,
  Container,
  ListItem,
  Heading,
  List,
  HStack,
  ListIcon
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useTranslation } from "react-i18next";

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  boxShadow: '2xl',
  rounded: 'md',
  bg: 'white',
};

export default function Description() {
  const { t } = useTranslation();
  return (
    <Box h="100%" {...containerStyles}>
      <Container>
        <Heading size="xl">{t('whatIsFooder')}</Heading>
        <Text letterSpacing={1.2}>
          {t('appDescription')}
        </Text>
      </Container>
      <Container>
        <Heading size="xl">{t('techStack')}</Heading>
        <List spacing={3} w="100%" style={{ columnCount: 3 }}>
          <ListItem letterSpacing={2} w="33%">
            <HStack>
              <ListIcon as={() => <Image src="logo512.png" alt="React.js" boxSize="20px" />} />
              <Text>React.js</Text>
            </HStack>
          </ListItem>
          <ListItem letterSpacing={2}>
            <HStack>
              <ListIcon as={() => <Image src="nodejs.svg" bg="black" alt="Node.js" boxSize="20px" />} />
              <Text>Node.js</Text>
            </HStack>
          </ListItem>
          <ListItem letterSpacing={2}>
            <HStack>
              <ListIcon as={() => <Image src="apollo.svg" alt="Apollo" boxSize="20px" />} />
              <Text>Apollo</Text>
            </HStack>
          </ListItem>
          <ListItem letterSpacing={2}>
            <HStack>
              <ListIcon as={() => <Image src="mongodb.svg" alt="MongoDB" boxSize="20px" />} />
              <Text>MongoDB</Text>
            </HStack>
          </ListItem>
          <ListItem letterSpacing={2}>
            <HStack>
              <ListIcon as={() => <Image src="graphql.png" alt="GraphQL" boxSize="20px" />} />
              <Text>GraphQL</Text>
            </HStack>
          </ListItem>
          <ListItem letterSpacing={2}>
            <Text>Express.js</Text>
          </ListItem>
        </List>
      </Container>
      <Container overflowY="auto">
        <Heading size="xl">What is Lorem Ipsum?</Heading>
        <Text letterSpacing={1.2}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </Text>
      </Container>
    </Box >
  );
}