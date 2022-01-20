import React from 'react';
import PropTypes from 'prop-types';
import Size from './Size';
import Piece from './Piece';
import { isEmpty } from 'lodash';

const Side = ({
  options,
  selected,
  setSelected,
  name,
  windowWidth
}) => {

  if (!name || isEmpty(options)) {
    return null;
  }

  if (name === 'fries') {
    return <Size
      options={options}
      selected={selected}
      setSelected={(value) => setSelected(value)}
      windowWidth={windowWidth}
    />
  };

  return <Piece
    pieces={options}
    selected={selected}
    setSelected={(value) => setSelected(value)}
    windowWidth={windowWidth}
  />
};

Side.propTypes = {
  options: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired
};

export default Side;
