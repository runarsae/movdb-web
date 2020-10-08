const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
	type Movie {
		_id: ID
		title: String
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
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// Start with 'node index.js'
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://aleksawk:Varmongodb1814@it2810-23.idi.ntnu.no:27017/mytestdatabase";
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect(function (err) {
	console.log("MONGOdb connected");
	db = client.db("mytestdatabase"); //mongodb database name
});
