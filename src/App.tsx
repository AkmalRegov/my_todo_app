// import "./App.css";

//have index.ts that exports *
//cannot do this if it export default
import { UserLogin } from "./pages/UserLogin";

// import { UserLogin } from './pages/UserLogin';

import LoginProvider from "./context/LoginProvider";

function App() {
    return (
        <>
            {/* <LoginProvider> */}
            <main>
                <UserLogin />
            </main>
            {/* </LoginProvider> */}
        </>
    );
}

export default App;
