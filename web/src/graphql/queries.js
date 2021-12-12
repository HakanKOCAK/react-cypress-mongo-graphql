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
