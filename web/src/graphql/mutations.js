import { gql } from '@apollo/client'

export const registerMutation = gql`
mutation Register($name: String!, $surname: String!, $email: String!, $password: String!) {
  register(name: $name, surname: $surname, email: $email, password: $password) {
    id
    name
    surname
    email
    accessToken
  }
}
`;

export const loginMutation = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    name
    surname
    accessToken
  }
}
`;

export const addAddressMutation = gql`
mutation AddAddress($address: String!, $city: String!, $county: String!, $district: String!, $flat: Int!, $floor: Int!, $title: String!) {
  addAddress(address: $address, city: $city, county: $county, district: $district, flat: $flat, floor: $floor, title: $title) {
    id
    address
    city
    county
    district
    flat
    floor
    title
  }
}
`;

export const deleteAddressMutation = gql`
mutation DeleteAddress($id: String!) {
  deleteAddress(id: $id)
}
`;

export const logoutMutation = gql`
mutation Logout {
  logout
}
`;

export const addCreditCardMutation = gql`
mutation AddCreditCard($cardNumber: String!, $cardHolder: String!, $cvc: String!, $expiry: String!, $description: String!, $issuer: String) {
  addCreditCard(cardNumber: $cardNumber, cardHolder: $cardHolder, cvc: $cvc, expiry: $expiry, description: $description, issuer: $issuer) {
    id
    description
    issuer
    number
  }
}
`;

export const deleteCreditCardMutation = gql`
mutation DeleteCreditCard($id: String!) {
  deleteCreditCard(id: $id)
}
`;

export const addCartItemMutation = gql`
mutation AddCartItem($item: CartItemInput!, $restaurantId: String!, $differentRestaurant: Boolean!) {
  addCartItem(item: $item, restaurantId: $restaurantId, differentRestaurant: $differentRestaurant) {
    id
    drinkType
    falafelPieces
    itemType
    name
    optionals {
      basil
      greenPeppers
      ham
      mayonnaise
      lettuce
      ketchup
      mushrooms
      onions
      mustard
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
}
`;

export const updateCartItemMutation = gql`
mutation UpdateCartItem($itemId: String!, $details: CartItemInput!) {
  updateCartItem(itemId: $itemId, details: $details) {
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
}
`;

export const emptyCartMutation = gql`
mutation EmptyCart {
  emptyCart
}
`;

export const deleteCartItemMutation = gql`
mutation DeleteCartItem($itemId: String!) {
  deleteCartItem(itemId: $itemId)
}
`;

export const orderMutation = gql`
mutation Order($details: OrderInput!) {
  order(details: $details) {
    id
    total
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
          includes
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
    restaurantDetails {
      city
      county
      name
    }
    creditCard
    createdAt
    deliveryAddress {
      address
      city
      county
      district
      flat
      floor
    }
  }
}
`;
