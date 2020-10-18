const {AuthenticationError, ForbiddenError} = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

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

        movies: async () => {
            movies = await db
                .collection("movies")
                .find()
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
