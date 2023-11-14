import React, { useEffect, useState } from "react";
import InfoVideo from "./infoVideo";
import ListVideos from "./listVideos";
import { Link } from "react-router-dom";

function InicioDetails() {
  const [video, setVideo] = useState("");
  const [api, setApi] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarApi = async () => {
      try {
        const idVideo = sessionStorage.getItem("id_video");

        if (!idVideo) {
          throw new Error("No se encontró 'id_video' en sessionStorage.");
        }

        const response = await fetch(
          `https://images-api.nasa.gov/asset/${idVideo}`
        );

        const responseArray = await fetch(`https://images-api.nasa.gov/search?nasa_id=${idVideo}}`)
        
        if (!response.ok) {
          throw new Error("Error " + response.status);
        }

        const data = await response.json();
        const arrayData = await responseArray.json()

        if (data.collection.items.length > 0) {
          const videoUrl = data.collection.items;
          const array = arrayData.collection.items[0].data
          setApi(array)
          const mp4 = videoUrl.find((item,index) => item?.href.includes("mp4"))
          console.log(mp4.href)
          setVideo(mp4);
        } else {
          throw new Error("No se encontraron datos de video.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    buscarApi();
  }, [sessionStorage.getItem("id_video")]);

  return (
    <div>
      {loading && <p>Cargando video...</p>}
      {error && <p>Error: {error}</p>}
      {video && (
        <video controls width="600" height="400">
         
          <source src={video.href} type="video/webM" />
          Tu navegador no soporta el elemento de video.
        </video>
      )}
      {api.map((item,index) =>
      <div key={item.nasa_id}>
        <InfoVideo
        title={item.title}
        dataCreated={item.date_created}
        keywords={
          item.keywords && item.keywords.length > 0
            ? item.keywords[0].split(",").map(
                (keyword, index) => index < 5 && <span>#{keyword.replaceAll(" ", "")} </span>
              )
            : ""
        }
        description={item.description}
        />       
      </div>
      )}
      <aside>
        <ListVideos/>
      </aside>
    </div>
  );
}

export default InicioDetails;
