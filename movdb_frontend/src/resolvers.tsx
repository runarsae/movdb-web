import { gql, ApolloCache, Resolvers } from '@apollo/client';

export const typeDefs = gql`
  type Menu {
    genres: String
    production_companies: String
    production_countries: String
    release_interval: Int
    runtimes_interval: Int
  }

  type Query {
    menu_parameters : [Menu]
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache } : { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers = {};