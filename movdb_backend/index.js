const {ApolloServer, gql} = require("apollo-server");

const typeDefs = gql`
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
        movies: [Movie]
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            values = await db
                .collection("movies")
                .find()
                .toArray()
                .then((res) => {
                    return res;
                });

            return values;
        }
    }
};

// Start with 'node index.js'
const server = new ApolloServer({typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://movdb:movdb@it2810-23.idi.ntnu.no:27017/movdb";
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(function (err) {
    console.log("MONGOdb connected");
    db = client.db("movdb");
});
