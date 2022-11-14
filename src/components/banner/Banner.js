import { useEffect } from "react";
import "./Banner.css";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Rating from "@material-ui/lab/Rating";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import numeral from "numeral";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  addMyListDB,
  addHistoryDB,
  removeMyListDB,
  selectMyList,
} from "../../features/userSlice";
import VegIcon from "../../assests/images/veg-icon.png";
import NonVegIcon from "../../assests/images/non-veg-icon.png";
import { useNavigate } from "react-router-dom";

export default function Banner({ title, bannerOutlet, setLoadingProgress }) {
  const user = useSelector(selectUser);
  const myList = useSelector(selectMyList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getDateTime = () => {
  //   let currentdate = new Date();
  //   let date = currentdate.toDateString();
  //   let time = currentdate.toLocaleTimeString();
  //   return [date, time];
  // };

  // useEffect(() => {
  //   setLoadingProgress(40);
  //   setTimeout(() => {
  //     let historyMedia = {
  //       id: bannerOutlet.id,
  //       img: bannerOutlet.img,
  //       name: bannerOutlet.name,
  //       history_date_time: getDateTime(),
  //     };
  //     setLoadingProgress(60);
  //     dispatch(addHistoryDB({ media: historyMedia, email: user.email }));
  //     setLoadingProgress(100);
  //   }, 3000);

  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 10);
  // }, [bannerOutlet, dispatch, setLoadingProgress, user.email]);

  const addToWatchList = async (e) => {
    e.preventDefault();
    dispatch(addMyListDB({ media: bannerOutlet, email: user.email }));
    toast.success("Added to My List!");
  };

  const removeFromWatchList = async (e) => {
    e.preventDefault();
    dispatch(removeMyListDB({ media: bannerOutlet, email: user.email }));
    toast.success("Removed from My List!");
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("${bannerOutlet?.img}")`,
      }}
    >
      <div className="banner-items">
        <p className="banner-featuredInfo">
          {`${title}  `}
          <img
            className="banner-type-icon"
            src={bannerOutlet?.type === "veg" ? VegIcon : NonVegIcon}
            alt={bannerOutlet.type}
          />
        </p>

        <h2 className="banner-featuredTitle">
          {bannerOutlet.name}
          <span className="banner-featuredYear">{`(since ${bannerOutlet.year_of_est})`}</span>
        </h2>
        <h4 className="banner-timings">
          {bannerOutlet.timings + "(Now Open)"}
        </h4>
        <p className="banner-featuredGenres">
          {bannerOutlet?.cuisines?.slice(0, 3).map((cuisine) => (
            <span className="banner-featuredGenre" key={cuisine.id}>
              {cuisine.name}
            </span>
          ))}
        </p>
        <p>{"Address: " + bannerOutlet.address}</p>
        <p>{"Ph No: " + bannerOutlet.phone}</p>
        <div className="banner-featuredDesc">
          {" "}
          <ReactReadMoreReadLess
            charLimit={100}
            readMoreText="[Read More]"
            readMoreClassName="Desc-readMore"
            readLessText="[Read Less]"
            readLessClassName="Desc-readLess"
          >
            {bannerOutlet.desc || "No Description Available."}
          </ReactReadMoreReadLess>
        </div>

        <div className="banner-featuredRating">
          <Rating
            name="media-rating"
            value={bannerOutlet.rating}
            precision={0.5}
            icon={<StarRoundedIcon fontSize="inherit" readOnly />}
          />
          <p className="banner-featuredLikes">
            {bannerOutlet.rating}
            <small>({numeral(bannerOutlet.rating_count).format("0,0")})</small>
          </p>
        </div>
        <Button
          className="banner-button"
          variant="contained"
          onClick={() => {
            navigate(`/outlet?q=${bannerOutlet.id}`);
          }}
          startIcon={<PlayArrowRoundedIcon />}
          disabled={false}
        >
          Visit
        </Button>
        {myList.some(
          (media) =>
            media.id === bannerOutlet.id &&
            media.media_outlet_id === bannerOutlet.media_outlet_id
        ) ? (
          <Button
            className="banner-button remove"
            variant="contained"
            onClick={removeFromWatchList}
            startIcon={<RemoveIcon />}
          >
            Remove From List
          </Button>
        ) : (
          <Button
            className="banner-button"
            variant="contained"
            onClick={addToWatchList}
            startIcon={<AddIcon />}
          >
            Add To List
          </Button>
        )}
      </div>
      <div className="banner-bottomFade" />
    </header>
  );
}
