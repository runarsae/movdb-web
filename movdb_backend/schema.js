const {gql} = require("apollo-server");

const typeDefs = gql`
    directive @isAuthenticated on FIELD_DEFINITION

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

    type Movie {
        _id: ID
        imdb_id: String
        original_title: String
        overview: String
        genres: String
        poster_path: String
        trailer: String
        production_companies: String
        production_countries: String
        release_date: String
        runtime: Int
    }

    type Query {
        currentUser: User @isAuthenticated
        users: [User] @isAuthenticated
        loginUser(username: String!, password: String!): Token
        logoutUser: Boolean @isAuthenticated
        movies: [Movie]
    }

    type Mutation {
        createUser(username: String!, password: String!): User
    }
`;

module.exports = typeDefs;
