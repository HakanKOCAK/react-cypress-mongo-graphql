import { getDetailsOfObjectLike } from './restaurantMenuPrettifier';

const prettifyCart = ({ cart = {} }) => {
  return getDetailsOfObjectLike(cart);
};

export default prettifyCart;