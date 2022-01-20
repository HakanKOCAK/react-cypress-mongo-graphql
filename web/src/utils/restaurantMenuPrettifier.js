import { isEmpty, isArrayLikeObject, isObjectLike } from 'lodash';

const mains = ['kebabs', 'hamburgers', 'pizzas', 'falafels'];
const other = ['sides', 'drinks', 'sweets', 'sauces'];
const rest = ['falafelPieceDetails', 'mealDetails', 'pizzaSizeDetails'];

//Checks every key value pair recursively till its not an object/array like variable and if not empty
export const getDetailsOfObjectLike = (obj) => {
  const reduced = Object.entries(obj).reduce((reduced, [key, value]) => {
    const copy = { ...reduced };
    if (isObjectLike(value) && !isEmpty(value)) {
      if (!isArrayLikeObject(value)) {
        copy[key] = getDetailsOfObjectLike(value);
      } else {
        copy[key] = getDetailsOfArrayLike(value);
      }
    } else if (key !== '__typename' && value) { //clear __typename since it is coming from graphql and is not required
      copy[key] = value;
    }

    return copy;
  }, {});
  return reduced;
};

//Checks every key value pair recursively till its not an object/array like variable and push it back.
const getDetailsOfArrayLike = (arr) => {
  const copy = [];

  arr.forEach((value) => {
    if (isArrayLikeObject(value)) {
      copy.push(getDetailsOfArrayLike(value));
    } else if (isObjectLike(value)) {
      copy.push(getDetailsOfObjectLike(value));
    } else {
      copy.push(value);
    }
  });
  return copy;
};

const prettifyRestaurantMenu = ({ menu = {} }) => {
  //Get possible keys of the menu
  const possibleOptions = [...mains, ...other, ...rest];

  //Prettifies object like variable.
  const prettifiedMenu = getDetailsOfObjectLike(menu);
  let detailedMenu = {};
  possibleOptions.forEach((key) => {
    const value = prettifiedMenu[key];
    if (value) {
      if (mains.includes(key)) {
        detailedMenu = { ...detailedMenu, mains: { ...detailedMenu.mains, [key]: value } };
      } else {
        detailedMenu = { ...detailedMenu, [key]: value };
      }
    }
  });
  return detailedMenu;
};

export default prettifyRestaurantMenu;
