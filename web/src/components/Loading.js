import React from 'react';
import {
  Center,
  keyframes,
  usePrefersReducedMotion
} from '@chakra-ui/react';
import Brand from './Brand';

const changeOpacity = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Loading = () => {

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${changeOpacity} infinite 1s linear`;

  return (
    <Center h="100vh"><Brand animation={animation} /></Center>
  );
}

export default Loading;
