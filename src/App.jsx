import NavBar from './components/NavigationBar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MagneticInduction from "./components/xvost/MagneticInduction";
import Fluctuations from "./components/gorb/Fluctuations";
import Contact from "./components/Contact";
import Main from "./components/introduction/Main";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/magnetic_induction" element={<MagneticInduction />} />
                    <Route path="/fluctuations" element={<Fluctuations />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Редирект на главную, если путь не найден */}
                    <Route path="*" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;