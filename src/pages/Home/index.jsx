import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'

// /movie/550?api_key=e8a413dffea0a3f636fee44439c41934

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadFilmes(){
        const response = await api.get('movie/now_playing', {
            params:{
                api_key: 'e8a413dffea0a3f636fee44439c41934',
                language: 'pt-BR',
                page: 1,
            }
        })

        // console.log(response.data.results.slice(0,10));
        setFilmes(response.data.results.slice(0,10))
        setLoading(false);

    }
    
    useEffect(()=>{
        loadFilmes();
    }, [])

    if (loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
        }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}></img>
                            <Link to={`/filme/${filme.id}`} className="text-center">Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;