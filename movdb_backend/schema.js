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
        rating: Float
    }

    type Movies {
        movies: [Movie]
        pageCount: Int
    }

    type Like {
        hasLiked: Boolean
        likesCount: Int
    }

    type AddLike {
        _id: ID
        imdb_id: String!
        username: String!
    }

    enum SortBy {
        original_title
        release_date
        runtime
        rating
        none
    }

    enum SortDirection {
        ASC
        DESC
    }

    type Interval {
        start: Int!
        end: Int!
    }

    input IntervalInput {
        start: Int!
        end: Int!
    }

    input Filter {
        genres: [String]
        production_companies: [String]
        production_countries: [String]
        release_date: IntervalInput
        runtime: IntervalInput
    }

    type MenuOptions {
        genres: [String]
        productionCompanies: [String]
        productionCountries: [String]
        releaseDateInterval: Interval
        runtimeInterval: Interval
    }

    type Query {
        currentUser: User
        users: [User] @isAuthenticated
        loginUser(username: String!, password: String!): Token
        movies(
            search: String
            filter: Filter
            sortBy: SortBy
            sortDirection: SortDirection
            page: Int = 1
            pageSize: Int = 20
        ): Movies
        movie(imdb_id: String!): Movie
        likes(imdb_id: String!): Like
        menuOptions: MenuOptions
    }

    type Mutation {
        createUser(username: String!, password: String!): User
        createLike(imdb_id: String!): AddLike
    }
`;

module.exports = typeDefs;
