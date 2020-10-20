import gql from "graphql-tag";

const CURRENT_USER = gql`
    {
        currentUser {
            username
        }
    }
`;

const LOGIN = gql`
    query loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            token
        }
    }
`;

const REGISTER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
            _id
            username
        }
    }
`;

const MENU_VALUES = gql`
    query MenuValues {
        menuValues @client {
            genres
            production_companies
            production_countries
            release_interval
            runtimes_interval
        }
    }
`;

export {CURRENT_USER, LOGIN, REGISTER, MENU_VALUES};
