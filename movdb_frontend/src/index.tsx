import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import {ApolloClient,InMemoryCache,gql,NormalizedCacheObject, useQuery} from '@apollo/client';
import {resolvers, typeDefs} from "./resolvers";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  //client now has typeDefs and resolvers from reslovers.tsx
  typeDefs,
  resolvers
});

// The default menu state to be written to the apollo cache
const defaultMenuValues = {
  genres: [],
  production_companies: [],
  production_countries: [],
  release_interval: [1950, 2020],
  runtimes_interval: [30, 180]
}


//writing the object above to the cache using the Menu query
client.cache.writeQuery({
  query: gql`
    query menu_parameters{
      Menu{
        genres
        production_companies
        production_countries
        release_interval
        runtimes_interval
      }
    }
  `,
  data: {
    Menu: [defaultMenuValues]
  }
  //the data is now written to the cache at Menu
});

//now we retrieve the data using the Menu query, and specifying that we want to read from the cache
const menuValues = gql`
  query menu_parameters{
    Menu @client
  }
`;

// just a component that logs data and then returns the App component as usual
function GetMenuValues(){
  const { data } = useQuery(menuValues);
  console.log(data);
  return <App />
}


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GetMenuValues/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
