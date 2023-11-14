export default function InfoVideo({title,dataCreated,keywords,description}){
    return (
        <section>
            <h3>{title}</h3>
            <div>
                <span>{dataCreated}</span>
                <span>{keywords}</span>
                <p>{description}</p>
            </div>
        </section>
    )
}