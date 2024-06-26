import { useEffect, useState } from "react";
import "./favoritos.css"
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import Button from "../../components/Button.jsx";

function Favoritos(){

    const [filmes,setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])

    },[])

    function excluirFilme(id){

        let filtroFilmes = filmes.filter((item)=> {
            return(item.id !== id);
        })
        
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes));
        toast.success('Filme excluido com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

    }

    return(
        <div className="meus-filmes" >
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo. ,_,</span>}

            <ul className="lista-filmes">
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                            <Link to={`/filme/${item.id}`} style={{padding:0,backgroundColor:"#FFF"}}>
                                    <Button>Detalhes</Button>
                                </Link>
                                <Button onClick={()=> excluirFilme(item.id)}>Excluir</Button>
                            </div>

                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Favoritos;