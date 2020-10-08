import { ApolloServer, gql } from "apollo-server";
import { MongoClient } from "mongodb";

const typeDefs = gql`
	type Movie {
		_id: ID
		title: String
		description: String
		poster: String
		trailer: String
	}

	type User {
		_id: ID
		username: String
		password: String
	}

	type MovieRating {
		_id: ID
		user: User
		movie: Movie
		rating: Int
	}

	type Query {
		movies: [Movie]
		users: [User]
		movieRatings: [MovieRating]
	}

	type Mutation {
		
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
		users: async () => {
			values = await db
			.collection("users")
			.find()
			.toArray()
			.then((res) => {
				return res;
			});

			return values;
		},
		movieRatings: async () => {
			values = await db
			.collection("movieRatings")
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

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});


const url = "mongodb://aleksawk:Varmongodb1814@it2810-23.idi.ntnu.no:27017/mytestdatabase";
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect(function (err) {
	console.log("MONGOdb connected");
	db = client.db("mytestdatabase");
});
