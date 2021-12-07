import React from "react";
import {
  Box,
  Text,
  Container,
  ListItem,
  Heading,
  List,
  HStack,
  ListIcon,
  Code
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
  const { t, i18n } = useTranslation();
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
            <HStack>
              <ListIcon as={() => <Image src="cypress.ico" alt="Cypress" boxSize="20px" />} />
              <Text>Cypress</Text>
            </HStack>
          </ListItem>
          <ListItem letterSpacing={2}>
            <Text>Express.js</Text>
          </ListItem>
        </List>
      </Container>
      <Container overflowY="auto">
        <Heading size="xl">{t('testedWithCypress')}</Heading>
        <Text letterSpacing={1.2}>
          {t('seeTestResults')} <Code>npx cypress open</Code> {i18n.language === 'tr' ? 'komutunu çalıştırınız.' : '.'}
        </Text>
      </Container>
    </Box >
  );
}