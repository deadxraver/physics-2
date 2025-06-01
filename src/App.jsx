import NavBar from './components/NavigationBar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MagneticInduction from "./components/xvost/MagneticInduction";
import Fluctuations from "./components/gorb/Fluctuations";
import Contact from "./components/Contact";
import Main from "./components/introduction/Main";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img
                    src="https://avatars.mds.yandex.net/i?id=16492d525376ea328f1c34917b67f3f3_l-8000733-images-thumbs&n=13"
                    width={640}
                    height={360}
                    alt={"всем прив картинка"}>
                </img>

            </header>
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