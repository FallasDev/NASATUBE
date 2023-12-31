import { useEffect } from "react";
import { useState } from "react"
import Caja from "./caja";
import { Link} from "react-router-dom";
import "../styles/inicio.css"
import { Header } from "./header";
import Logo  from '../imagenes/Nasa.webp'

export function Inicio(){

    const [apiData, setApiData] = useState([]);
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const buscarApi = async () => {
            try{
                const response = await fetch(`https://images-api.nasa.gov/search?q=${(inputValue === "") ? "NASA" : inputValue}`)
                
                if(!response.ok){
                    throw new Error("Error:" + response.status)
                }    
                const data = await response.json()
                setApiData(data.collection.items)
        } catch(error){
            console.log(error)
        }
    }
    buscarApi()
},[inputValue])
    const handleInput = (ev) => {
        setInputValue(ev.target.value)
    }
    return <form action="" className="inicio-container">
    <Header className="input-container" 
    search={
        <input className="input" placeholder="Buscar..." type="text" name="search" value={inputValue} onChange={handleInput}/>
    }
    navClass="nav-container"
    logo={Logo}
    sobreNosotros={<h4></h4>}
    />
        {apiData && apiData.length > 0 &&
        <ul className="inicio-videos-container">
            {
            apiData.map((item, index) => (item.data[0].media_type === "video") &&
            <Link to="/video">
                    <Caja 
                    className="video"
                    onClick={
                        () => {
                            sessionStorage.setItem("id_video",item.data[0].nasa_id)
                            sessionStorage.setItem("keywords", (typeof item.data[0].keywords === "string") ? item.data[0].keywords.toString() : item.data[0].keywords)
                            console.log(item.data[0].nasa_id)             
                        }
                    }
                    key={item.data[0].nasa_id} 
                    title={
                        item.data[0].title
                    } 
                    image={item.links && item.links.length > 0 && (<img className="img-video" src={item.links[0]?.href} alt="Sin vista previa" />)}
                    /> 
                </Link>         
            )}
        </ul>}       
    </form>
}