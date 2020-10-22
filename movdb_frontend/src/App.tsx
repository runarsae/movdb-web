import React from "react";
import Header from "./components/Header/Header";
import MovieContainer from "./components/MovieContainer/MovieContainer";
import "./App.css";

function App(): JSX.Element {
    return(
      <div> 
            <Header />
            <MovieContainer />
      </div>
    );
}

export default App;
