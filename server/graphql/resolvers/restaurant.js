import { getRestaurants } from "../../helpers/restaurant.js";

const restaurantResolver = {
  restaurants: async ({ city, county, district }) => {
    try {
      const restaurants = await getRestaurants({ city, county, district });

      return restaurants;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default restaurantResolver;
