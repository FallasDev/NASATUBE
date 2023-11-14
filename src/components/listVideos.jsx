import { useEffect, useState } from "react"
import Caja from "./caja"
import { Link } from "react-router-dom";
export default function ListVideos(){

    const [video, setVideo] = useState([])

    useEffect(() => {
    const consultarListaV = async () => {
        try {
            const keywords = sessionStorage.getItem("keywords")
            if(sessionStorage.getItem("keywords") !== undefined){
                const response = await fetch(`https://images-api.nasa.gov/search?keywords=${keywords}`)
                if(!response.ok){
                    console.log("Error" + response.status)
                }
                const dato = await response.json()
                const listVideo = dato.collection.items
                const firstVideos = listVideo.filter((item,index) => index < 10)
                console.log(firstVideos)
                setVideo(firstVideos)
                console.log(firstVideos)
            }
        } catch (error) {
            console.log(error)
        }
    }
    consultarListaV()
    },[])
    return (
        <ul>
            {video.map((item) => 
            <Link to="/video"> 
            <li onClick={
                () => {
                    sessionStorage.setItem("id_video", item.data[0].nasa_id)
                    sessionStorage.setItem("keywords", typeof item !== "string" ? item.data[0].keywords.toString() : item.data[0].keywords)
                    console.log(item.data[0].nasa_id)
                    window.location.reload()                   
                }
            }>
                <Caja
                key={item.nasa_id}
                title={item.title}
                image={item.links && item.links.length > 0 && (<img src={item.links[0]?.href} alt="Sin vista previa" />)}
            />
            </li> </Link>
            )}
            
        </ul>    
    )
}