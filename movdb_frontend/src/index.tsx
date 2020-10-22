import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {ApolloProvider} from "@apollo/client";
import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {resolvers, typeDefs} from "./resolvers";
import {MENU_VALUES} from "./queries";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
		typePolicies: {
			Query: {
			  fields: {
				menuValues: {
				  merge: false
				}
			  }
			}
		  }
	}),
    typeDefs,
    resolvers
});

// The default menu state to be written to the Apollo cache
const defaultMenuValues = {
    genres: [],
    production_countries: [],
    release_interval: [1950, 2020],
	  runtimes_interval: [30, 180]
};

// Write the default menu values to the cache
client.writeQuery({
    query: MENU_VALUES,
    data: {
        menuValues: defaultMenuValues
    }
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
