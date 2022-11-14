import "./MenuRow.css";
import { useState, useRef, useEffect } from "react";
import {
  ArrowForwardIosOutlined,
  ArrowBackIosOutlined,
} from "@material-ui/icons";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import numeral from "numeral";
import VegIcon from "../../assests/images/veg-icon.png";
import NonVegIcon from "../../assests/images/non-veg-icon.png";
import { selectUser, addToCartDB, selectCart } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Row({ title, itemList, outlet_id }) {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const [rowItemsPosition, setRowItemsPosition] = useState("first");
  const [isScrollable, setIsScrollable] = useState(false);

  const itemRowRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let maxMedia = width / 300;
    if (itemList.length > maxMedia) {
      setIsScrollable(true);
    }

    return () => {
      setIsScrollable(false);
    };
  }, [itemList]);

  const addToCart = async (item) => {
    item.outlet_id = outlet_id;
    item.quantity = 1;
    cart.some(
      (media) => media.id === item.id && media.outlet_id === item.outlet_id
    )
      ? toast.error("Already in Cart!")
      : dispatch(addToCartDB({ media: item, email: user.email }));
    toast.success("Added to Cart!");
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
    let distance = itemRowRef.current.scrollLeft;
    if (slider === "prev") {
      itemRowRef.current.scrollTo({
        left: distance - 300 < 0 ? 0 : distance - 300,
        behavior: "smooth",
      });
    } else if (slider === "next") {
      itemRowRef.current.scrollTo({
        left:
          distance + 300 >
          itemRowRef.current.scrollWidth - itemRowRef.current.offsetWidth
            ? itemRowRef.current.scrollWidth - itemRowRef.current.offsetWidth
            : distance + 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {itemList.length > 0 && (
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
              ref={itemRowRef}
              onScroll={handleScroll}
            >
              {itemList?.map((item) => (
                <div
                  className="list-item"
                  key={item.id}
                  onClick={() => addToCart(item)}
                >
                  <img
                    loading="lazy"
                    key={item.id}
                    src={item.img}
                    alt={item.name}
                  />
                  <div className="list-itemInfo">
                    <h5 className="list-itemTitle">
                      {item.name}
                      <img
                        className="menu-item-type-icon"
                        src={item?.type === "veg" ? VegIcon : NonVegIcon}
                        alt={item.type}
                      />
                    </h5>
                    <TextTruncate
                      line={2}
                      element="p"
                      containerClassName="list-itemOverview"
                      truncateText="…"
                      text={item.desc}
                    />
                    <div className="list-rating">
                      <Rating
                        name="media-rating"
                        className="mediaRating"
                        value={item.rating}
                        precision={0.5}
                        icon={<StarRoundedIcon fontSize="inherit" readOnly />}
                      />
                      <small className="list-likes">
                        {numeral(item.rating).format("0.0")}
                      </small>
                      <p className="menu-item-price">₹{item.price}</p>
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
