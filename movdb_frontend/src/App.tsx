import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
import MoviePopup from "./MoviePopup";

function App(): JSX.Element {
    return <MoviePopup movieID={"tt0035423"} open={true} />;
}

export default App;
