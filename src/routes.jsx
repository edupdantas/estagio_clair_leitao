import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./components/Header/index.jsx";

import Home from "./pages/Home/index.jsx";
import Filme from "./pages/Filme/index.jsx";
import Erro from "./pages/Erro/index.jsx";
import Favoritos from "./pages/Favoritos/index.jsx";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/> 
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/filme/:id" element={<Filme/>} />
                <Route path="/favoritos" element={<Favoritos/>} />


                <Route path="*" element={<Erro/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;