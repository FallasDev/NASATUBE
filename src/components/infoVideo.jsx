import { useState } from 'react'
import '../styles/infoVideo.css'

export default function InfoVideo({title,dataCreated,keywords,description,classNameDescripcion}){

    const [caja, setCaja] = useState("info-video-caja")

    return (
        <section className='section-info-video'>
            <h3>{title}</h3>
            <div className={caja}>
                <span>{dataCreated}</span>
                <span>{keywords}</span>
                <p className='description'>{description}</p>
                {caja === "info-video-caja" && <button className='show-more' onClick={() => {
                    setCaja("info-video-caja-full")
                }}>...Mostrar más</button>}
                {caja !== "info-video-caja" && <button className='show-less' onClick={() => {
                    setCaja("info-video-caja")
                }}>Mostrar menos</button>}
            </div>
        </section>
        
    )
}