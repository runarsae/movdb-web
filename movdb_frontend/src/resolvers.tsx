import { gql } from '@apollo/client';

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

export const resolvers = {};