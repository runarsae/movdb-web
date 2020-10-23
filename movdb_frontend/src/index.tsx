import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {ApolloProvider, createHttpLink} from "@apollo/client";
import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {resolvers, typeDefs} from "./resolvers";

const httpLink = createHttpLink({
    uri: "http://localhost:4000"
});

const authLink = setContext((_, {headers}) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
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
