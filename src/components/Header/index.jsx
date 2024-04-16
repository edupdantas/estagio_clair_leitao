import './header.css'
import { Link } from 'react-router-dom';
import Button from "../Button.jsx";


function Header(){
    return(
        <header>
            <h1>EDU</h1>
            <Link className="logo" to="/" >Prime Flix</Link>
            <Link className="favoritos" to="/favoritos">
                <Button>Meus Filmes</Button>
            </Link>
            
        </header>
    )
}

export default Header;