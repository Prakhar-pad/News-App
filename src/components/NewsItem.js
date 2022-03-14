import React from "react";

const NewsItem =(props)=> {
  
    let { title, description, imageUrl, newsUrl, source, author, date } =
      props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span class=" badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source}
                        </span>
        </div>
          <img
            src={
              !imageUrl
                ? "https://images.hindustantimes.com/img/2022/01/22/1600x900/Nasa_solar_flare_video_Instagram_1642828362627_1642828381566.PNG"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By{!author ? "unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
