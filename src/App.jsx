import NavBar from './components/NavigationBar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MagneticInduction from "./components/xvost/MagneticInduction";
import Contact from "./components/Contact";
import Main from "./components/introduction/Main";
import EjsEmbed from "./components/EjsEmbed";

function App() {
    return (
        <div className="App">
            <br></br>
            <br></br>
            <br></br>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/magnetic_induction" element={<MagneticInduction />} />
                    <Route path="/fluctuations" element={<EjsEmbed />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Main/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;