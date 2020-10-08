const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type counters{
    _id:String,
    seq:String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.

  type Query {
    my_query:[counters]
    hello: String
  }
`;


const resolvers = {
  Query: {
    hello: () => {
      return `hey sup ? `;
    },
    my_query: async () => {
      values = await db.collection('counters').find().toArray().then(res => { return res });
      return values
    }
  }
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// Start with 'node index.js'
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
  console.log("MONGOdb connected");
  db = client.db("users"); //mongodb database name
});