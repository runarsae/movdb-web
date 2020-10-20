const {gql} = require("apollo-server");

const typeDefs = gql`
    directive @isAuthenticated on FIELD_DEFINITION

    scalar Date

    type User {
        _id: ID!
        username: String!
        password: String!
    }

    type Token {
        token: String!
    }

    type Response {
        success: Boolean!
        message: String
    }

    type ProductionCountry {
        code: String
        name: String
    }

    type Movie {
        _id: ID
        imdb_id: String
        original_title: String
        overview: String
        genres: [String]
        poster_path: String
        trailer: String
        production_companies: [String]
        production_countries: [ProductionCountry]
        release_date: Date
        runtime: Int
    }

    enum SortBy {
        original_title
        release_date
        runtime
    }

    enum SortDirection {
        ASC
        DESC
    }

    input Interval {
        start: Int!
        end: Int!
    }

    input Filter {
        genres: [String]
        production_companies: [String]
        production_countries: [String]
        release_date: Interval
        runtime: Interval
    }

    type Query {
        currentUser: User
        users: [User] @isAuthenticated
        loginUser(username: String!, password: String!): Token
        movies(search: String, filter: Filter, sortBy: SortBy, sortDirection: SortDirection = ASC): [Movie]
    }

    type Mutation {
        createUser(username: String!, password: String!): User
    }
`;

module.exports = typeDefs;
