import React from 'react';
import PropTypes from 'prop-types';
import Type from './Type';
import { isEmpty } from 'lodash';

const Sweet = ({
  types,
  selected,
  setSelected,
  windowWidth
}) => {
  if (isEmpty(types)) {
    return null;
  }
  return (
    <Type
      types={types}
      selected={selected}
      setSelected={(value) => setSelected(value)}
      windowWidth={windowWidth}
    />
  );
};

Sweet.propTypes = {
  types: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
};

export default Sweet;
