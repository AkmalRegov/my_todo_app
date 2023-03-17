import React from "react";
import logo from "./logo.svg";
import "./App.css";

//have index.ts that exports *
//cannot do this if it export default
import { UserLogin } from "./pages/UserLogin";

// import { UserLogin } from './pages/UserLogin';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
            <main>
                <UserLogin />
            </main>
        </div>
    );
}

export default App;