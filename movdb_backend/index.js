const {ApolloServer} = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const context = require("./context");
const directives = require("./directives");

// Start with 'node index.js'
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    introspection: true,
    playground: true,
    schemaDirectives: directives
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
