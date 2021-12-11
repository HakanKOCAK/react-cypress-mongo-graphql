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
