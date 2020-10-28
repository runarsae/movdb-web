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
        movie: async (obj, args, context) => {
            movie = await db.collection("movies").findOne({imdb_id: args.imdb_id});

            return movie;
        },

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
            filter = [];
            sort = {};

            if (args.search) {
                // AND each word in search string
                // (title/overview needs to contain all words in the search string)
                searchCleaned = args.search.replace(/[^A-Za-z0-9- ]+/g, "");

                search = "";

                searchCleaned.split(" ").forEach((word) => {
                    search += '"' + word + '" ';
                });

                filter.push({$text: {$search: search.slice(0, -1)}});

                // [Optionally] OR each word in search string
                // (title/overview only needs to contain some words in the search string)

                //filter.push({$text: {$search: args.search}})

                // Sort according to search result relevance
                sort = {score: {$meta: "textScore"}};
            }

            if (args.filter) {
                if (args.filter.genres && args.filter.genres.length != 0) {
                    filter.push({genres: {$in: args.filter.genres}});
                }

                if (args.filter.production_companies && args.filter.production_companies.length != 0) {
                    filter.push({production_companies: {$in: args.filter.production_companies}});
                }

                if (args.filter.production_countries && args.filter.production_countries.length != 0) {
                    filter.push({"production_countries.name": {$in: args.filter.production_countries}});
                }

                if (args.filter.release_date) {
                    filter.push({
                        release_date: {
                            $gte: new Date(args.filter.release_date.start + "-01-01"),
                            $lte: new Date(args.filter.release_date.end + "-12-31")
                        }
                    });
                }

                if (args.filter.runtime) {
                    filter.push({runtime: {$gte: args.filter.runtime.start, $lte: args.filter.runtime.end}});
                }
            }

            if (args.sortBy && args.sortDirection) {
                sort = {};
                sort[args.sortBy] = args.sortDirection == "DESC" ? -1 : 1;
            }

            query = await db
                .collection("movies")
                .find(filter.length == 0 ? {} : {$and: filter})
                .sort(sort)
                .skip((args.page - 1) * args.pageSize)
                .limit(args.pageSize);

            movies = await query.toArray().then((res) => {
                return res;
            });

            // Compute the total number of pages
            pageCount = Math.floor((await query.count()) / args.pageSize);
            reminder = (await query.count()) % args.pageSize;

            if (reminder > 0) {
                pageCount++;
            }

            return {
                movies: movies,
                pageCount: pageCount
            };
        },

        menuOptions: async (obj, args, context) => {
            movies = await db.collection("movies");

            genres = [];
            await movies.distinct("genres", (err, result) => {
                genres = result;
            });

            productionCompanies = [];
            await movies.distinct("production_companies", async (err, result) => {
                productionCompanies = JSON.parse(JSON.stringify(result));
            });

            productionCountries = [];
            await movies.distinct("production_countries.name", (err, result) => {
                productionCountries = result;
            });

            releaseDateStart = await movies
                .find({}, {release_date: 1, _id: 0})
                .sort({release_date: 1})
                .limit(1)
                .toArray()
                .then((res) => {
                    return parseInt(res[0].release_date.toDateString().slice(-4));
                });

            releaseDateEnd = await movies
                .find({}, {release_date: 1, _id: 0})
                .sort({release_date: -1})
                .limit(1)
                .toArray()
                .then((res) => {
                    return parseInt(res[0].release_date.toDateString().slice(-4));
                });

            runtimeStart = await movies
                .find({}, {runtime: 1, _id: 0})
                .sort({runtime: 1})
                .limit(1)
                .toArray()
                .then((res) => {
                    return res[0].runtime;
                });

            runtimeEnd = await movies
                .find({}, {runtime: 1, _id: 0})
                .sort({runtime: -1})
                .limit(1)
                .toArray()
                .then((res) => {
                    return res[0].runtime;
                });

            menuOptions = {
                genres: genres,
                productionCompanies: productionCompanies,
                productionCountries: productionCountries,
                releaseDateInterval: {
                    start: releaseDateStart,
                    end: releaseDateEnd
                },
                runtimeInterval: {
                    start: runtimeStart,
                    end: runtimeEnd
                }
            }},

            likes: async (obj, args, context) => {
                likes = await db.collection("likes");
                likesCount = likes.find({imdb_id: args.imdb_id}).count();
                userLiked = likes.find({imdb_id: args.imdb_id, username: args.username}).count();
                hasLiked = userLiked==0;

                return {
                    likesCount: likesCount,
                    hasLiked: hasLiked
                };
            },
            

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
        },

        createLike: async(obj, args, context) => {
            if (args.username){
                const existingLike = await db
                    .collection("likes")
                    .findOne({imdb_id: args.imdb_id, username: args.username});
                
                if(existingLike){
                    await db
                    .collection("likes")
                    .deleteOne({imdb_id: args.imdb_id, username: args.username})
                    .then(() => {
                    })
                    return existingLike;
                }
                
                const newLike = await db
                    .collection("likes")
                    .insertOne({imdb_id: args.imdb_id, username: args.username})
                    .then(() => {
                    })
                
                return existingLike;
                }
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
