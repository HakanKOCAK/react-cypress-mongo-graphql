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