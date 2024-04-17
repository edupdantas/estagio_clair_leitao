import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";
import {toast} from "react-toastify";
import Button from "../../components/Button.jsx";
import axios from "axios";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    const options = {
        method: 'POST',
        url: 'https://api.themoviedb.org/3/account/17667603/watchlist',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGE0MTNkZmZlYTBhM2Y2MzZmZWU0NDQzOWM0MTkzNCIsInN1YiI6IjYzZWJiMDU0OGU4NzAyMDA3YTFhMDlhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QNvFDw5CEeu_AI4Ro9NMCsLrJH8pPOlopyEaKH2KRps'
        },
        data: {media_type: 'movie', media_id: id, watchlist: true}
    };

    async function loadFilme(){
        await api.get(`/movie/${id}`, {
            params:{
                api_key: 'e8a413dffea0a3f636fee44439c41934',
                language: 'pt-BR',
            }
        })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('FILME NÃO ENCONTRADO')
                navigate("/",{replace: true})
                return;
            })
    }

    async function adicionar(){
        await axios.request(options).then((r)=>{
            toast.success('Filme adicionado a watchlist do TMDB com sucesso!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(r)
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(()=>{
        loadFilme();
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id);
        if(hasFilme){
            toast.warn('Este filme já está salvo na sua lista!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!', {
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

    if (loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}/10</strong>

            <div className="area-buttons flex">
                <Button onClick={salvarFilme} style={{marginRight:"12px"}}>Salvar</Button>
                <Button onClick={adicionar} style={{marginRight:"12px"}}>
                    Adicionar a watchlist
                </Button>
                <Button>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </Button>
            </div>
        </div>
    )
}

export default Filme;