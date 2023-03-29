// import "./App.css";

//have index.ts that exports *
//cannot do this if it export default
import { UserLogin } from "./pages/UserLogin";

function App() {
    return (
        <>
            <main>
                <UserLogin />
            </main>
        </>
    );
}

export default App;
