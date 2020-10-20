const {AuthenticationError, ForbiddenError} = require("apollo-server");
const {GraphQLScalarType} = require("graphql");
const {Kind} = require("graphql/language");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const BCRYPT_ROUNDS = 12;

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://movdb:movdb@it2810-23.idi.ntnu.no:27017/movdb";
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(() => {
    console.log("MONGOdb connected");
    db = client.db("movdb");
});

const resolvers = {
    // Custom Date type
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date type",
        parseValue(value) {
            // Value from the client
            return new Date(value);
        },
        serialize(value) {
            // Value sent to the client
            return value;
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        }
    }),
    Query: {
        users: async () => {
            // Access data layer and get users data
            users = await db
                .collection("users")
                .find()
                .toArray()
                .then((res) => {
                    return res;
                });

            return users;
        },

        currentUser: async (obj, args, context) => {
            if (context.username) {
                try {
                    // Access data layer and get user data
                    user = await db
                        .collection("users")
                        .findOne({username: context.username})
                        .then((res) => {
                            return res;
                        });

                    return user;
                } catch (error) {
                    return null;
                }
            }

            return null;
        },

        loginUser: async (obj, args, context) => {
            // Find user by username and password
            const user = await db
                .collection("users")
                .findOne({username: args.username})
                .then((res) => {
                    return res;
                });

            // Compare hash
            if (user && (await bcrypt.compare(args.password, user.password))) {
                // Generate and return JWT token
                const token = jwt.sign({username: user.username}, process.env.JWT_SECRET);
                return {token: token};
            } else {
                // Throw authentication error
                throw new AuthenticationError("Incorrect username or password.");
            }
        },

        movies: async (obj, args, context) => {
            query = [];
            sort = {};

            if (args.search) {
                // AND each word in search string 
                // (title/overview needs to contain all words in the search string)
                searchCleaned = args.search.replace(/[^A-Za-z0-9- ]+/g, "");

                search = "";

                searchCleaned.split(" ").forEach((word) => {
                    search += '"' + word + '" ';
                });

                query.push({$text: {$search: search.slice(0, -1)}});

                // [Optionally] OR each word in search string 
                // (title/overview only needs to contain some words in the search string)

                //query.push({$text: {$search: args.search}})

                // Sort according to search result relevance
                sort = {score: {$meta: "textScore"}};
            }

            if (args.filter) {
                if (args.filter.genres && args.filter.genres.length != 0) {
                    query.push({genres: {$in: args.filter.genres}});
                }

                if (args.filter.production_companies && args.filter.production_companies.length != 0) {
                    query.push({production_companies: {$in: args.filter.production_companies}});
                }

                if (args.filter.production_countries && args.filter.production_countries.length != 0) {
                    query.push({"production_countries.name": {$in: args.filter.production_countries}});
                }

                if (args.filter.release_date) {
                    query.push({
                        release_date: {
                            $gte: new Date(args.filter.release_date.start + "-01-01"),
                            $lte: new Date(args.filter.release_date.end + "-12-31")
                        }
                    });
                }

                if (args.filter.runtime) {
                    query.push({runtime: {$gte: args.filter.runtime.start, $lte: args.filter.runtime.end}});
                }
            }

            if (args.sortBy && args.sortDirection) {
                sort = {};
                sort[args.sortBy] = args.sortDirection == "DESC" ? -1 : 1;
            }

            movies = await db
                .collection("movies")
                .find({$and: query})
                .sort(sort)
                .toArray()
                .then((res) => {
                    return res;
                });

            return movies;
        }
    },

    Mutation: {
        createUser: async (obj, args, context) => {
            // Check if user is already logged in
            if (context.username) {
                throw new ForbiddenError("You are already logged in.");
            }

            // Check if user already exists
            const existingUser = await db
                .collection("users")
                .findOne({username: args.username})
                .then((res) => {
                    return res;
                });

            if (existingUser) {
                throw new ForbiddenError("User already exists.");
            }

            // Hash password
            args.password = await bcrypt.hash(args.password, BCRYPT_ROUNDS);

            // Access data layer and store user data
            const newUser = await db
                .collection("users")
                .insertOne({username: args.username, password: args.password})
                .then((response) => {
                    return response.ops[0];
                });

            return newUser;
        }
    },

    User: {
        // Hide password hash
        password() {
            return "";
        }
    }
};

module.exports = resolvers;
