import { useEffect, useState } from "react"
import fotoPerfil from '../imagenes/fotoPerfil.webp'
import '../styles/commentBox.css'


export function CommentBox() {
    
    const idVideo = sessionStorage.getItem("id_video")
    let commentsStorage = JSON.parse(localStorage.getItem("comments")) || []
    const existComment = commentsStorage.some(item => {return item.id === idVideo})
    const commentsObject = {
        id: idVideo,
        comments: []
    }

    const [hasComment, setHasComment] = useState("");
    const [inputFocus, setInputFocus] = useState(false)
    const [randomUser, setRandomUser] = useState(null)

    const handleInput = (ev) => {
        setHasComment(ev.target.value)
    }
    const eliminateRepeatStorage = () => {
        if (commentsStorage.filter(item => item.id === idVideo).length > 1) {
            const filteredStorage = commentsStorage.findIndex(item => item.id === idVideo)
            commentsStorage.splice(filteredStorage, 1)
        }
    }
    const addComment = () => {
        if (commentsStorage.filter(item => item.id === idVideo).length > 0) {
            const updatedStorage = commentsStorage.map(item =>
                item.id === idVideo ? { ...item, comments: [...item.comments, hasComment] } : item
            );
            commentsStorage = updatedStorage
        } else {
            commentsObject.comments.push(hasComment)
            commentsStorage.push(commentsObject)
        }
    }
    const handleSubmit = () => {
        addComment()
        eliminateRepeatStorage()
        if(hasComment.length > 0){
            localStorage.setItem("comments", JSON.stringify(commentsStorage))
        } else{
            alert("Comentario invalido!")
        }
        console.log(commentsStorage)
        console.log(commentsStorage.find(item => item.id === idVideo))
        console.log(randomUser)
        setHasComment("")
        localStorage.clear()
    }

    return (
        <div className="comment-box">
            {existComment && <h4 className="num-comments"> {commentsStorage.find(item => item.id === idVideo).comments.length} {commentsStorage.find(item => item.id === idVideo).comments.length > 1 ? "Comentarios" : "Comentario"}</h4>}
            <div className="inputButtons-comments">
                <input className="input-comments" type="text" name="comment" placeholder="Añade un comentario..." onChange={handleInput} value={hasComment} onFocus={() => {setInputFocus(true)}}/>
                <div className="buttons-comments">
                    {inputFocus && <button type="button" onClick={() => {
                        setInputFocus(false) 
                        setHasComment("")
                    }}>Cancelar</button>}
                    {inputFocus && <button type="button" disabled={hasComment.length === 0} onClick={handleSubmit}>Comentar</button>}
                </div>
            </div>
            {existComment && commentsStorage.find(item => item.id === idVideo).comments.map((comment, index) => <div className="comment" key={index}>
                <img className="fotoDefault" src={fotoPerfil} alt="FotoUsuario" />
                <div className="user-comment">
                    <span>@user{Math.round(Math.random() * 10000)}</span>
                    <span>{comment}</span>
                </div>
            </div>)}
        </div>
    );
}
