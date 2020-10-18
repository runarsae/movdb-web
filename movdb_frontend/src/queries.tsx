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

export {CURRENT_USER, LOGIN};
