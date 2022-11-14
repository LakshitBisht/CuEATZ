import React from "react";
import "./BigCards.css";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";

function BigCards({ title, media }) {
  const navigate = useNavigate();

  const handleClick = (media) => {
    navigate("/browse/home", { state: { bannerMedia: media } });
  };

  return (
    <div className="big-cards">
      <h4>{title}</h4>
      <div className="big-list">
        {media?.map((outlet) => (
          <div
            className="big-list-item"
            key={outlet.id}
            onClick={() => handleClick(outlet)}
          >
            <img
              loading="lazy"
              key={outlet.id}
              src={outlet.img}
              alt={outlet.name}
            />
            <div className="big-list-itemInfo">
              <h5 className="big-list-itemTitle">
                {outlet.name}
                <span className="big-list-itemYear">
                  ({outlet.year_of_est})
                </span>
              </h5>
              <TextTruncate
                line={2}
                element="p"
                containerClassName="big-list-itemOverview"
                truncateText="…"
                text={outlet.desc}
              />
              <div className="big-list-rating">
                <Rating
                  name="media-rating"
                  className="mediaRating"
                  value={outlet.rating}
                  precision={0.5}
                  icon={<StarRoundedIcon fontSize="inherit" readOnly />}
                />
                <small className="list-likes">
                  {numeral(outlet.rating).format("0.0")}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BigCards;
