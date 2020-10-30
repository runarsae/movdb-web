import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {ApolloProvider, createHttpLink} from "@apollo/client";
import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

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
                    },
                    menuOpen: {
                        merge: false
                    }
                }
            }
        }
    })
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#edd12b"
        },
        secondary: {
            main: "#F1E9DB"
        },
        type: "dark"
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
