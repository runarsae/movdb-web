import React from "react";
import Header from "./components/Header/Header";
import MovieContainer from "./components/MovieContainer/MovieContainer";
import Menu from "./components/Menu/Menu";
import "./App.css";
import MoviePopup from "./MoviePopup";

function App(): JSX.Element {
    return (
        <div>
            <Header />
            <Menu />
            <MovieContainer />
            <MoviePopup movieId={"tt0035423"} open={true} />
        </div>
    );
}

export default App;
