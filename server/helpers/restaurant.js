import { createRequire } from "module";
import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";
import _ from "lodash";
import { createMenu } from "./menu.js";
const require = createRequire(import.meta.url);
const restaurants = require("../restaurants.json");

export const createDefaultRestaurants = async () => {
  try {
    await Restaurant.deleteMany({});
    await Menu.deleteMany({});

    //Update created at entry of each restaurant -> will be used for sorting.
    const copyRestaurants = _.cloneDeep(restaurants).map((r, index) => {
      return {
        ...r,
        createdAt: Date.now() + (index) * 100
      };
    });

    const rests = await Restaurant.create(copyRestaurants);
    console.log("Default Restaurants created");

    const menus = [];
    rests.forEach((rest) => {
      const menu = createMenu({ cuisine: rest.cuisine });
      menus.push({ ...menu, restaurant: rest.id });
    })

    await Menu.create(menus);
    console.log("Restaurants' menu's created");
    return rests;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryDetailsOfDistrict = ({ restaurant = {}, district = '' }) => {
  return restaurant.deliveryDetails[district] || {};
};


export const getRestaurants = async ({ city = '', county = '', district = '' }) => {
  try {
    //Get restaurants and sort by creation
    const restaurants = await Restaurant.find({ city, county, servedDistricts: { $all: [district] } }).sort({ createdAt: -1 });

    //deliveryDetails is an object contains different information for each district. For example
    // restaurant:{
    //   ...
    //   deliveryDetails: {
    //     "Atakent": {
    //       "minAmount": 15,
    //       "estimatedDeliveryTime": 25
    //     },
    //     "Bostanli": {
    //       "minAmount": 18,
    //       "estimatedDeliveryTime": 30
    //     }
    //   }
    // }
    // so the details is will be gotten by given district of user
    return restaurants.map((r) => ({
      ...r._doc,
      id: r.id,
      deliveryDetails: getDeliveryDetailsOfDistrict.bind(this, { restaurant: r, district })
    }));
  } catch (error) {
    throw error;
  }
};

export const getMenu = async ({ id = '' }) => {
  try {
    const menus = await Menu.find({ restaurant: id });

    return menus[0];
  } catch (error) {
    throw error;
  }
}
