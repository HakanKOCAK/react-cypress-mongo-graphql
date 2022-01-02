import { getRestaurants, getMenu } from "../../helpers/restaurant.js";

const restaurantResolver = {
  restaurants: async ({ city, county, district }) => {
    try {
      const restaurants = await getRestaurants({ city, county, district });

      return restaurants;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  menu: async ({ id }) => {
    try {
      const menu = await getMenu({ id });

      return menu;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default restaurantResolver;
