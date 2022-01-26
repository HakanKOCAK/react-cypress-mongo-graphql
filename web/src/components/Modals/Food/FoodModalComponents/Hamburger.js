import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';
import Optional from './Optional';
import Meal from './Meal';

const Hamburger = ({
  ingredients,
  optionals,
  setOptionals,
  windowWidth,
  meals,
  meal,
  setMeal
}) => {
  return (
    <>
      <Ingredient
        ingredients={ingredients}
      />
      <Optional
        optionals={optionals}
        setOptionals={setOptionals}
        windowWidth={windowWidth}
      />
      <Meal
        meals={meals}
        selected={meal}
        setSelected={setMeal}
        windowWidth={windowWidth}
      />
    </>
  );
};

Hamburger.propTypes = {
  ingredients: PropTypes.array.isRequired,
  optionals: PropTypes.shape({}).isRequired,
  setOptionals: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
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
  meal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mealPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired
  }).isRequired,
  setMeal: PropTypes.func.isRequired
};

export default Hamburger;
