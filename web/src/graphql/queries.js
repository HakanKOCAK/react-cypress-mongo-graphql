import { gql } from '@apollo/client'

export const me = gql`
query{
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
query Query {
  cities
}
`;

export const getCounties = gql`
query Query($city: String!) {
  counties(city: $city)
}
`;

export const getDistricts = gql`
query Query($city: String!, $county: String!) {
  districts(city: $city, county: $county)
}
`;
