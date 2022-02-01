import { createRequire } from "module";
import lodash from "lodash";
const require = createRequire(import.meta.url);
const hamburgerMenu = require('../menu/hamburger.json');
const pizzaMenu = require('../menu/pizza.json');
const kebabMenu = require('../menu/kebab.json');
const drinkMenu = require('../menu/drink.json');
const sauceMenu = require('../menu/sauce.json');
const sweetMenu = require('../menu/sweet.json');
const sideMenu = require('../menu/side.json');
const mealMenu = require('../menu/meal.json');
const falafelMenu = require('../menu/falafel.json');

//Generates random number between given range
const generateRandomInt = ({ min = 0, max = 0 }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Get random pizzas, hamburgers, kebabs, falafels, drinks, sweets, sides...
const getRandomItems = ({ menu = {}, min = 1 }) => {
  const randomItems = [];
  //Get a random number between 1 to menu.length to add to menu
  const itemCount = generateRandomInt({ min, max: menu.length });

  //copy items
  let copyItems = lodash.cloneDeep(menu);
  for (let i = 0; i < itemCount; i++) {
    //Generate a random number between 0 to copyItems.length - 1
    const randomIndex = generateRandomInt({ min: 0, max: copyItems.length - 1 });

    //push corresponding value of copyItems[randomIndex] to randomItems
    randomItems.push(copyItems[randomIndex]);

    //remove pushed item from copyItems array
    copyItems.splice(randomIndex, 1);
  }

  return randomItems;
};

const createHamburgers = ({ basePriceIndex = 0 }) => {
  const hamburgers = {};
  const randomBurgers = getRandomItems({ menu: hamburgerMenu.burgers })

  // randomBurgers = ['hamburger', 'cheeseburger', ...] now.
  // hamburgerMenu = {
  //   optionals = {
  //     ...,
  //     hamburger: ['item1', 'item2']
  //   },
  //   burgerDetails = {
  //     ...,
  //     hamburger: {
  //       possiblePrices: [1, 2, 3],
  //       ingredients: ['something'],
  //       optional: 'hamburger'
  //     }
  //   }
  // }
  randomBurgers.forEach((b) => {
    const details = hamburgerMenu.burgerDetails[b]
    const price = details.possiblePrices[basePriceIndex];
    const optionals = hamburgerMenu.optionals[details.optionals] || [];
    const ingredients = [...details.ingredients, ...optionals];
    hamburgers[b] = { price, ingredients, optionals };
  })

  return hamburgers;
};

const createPizzas = ({ basePriceIndex = 0 }) => {
  const pizzas = {};
  const randomPizzas = getRandomItems({ menu: pizzaMenu.pizzas });

  // randomPizzas = ['margherita', 'pepperoni', ...] now.
  // pizzaMenu = {
  //   optionals = {
  //     ...,
  //     margherita: ['item1', 'item2']
  //   },
  //   pizzaDetails = {
  //     ...,
  //     margherita: {
  //       possiblePrices: [1, 2, 3],
  //       ingredients: ['something'],
  //       optional: 'margherita'
  //     }
  //   }
  // }
  randomPizzas.forEach((p) => {
    const details = pizzaMenu.pizzaDetails[p]
    const price = details.possiblePrices[basePriceIndex];
    const optionals = pizzaMenu.optionals[details.optionals] || [];
    const ingredients = [...details.ingredients, ...optionals];
    pizzas[p] = { price, ingredients, optionals };
  });

  return pizzas;
};

const createKebabs = ({ basePriceIndex = 0 }) => {
  const kebabs = {};
  const randomKebabs = getRandomItems({ menu: kebabMenu.kebabs });

  // randomKebabs = ['shishKebab', 'adanaKebab', ...] now.
  // kebabMenu = {
  //   optionals: {
  //      ...,
  //     shishKebab: undefined or ['item1', 'item2'],
  //   },
  //   "kebabDetails": {
  //     "shishKebab": {
  //       "possiblePrices": [1, 2, 3],
  //       "optionals": "shishKebab" || undefined,
  //        "sides" : ["item1", "item2"]
  //     },
  //   }
  // }
  randomKebabs.forEach((k) => {
    const details = kebabMenu.kebabDetails[k];
    const price = details.possiblePrices[basePriceIndex];
    const optionals = kebabMenu.optionals[details.optionals] || [];
    const sides = details.sides || [];
    kebabs[k] = { price, optionals, sides }
  })

  return kebabs;
};

const createFalafels = ({ basePriceIndex = 0 }) => {
  const falafels = {};
  const randomFalafes = getRandomItems({ menu: falafelMenu.falafels })

  // falafelMenu = {
  //   falafelDetails: {
  //     classic: {
  //       possiblePrices: [1, 2, 3],
  //       ingredients: ['item1', 'item2']
  //     }
  //   },
  //   falafelPieceDetails: {
  //     pieces: [3,5,7],
  //     sizePriceConstant: [1, 2, 3]
  //   }
  // }

  randomFalafes.forEach((f) => {
    const details = falafelMenu.falafelDetails[f];
    const price = details.possiblePrices[basePriceIndex];
    const ingredients = details.ingredients;
    falafels[f] = { price, ingredients };
  });

  return falafels;
}

const createSides = ({ basePriceIndex = 0, isFriesRequired = false }) => {
  const sides = {};
  const randomSides = getRandomItems({ menu: sideMenu.sides, min: 0 });
  if (isFriesRequired && !randomSides.includes('fries')) {
    randomSides.push('fries')
  }

  // sideMenu = {
  //   sizeDetails: {
  //     "sizePriceConstant": [1.2, 1.3, 1.4],
  //     "classic": ["small", "medium", "large"],
  //     "piece": [ "4pcs", "6pcs", "8pcs" ]
  //   },
  //   sizeDetails:{
  //     fries: {
  //       possiblePrices: [1, 2, 3],
  //       sizeDetails: 'classic'
  //     }
  //   }
  // }

  randomSides.forEach((s) => {
    const details = sideMenu.sideDetails[s];
    const price = details.possiblePrices[basePriceIndex];
    const sizeType = sideMenu.sizeDetails[details.sizeDetails];
    const sizePriceConstant = sideMenu.sizeDetails.sizePriceConstant[basePriceIndex];
    sides[s] = { price, sizeDetails: { options: sizeType, sizePriceConstant } }
  })

  return sides;
};

const createDrinks = ({ basePriceIndex = 0, min = 0 }) => {
  const drinks = {};
  const randomDrinks = getRandomItems({ menu: drinkMenu.drinks, min });

  //   drinkMenu = { 
  //     details: {
  //       ..., 
  //       coke: {
  //         possiblePrices: [1,2,3],
  //         types: ["type1", "type2", ...]
  //       }
  //     }
  //   }
  // };

  randomDrinks.forEach((d) => {
    const details = drinkMenu.details[d];
    const randomTypes = getRandomItems({ menu: details.types })
    const price = details.possiblePrices[basePriceIndex]
    drinks[d] = { price, types: randomTypes }
  })

  return drinks;
};

const createSweets = ({ basePriceIndex = 0 }) => {
  const sweets = {};
  const randomSweets = getRandomItems({ menu: sweetMenu.sweets, min: 0 });

  // sweetMenu = {
  //   sweetDetails: {
  //     souffle: {
  //       possiblePrices: [ 4, 5, 6 ]
  //     },
  //     cookie: {
  //       possiblePrices: [ 2, 2.5, 3 ],
  //       types: [ "chocolate", "cholocateChip","doubleChocolate"]
  //     }
  //   }
  // }

  randomSweets.forEach((s) => {
    const details = sweetMenu.sweetDetails[s];
    const price = details.possiblePrices[basePriceIndex];
    const types = details.types || [];
    sweets[s] = { price, types };
  })

  return sweets;
};

const createSauces = ({ basePriceIndex = 0 }) => {
  const sauces = {};
  const randomSauces = getRandomItems({ menu: sauceMenu.sauces, min: 0 });

  // sauceMenu= {
  //   possiblePrices = [1, 2, 3]
  // }

  const price = sauceMenu.possiblePrices[basePriceIndex];
  randomSauces.forEach((s) => {
    sauces[s] = price;
  });

  return sauces;
};

const createMealDetails = ({ basePriceIndex = 0, menuKey = '' }) => {
  // menuKey is one of ['kebab', 'pizza', 'falafel', 'hamburger']
  const mealDetails = [];

  // mealMenu = {
  //   priceDetails : {
  //     kebab: {
  //       meals: {
  //         meal0: [1, 3, 4]
  //       },
  //       sizePrices:{
  //         meal0: [1, 2, 3]
  //       },
  //       includes: {
  //         meal0: ['drink']
  //       }
  //     }
  //   }
  // }

  const details = mealMenu[menuKey];
  Object.keys(details.meals).forEach((key) => {
    const mealprices = details.meals[key]
    const sizePrices = details.sizePrices[key]
    mealDetails.push({
      name: key,
      priceDetails: {
        price: mealprices[basePriceIndex],
        sizePriceConstant: sizePrices[basePriceIndex]
      },
      includes: details.includes[key]
    });
  });
  return mealDetails;
};

export const createMenu = ({ cuisine = [] }) => {
  const basePriceIndex = generateRandomInt({ min: 0, max: 2 });
  const menu = {}
  cuisine.forEach((c) => {
    if (c === 'Hamburger') {
      menu.hamburgers = createHamburgers({ basePriceIndex });
    } else if (c === 'Pizza') {
      menu.pizzas = createPizzas({ basePriceIndex });
      menu.pizzaSizeDetails = {
        sizes: pizzaMenu.pizzaSizeDetails.sizes,
        sizePriceConstant: pizzaMenu.pizzaSizeDetails.sizePriceConstant[basePriceIndex]
      };
    } else if (c === 'Kebab') {
      menu.kebabs = createKebabs({ basePriceIndex });
    } else if (c === 'Falafel') {
      menu.falafels = createFalafels({ basePriceIndex });
      menu.falafelPieceDetails = {
        pieces: falafelMenu.falafelPieceDetails.pieces,
        sizePriceConstant: falafelMenu.falafelPieceDetails.sizePriceConstant[basePriceIndex]
      };
    }
  });

  //Check if menu has hamburgers to create meal details. I assumed it is mandatory
  // to have meal option, drinks and fries when menu has hamburger... 
  const mealDetails = {}
  if (lodash.has(menu, 'hamburgers')) {
    mealDetails.hamburger = createMealDetails({ basePriceIndex, menuKey: 'hamburger' });
    menu.drinks = createDrinks({ basePriceIndex, min: 3 });
    menu.sides = createSides({ basePriceIndex, isFriesRequired: true });
  }

  //To create random meal option for menu items
  const hasMeal = generateRandomInt({ min: 0, max: 1 })
  if (hasMeal) {
    //check if drinks and sides are created above while checking if menu has hamburger
    if (!menu.drinks) {
      menu.drinks = createDrinks({ basePriceIndex, min: 3 });
    }
    if (!menu.sides) {
      menu.sides = createSides({ basePriceIndex, isFriesRequired: true });
    }

    //Check if menu has pizzas
    if (lodash.has(menu, 'pizzas')) {
      mealDetails.pizza = createMealDetails({ basePriceIndex, menuKey: 'pizza' });
    }

    //Check if menu has kebabs
    if (lodash.has(menu, 'kebabs')) {
      mealDetails.kebab = createMealDetails({ basePriceIndex, menuKey: 'kebab' });
    }

    //Check if menu has falafels
    if (lodash.has(menu, 'falafels')) {
      mealDetails.falafel = createMealDetails({ basePriceIndex, menuKey: 'falafel' });
    }
  }

  menu.mealDetails = mealDetails;

  menu.sauces = createSauces({ basePriceIndex });
  menu.sweets = createSweets({ basePriceIndex });
  if (!menu.drinks) {
    menu.drinks = createDrinks({ basePriceIndex, min: 0 });
  }
  if (!menu.sides) {
    menu.sides = createSides({ basePriceIndex, isFriesRequired: false });
  }

  return menu;
};