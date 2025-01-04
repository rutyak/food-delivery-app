import { Link } from "react-router-dom";
import { image_url } from "../../../Config/Config";
import rating from "../../assets/rating-icon.png";
import "./Card.scss";

import React from "react";

const Card = ({
  name,
  cloudinaryImageId,
  imageId,
  action,
  grid,
  cuisines,
  avgRating,
  id,
}) => {
  const imageSrc = cloudinaryImageId
    ? `${image_url}/${cloudinaryImageId}`
    : `${image_url}/${imageId}`;

  return (
    <Link to={`/menu/${id}`}>
      <div className={action? "top-carousal-card" : grid? "grid-card" : "card"}>
        <div className="card-img">
          <img src={imageSrc} alt="card-image"/>
        </div>
        { !action && <div className="info">
          <h2 className="title">{name}</h2>
          <p className="rating">
            <img src={rating} alt="rating" />
            <p>{avgRating}</p>
          </p>
          <p className="cuisines">{cuisines?.join(", ")}</p>
        </div>}
      </div>
    </Link>
  );
};

export default Card;
