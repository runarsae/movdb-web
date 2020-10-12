const { ApolloServer, gql } = require("apollo-server");

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
		runtime: String
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
		},
  },

  Mutation: {
	// Functions that writes content here (addRating, addUser)
  },
};


// Start with 'node index.js'
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://aleksawk:Varmongodb1814@it2810-23.idi.ntnu.no:27017/mytestdatabase";
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect(function (err) {
	console.log("MONGOdb connected");
	db = client.db("mytestdatabase");
});
