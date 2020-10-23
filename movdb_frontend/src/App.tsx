import React from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import "./App.css";

function App(): JSX.Element {
    return (
        <div>
            <Header />
            <Menu />
        </div>
    );
}

export default App;
