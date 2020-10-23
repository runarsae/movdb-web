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

const MOVIE = gql`
    query movies($search: String, $filter: Filter, $sortBy: SortBy, $sortDirection: SortDirection) {
        movies(search: $search, filter: $filter, sortBy: $sortBy, sortDirection: $sortDirection) {
            poster_path
            original_title
            rating
        }
    }
`;

export {CURRENT_USER, LOGIN, REGISTER, MOVIE};
