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
            imdb_id
        }
    }
`;

const MENU_OPTIONS = gql`
    query menuOptions {
        menuOptions {
            genres
            productionCountries
            releaseDateInterval {
                start
                end
            }
            runtimeInterval {
                start
                end
            }
        }
    }
`;

// CACHE-ONLY QUERIES
const MENU_OPEN = gql`
    query menuOpen {
        menuOpen @client {
            open
        }
    }
`;

const MENU_VALUES = gql`
    query menuValues {
        menuValues @client {
            genres
            productionCountries {
                start
                end
            }
            releaseDateInterval {
                start
                end
            }
            runtimeInterval
        }
    }
`;

const SORT = gql`
    query sort {
        sort @client {
            sort
        }
    }
`;

const SORT_DIRECTION = gql`
    query sortDirection {
        sortDirection @client {
            sortDirection
        }
    }
`;

const SEARCH = gql`
    query search @client {
        search
    }
`;

export {CURRENT_USER, LOGIN, REGISTER, MENU_OPEN, MENU_VALUES, MENU_OPTIONS, MOVIE, SORT, SORT_DIRECTION, SEARCH};
