function Caja({title,image,key, onClick,className}){
    return (
        <li className={className} onClick={onClick} key={key}>
        {image}
        <h3>{title}</h3>
        </li>
    )
}
export default Caja;