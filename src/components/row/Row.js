import "./Row.css";
import { useState, useRef, useEffect } from "react";
import {
  ArrowForwardIosOutlined,
  ArrowBackIosOutlined,
} from "@material-ui/icons";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import numeral from "numeral";
import { useNavigate, useLocation } from "react-router-dom";

export default function Row({ title, outletList }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [rowItemsPosition, setRowItemsPosition] = useState("first");
  const [isScrollable, setIsScrollable] = useState(false);

  const outletRowRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let maxMedia = width / 300;
    if (outletList.length > maxMedia) {
      setIsScrollable(true);
    }

    return () => {
      setIsScrollable(false);
    };
  }, [outletList]);

  const handleClick = (outlet) => {
    navigate(`${location.pathname}`, { state: { bannerMedia: outlet } });
    window.scrollTo(0, 0);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    if (Math.floor(e.target.scrollLeft) === 0) {
      setRowItemsPosition("first");
    } else if (
      Math.ceil(e.target.scrollLeft) ===
      e.target.scrollWidth - e.target.offsetWidth
    ) {
      setRowItemsPosition("last");
    } else {
      setRowItemsPosition("middle");
    }
  };

  const handleSlider = (slider) => {
    let distance = outletRowRef.current.scrollLeft;
    if (slider === "prev") {
      outletRowRef.current.scrollTo({
        left: distance - 300 < 0 ? 0 : distance - 300,
        behavior: "smooth",
      });
    } else if (slider === "next") {
      outletRowRef.current.scrollTo({
        left:
          distance + 300 >
          outletRowRef.current.scrollWidth - outletRowRef.current.offsetWidth
            ? outletRowRef.current.scrollWidth -
              outletRowRef.current.offsetWidth
            : distance + 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {outletList.length > 0 && (
        <div className="row">
          <ArrowBackIosOutlined
            className="slider-arrow back"
            onClick={() => handleSlider("prev")}
            style={rowItemsPosition === "first" ? { opacity: 0 } : {}}
          />
          <div
            className={`row-list ${
              rowItemsPosition !== "last" ? "fade-right" : ""
            }`}
          >
            <h4>{title}</h4>
            <div
              className={`list-items ${
                rowItemsPosition !== "first" ? "fade-left" : ""
              }`}
              ref={outletRowRef}
              onScroll={handleScroll}
            >
              {outletList?.map((outlet) => (
                <div
                  className="list-item"
                  key={outlet.id}
                  onClick={() => handleClick(outlet)}
                >
                  <img
                    loading="lazy"
                    key={outlet.id}
                    src={outlet.img}
                    alt={outlet.name}
                  />
                  <div className="list-itemInfo">
                    <h5 className="list-itemTitle">
                      {outlet.name}
                      <span className="list-itemYear">
                        ({outlet.year_of_est})
                      </span>
                    </h5>
                    <TextTruncate
                      line={2}
                      element="p"
                      containerClassName="list-itemOverview"
                      truncateText="…"
                      text={outlet.desc}
                    />
                    <div className="list-rating">
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
          <ArrowForwardIosOutlined
            className="slider-arrow forward"
            onClick={() => handleSlider("next")}
            style={
              rowItemsPosition === "last" || !isScrollable ? { opacity: 0 } : {}
            }
          />
        </div>
      )}
    </>
  );
}
