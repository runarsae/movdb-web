const {SchemaDirectiveVisitor, ForbiddenError} = require("apollo-server");
const {defaultFieldResolver} = require("graphql");

// Custom directive to check if user is authenicated
class isAuthenticated extends SchemaDirectiveVisitor {
    // Field definition directive
    visitFieldDefinition(field) {
        // Get field resolver
        const {resolve = defaultFieldResolver} = field;

        field.resolve = async function (...args) {
            // Check if username is in context
            if (!args[2].username) {
                throw new ForbiddenError("You are not authorized for this ressource.");
            }

            // Resolve field
            return resolve.apply(this, args);
        };
    }
}

module.exports = {isAuthenticated: isAuthenticated};
