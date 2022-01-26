import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';
import Piece from './Piece';
import Meal from './Meal';

const Falafel = ({
  ingredients,
  pieceDetails,
  meals,
  pieces,
  setPieces,
  meal,
  setMeal,
  windowWidth
}) => {
  return (
    <>
      <Ingredient ingredients={ingredients} />
      <Piece
        pieces={pieceDetails.pieces}
        windowWidth={windowWidth}
        selected={pieces}
        setSelected={setPieces}
      />
      <Meal
        meals={meals}
        selected={meal}
        setSelected={setMeal}
        windowWidth={windowWidth}
      />
    </>
  )
};

Falafel.propTypes = {
  ingredients: PropTypes.array.isRequired,
  pieceDetails: PropTypes.shape({
    pieces: PropTypes.array.isRequired,
    sizePriceConstant: PropTypes.number.isRequired
  }).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape(
    {
      includes: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      priceDetails: PropTypes.shape({
        price: PropTypes.number.isRequired,
        sizePriceConstant: PropTypes.number.isRequired
      })
    }
  )).isRequired,
  windowWidth: PropTypes.number.isRequired,
  pieces: PropTypes.string.isRequired,
  setPieces: PropTypes.func.isRequired,
  meal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mealPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired
  }).isRequired,
  setMeal: PropTypes.func.isRequired
};

export default Falafel;
