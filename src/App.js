import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import './App.css'
import AnimePage from "./pages/animepage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}>
                </Route>
                <Route path="/anime/:animeID" element={<AnimePage/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};


export default App;
