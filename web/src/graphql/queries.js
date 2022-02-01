import { gql } from '@apollo/client'

export const me = gql`
query Me{
  me{
    id,
    email,
    name,
    surname
  }
}
`;

export const myAddresses = gql`
query MyAddresses {
  myAddresses {
    id
    address
    city
    county
    district
    title
    flat
    floor
  }
}
`;

export const getCities = gql`
query Cities {
  cities
}
`;

export const getCounties = gql`
query Counties($city: String!) {
  counties(city: $city)
}
`;

export const getDistricts = gql`
query Districts($city: String!, $county: String!) {
  districts(city: $city, county: $county)
}
`;

export const myCreditCards = gql`
query MyCreditCards {
  myCreditCards {
    id
    description
    issuer
    number
  }
}
`;

export const getRestaurantsQuery = gql`
query Restaurants($city: String!, $county: String!, $district: String!) {
  restaurants(city: $city, county: $county, district: $district) {
    id
    city
    county
    cuisine
    deliveryDetails {
      minAmount
      estimatedDeliveryTime
    }
    image
    name
    servedDistricts
  }
}
`;

export const getRestaurantMenuQuery = gql`
query Menu($restaurantId: String) {
  menu(id: $restaurantId) {
    id
    drinks {
      coke {
        price
        types
      }
      fruitJuice {
        price
        types
      }
      iceTea {
        price
        types
      }
      water {
        price
        types
      }
      sprite {
        price
        types
      }
    }
    falafels {
      classic {
        price
        ingredients
      }
      rawCarrot {
        price
        ingredients
      }
      mexican {
        price
        ingredients
      }
      sweetPotato {
        price
        ingredients
      }
    }
    falafelPieceDetails {
      pieces
      sizePriceConstant
    }
    hamburgers {
      hamburger {
        price
        ingredients
        optionals
      }
      cheeseburger {
        price
        ingredients
        optionals
      }
      chickenburger {
        price
        ingredients
        optionals
      }
      quarterPounder {
        price
        ingredients
        optionals
      }
      doubleHamburger {
        price
        ingredients
        optionals
      }
      doubleCheeseburger {
        price
        ingredients
        optionals
      }
      doubleChickenburger {
        price
        ingredients
        optionals
      }
      doubleQuarterPounder {
        price
        ingredients
        optionals
      }
    }
    kebabs {
      chickenDonerKebab {
        price
        optionals
        sides
      }
      steakDonerKebab {
        price
        optionals
        sides
      }
      shishKebab {
        price
        optionals
        sides
      }
      chickenShishKebab {
        price
        optionals
        sides
      }
      adanaKebab {
        price
        optionals
        sides
      }
      iskenderKebab {
        price
        optionals
        sides
      }
      kibbeh {
        price
        optionals
        sides
      }
    }
    mealDetails {
      hamburger {
        name
        includes
        priceDetails {
          price
          sizePriceConstant
        }
      }
      pizza {
        name
        includes
        priceDetails {
          price
          sizePriceConstant
        }
      }
      kebab {
        name
        includes
        priceDetails {
          price
          sizePriceConstant
        }
      }
      falafel {
        name
        includes
        priceDetails {
          price
          sizePriceConstant
        }
      }
    }
    pizzas {
      margherita {
        price
        ingredients
        optionals
      }
      pepperoni {
        price
        ingredients
        optionals
      }
      hawaiian {
        price
        ingredients
        optionals
      }
      vegetarian {
        price
        ingredients
        optionals
      }
      bbqChicken {
        price
        ingredients
        optionals
      }
      meaty {
        price
        ingredients
        optionals
      }
    }
    pizzaSizeDetails {
      sizes
      sizePriceConstant
    }
    sauces {
      ketchup
      mayonnaise
      bbq
      ranch
      mustard
      honeyMustard
      sweetNSour
      buffalo
      tartar
    }
    sweets {
      souffle {
        price
        types
      }
      cookie {
        price
        types
      }
      iceCream {
        price
        types
      }
      pie {
        price
        types
      }
    }
    sides {
      fries {
        price
        sizeDetails {
          options
          sizePriceConstant
        }
      }
      nuggets {
        price
        sizeDetails {
          options
          sizePriceConstant
        }
      }
      onionRings {
        price
        sizeDetails {
          options
          sizePriceConstant
        }
      }
      chickenFries {
        price
        sizeDetails {
          options
          sizePriceConstant
        }
      }
      mozzarellaSticks {
        price
        sizeDetails {
          options
          sizePriceConstant
        }
      }
    }
  }
}
`;

export const userCartQuery = gql`
query Cart($userDistrict: String) {
  cart(userDistrict: $userDistrict) {
    id
    cartTotal
    items {
      id
      drinkType
      falafelPieces
      item {
        itemDetails {
          falafelPieceDetails {
            pieces
            sizePriceConstant
          }
          ingredients
          mealDetails {
            includes
            name
            priceDetails {
              price
              sizePriceConstant
            }
          }
          name
          optionals
          pizzaSizeDetails {
            sizes
            sizePriceConstant
          }
          price
          sides
          sizeDetails {
            options
            sizePriceConstant
          }
          types
        }
        itemType
      }
      itemType
      name
      optionals {
        basil
        greenPeppers
        ham
        ketchup
        lettuce
        mayonnaise
        mushrooms
        mustard
        onions
        pickles
        redOnion
        tomatoes
        sweetCorn
      }
      pizzaSizeOption
      price
      quantity
      selectedMealDetails {
        mealPrice
        name
        size
        totalPrice
      }
      sideSizeOption
      sweetType
      totalPrice
    }
    menu {
      id
      drinks {
        coke {
          price
          types
        }
        fruitJuice {
          price
          types
        }
        iceTea {
          price
          types
        }
        water {
          price
          types
        }
        sprite {
          price
          types
        }
      }
      falafels {
        classic {
          price
          ingredients
        }
        rawCarrot {
          price
          ingredients
        }
        mexican {
          price
          ingredients
        }
        sweetPotato {
          price
          ingredients
        }
      }
      falafelPieceDetails {
        pieces
        sizePriceConstant
      }
      hamburgers {
        hamburger {
          price
          ingredients
          optionals
        }
        cheeseburger {
          price
          ingredients
          optionals
        }
        chickenburger {
          price
          ingredients
          optionals
        }
        quarterPounder {
          price
          ingredients
          optionals
        }
        doubleHamburger {
          price
          ingredients
          optionals
        }
        doubleCheeseburger {
          price
          ingredients
          optionals
        }
        doubleChickenburger {
          price
          ingredients
          optionals
        }
        doubleQuarterPounder {
          price
          ingredients
          optionals
        }
      }
      kebabs {
        chickenDonerKebab {
          price
          optionals
          sides
        }
        steakDonerKebab {
          price
          optionals
          sides
        }
        shishKebab {
          price
          optionals
          sides
        }
        chickenShishKebab {
          price
          optionals
          sides
        }
        adanaKebab {
          price
          optionals
          sides
        }
        iskenderKebab {
          price
          optionals
          sides
        }
        kibbeh {
          price
          optionals
          sides
        }
      }
      mealDetails {
        hamburger {
          name
          includes
          priceDetails {
            price
            sizePriceConstant
          }
        }
        pizza {
          name
          includes
          priceDetails {
            price
            sizePriceConstant
          }
        }
        kebab {
          name
          includes
          priceDetails {
            price
            sizePriceConstant
          }
        }
        falafel {
          name
          includes
          priceDetails {
            price
            sizePriceConstant
          }
        }
      }
      pizzas {
        margherita {
          price
          ingredients
          optionals
        }
        pepperoni {
          price
          ingredients
          optionals
        }
        hawaiian {
          price
          ingredients
          optionals
        }
        vegetarian {
          price
          ingredients
          optionals
        }
        bbqChicken {
          price
          ingredients
          optionals
        }
        meaty {
          price
          ingredients
          optionals
        }
      }
      pizzaSizeDetails {
        sizes
        sizePriceConstant
      }
      sauces {
        ketchup
        mayonnaise
        bbq
        ranch
        mustard
        honeyMustard
        sweetNSour
        buffalo
        tartar
      }
      sweets {
        souffle {
          price
          types
        }
        cookie {
          price
          types
        }
        iceCream {
          price
          types
        }
        pie {
          price
          types
        }
      }
      sides {
        fries {
          price
          sizeDetails {
            options
            sizePriceConstant
          }
        }
        nuggets {
          price
          sizeDetails {
            options
            sizePriceConstant
          }
        }
        onionRings {
          price
          sizeDetails {
            options
            sizePriceConstant
          }
        }
        chickenFries {
          price
          sizeDetails {
            options
            sizePriceConstant
          }
        }
        mozzarellaSticks {
          price
          sizeDetails {
            options
            sizePriceConstant
          }
        }
      }
    }
    restaurantDetails {
      id
      city
      county
      cuisine
      deliveryDetails {
        minAmount
        estimatedDeliveryTime
      }
      image
      name
      servedDistricts
    }
  }
}
`;

export const ordersQuery = gql`
query Orders {
  orders {
    id
    createdAt
    creditCard
    deliveryAddress {
      address
      city
      county
      district
      flat
      floor
    }
    items {
      id
      drinkType
      falafelPieces
      itemType
      name
      optionals {
        basil
        greenPeppers
        ham
        ketchup
        lettuce
        mayonnaise
        mushrooms
        mustard
        onions
        pickles
        redOnion
        tomatoes
        sweetCorn
      }
      pizzaSizeOption
      price
      quantity
      selectedMealDetails {
        mealPrice
        name
        size
        totalPrice
      }
      sideSizeOption
      sweetType
      totalPrice
    }
    paymentMethod
    restaurantDetails {
      city
      county
      name
    }
    total
  }
}
`;
