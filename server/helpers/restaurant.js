import { createRequire } from "module";
import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";
import _ from "lodash";
import { createMenu } from "./menu.js";
const require = createRequire(import.meta.url);
const restaurants = require("../restaurants.json");

const createRestaurants = async () => {
  try {
    //Update created at entry of each restaurant -> will be used for sorting.
    const copyRestaurants = _.cloneDeep(restaurants).map((r, index) => {
      return {
        ...r,
        createdAt: Date.now() + (index) * 100
      };
    });

    const rests = await Restaurant.create(copyRestaurants);
    console.log("Default Restaurants created");
    return rests;
  } catch (error) {
    throw error;
  }
};

const createMenus = async ({ rests = [] }) => {
  try {
    const menus = [];
    rests.forEach((rest) => {
      const menu = createMenu({ cuisine: rest.cuisine });
      menus.push({ ...menu, restaurant: rest.id });
    })

    await Menu.create(menus);
    console.log("Restaurants' menu's created");
  } catch (error) {
    throw error;
  }
}

//Create restaurants for testing purposes
export const createTestRestaurants = async () => {
  try {
    const dbRestaurants = await Restaurant.find({});

    if (dbRestaurants.length === 0) {
      const r1 = new Restaurant({
        city: 'Istanbul',
        county: "Besiktas",
        cuisine: ['Pizza'],
        deliveryDetails: {
          Bebek: {
            minAmount: 15,
            estimatedDeliveryTime: 45
          }
        },
        image: 'pizza.svg',
        name: 'Pizza Test Restaurant',
        servedDistricts: ['Bebek']
      });

      const menu1 = new Menu({
        drinks: {
          coke: { price: 3, types: ['zero'] },
          fruitJuice: { price: 3, types: ['cherry'] }
        },
        pizzaSizeDetails: {
          sizePriceConstant: 6.5,
          sizes: ['small', 'medium', 'large']
        },
        pizzas: {
          hawaiian: {
            includes: ['mozzarella', 'pineapple', 'ham'],
            optionals: ['ham'],
            price: 11
          },
          margherita: {
            includes: ['mozzarella', 'tomatoes', 'basil'],
            optionals: ['tomatoes', 'basil'],
            price: 10
          }
        },
        sauces: {
          ketchup: 0.7,
          buffalo: 0.7,
          honeyMustard: 0.7,
          mayonnaise: 0.7,
          ranch: 0.7,
          sweetNSour: 0.7
        },
        sides: {
          chickenFries: {
            price: 7,
            sizeDetails: {
              options: ['4pcs', '6pcs', '8pcs'],
              sizePriceConstant: 3
            }
          },
          fries: {
            price: 5,
            sizeDetails: {
              options: ['small', 'medium', 'large'],
              sizePriceConstant: 3
            }
          },
          mozzarellaSticks: {
            price: 6,
            sizeDetails: {
              options: ['4pcs', '6pcs', '8pcs'],
              sizePriceConstant: 3
            }
          },
          nuggets: {
            price: 7,
            sizeDetails: {
              options: ['4pcs', '6pcs', '8pcs'],
              sizePriceConstant: 3
            }
          }
        },
        restaurant: r1._id
      });

      const r2 = new Restaurant({
        city: 'Istanbul',
        county: "Besiktas",
        cuisine: ['Hamburger'],
        deliveryDetails: {
          Bebek: {
            minAmount: 20,
            estimatedDeliveryTime: 40
          }
        },
        image: 'burger.svg',
        name: 'Hamburger Test Restaurant',
        servedDistricts: ['Bebek']
      });

      const menu2 = new Menu({
        drinks: {
          fruitJuice: { price: 3, types: ['cherry', 'orange', 'peach'] },
          iceTea: { price: 3, types: ['lemon', 'peach'] },
          sprite: { price: 3, types: ['light', 'normal'] }
        },
        hamburgers: {
          hamburger: {
            price: 8,
            includes: ['beef', 'pickles', 'ketchup', 'mustard'],
            optionals: ['pickles', 'ketchup', 'mustard']
          },
          quarterPounder: {
            price: 10,
            includes: ['beef', 'cheddarCheese', 'pickles', 'onions', 'ketchup', 'mustard'],
            optionals: ['pickles', 'onions', 'ketchup', 'mustard']
          }
        },
        mealDetails: {
          hamburger: [
            {
              includes: ['drink', 'fries'],
              name: 'Meal0',
              priceDetails: {
                price: 4.5,
                sizePriceConstant: 4
              }
            }
          ]
        },
        sauces: {
          bbq: 0.7,
          buffalo: 0.7,
          honeyMustard: 0.7,
          ketchup: 0.7,
          mayonnaise: 0.7,
          mustard: 0.7,
          ranch: 0.7,
          sweetNSour: 0.7,
          tartar: 0.7
        },
        sides: {
          chickenFries: {
            price: 7,
            sizeDetails: {
              options: ['4pcs', '6pcs', '8pcs'],
              sizePriceConstant: 3
            }
          },
          fries: {
            price: 5,
            sizeDetails: {
              options: ['small', 'medium', 'large'],
              sizePriceConstant: 3
            }
          },
          onionRings: {
            price: 6,
            sizeDetails: {
              options: ['4pcs', '6pcs', '8pcs'],
              sizePriceConstant: 3
            }
          }
        },
        restaurant: r2._id
      });

      await r1.save();
      await r2.save();
      await menu1.save();
      await menu2.save();

      console.log('Test restaurants and menus created');
    };

  } catch (error) {
    throw error;
  }
};

export const createDefaultRestaurants = async () => {
  try {
    const dbRestaurants = await Restaurant.find({});
    const dbMenus = await Menu.find({});
    if (dbRestaurants.length === 0) {
      const rests = await createRestaurants();
      await createMenus({ rests });
      return rests;
    }
    return dbRestaurants;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryDetailsOfDistrict = ({ restaurant = {}, district = '' }) => {
  return restaurant.deliveryDetails[district] || {};
};

export const getRestaurantById = async ({ id = '', district = '' }) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (restaurant) {
      return {
        ...restaurant._doc,
        id: restaurant.id,
        deliveryDetails: getDeliveryDetailsOfDistrict.bind(this, { restaurant, district })
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

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
