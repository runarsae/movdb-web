import React from "react";
import Header from "./components/Header/Header";
import MovieContainer from "./components/MovieContainer/MovieContainer";
import Menu from "./components/Menu/Menu";
import "./App.css";

function App(): JSX.Element {
    return (
        <div>
            <Header />
            <Menu />
            <MovieContainer />
        </div>
    );
}

export default App;
