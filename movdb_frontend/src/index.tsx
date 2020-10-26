import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {ApolloProvider, createHttpLink} from "@apollo/client";
import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {resolvers, typeDefs} from "./resolvers";
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
    }),
    typeDefs,
    resolvers
});

declare module "@material-ui/core/styles/createBreakpoints" {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        mr: true;
        md: true;
        lg: true;
        xl: true;
    }
}
const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            mr: 750,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        primary: {
            light: "#fff",
            main: "rgb(23, 105, 170)",
            dark: "#000"
        },
        secondary: {
            main: "#f44336"
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
