import "./Cart.css";
import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { motion } from "framer-motion";
import EmptyCartIllustration from "../../assests/illustrations/empty_cart.svg";
import {
  selectUser,
  removeFromCartDB,
  clearCartDB,
  selectCart,
  addOneCartDB,
  removeOneCartDB,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VegIcon from "../../assests/images/veg-icon.png";
import NonVegIcon from "../../assests/images/non-veg-icon.png";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function Cart({ cartActive = false, setCartActive }) {
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState([0]);
  const [showCart, setShowCart] = useState();

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cartItems.length; i++) {
      temp += cartItems[i].price * cartItems[i].quantity;
    }
    setTotal(temp);
  }, [cartItems]);

  useEffect(() => {
    cartActive ? setShowCart("visible") : setShowCart("hidden");
  }, [cartActive]);

  const handleClick = (item) => {
    navigate("/outlet?q=" + item.outlet_id);
  };

  const cartMinusOne = () => {
    if (cartItems.quantity > 1) {
      dispatch(removeOneCartDB({ media: cartItems, email: user.email }));
    } else dispatch(removeFromCartDB({ media: cartItems, email: user.email }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`cart ${showCart}`}
    >
      <div className="cart-nav">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setShowCart("hidden");
            setCartActive(false);
          }}
        >
          <CloseIcon />
        </motion.div>
        <p className="cart-title">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="cart-clear-button"
          onClick={() => {
            dispatch(clearCartDB({ email: user.email }));
          }}
        >
          Clear <ClearAllIcon className="cart-clear-icon" />
        </motion.p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="cart-items">
          <div className="cart-items-container">
            {cartItems?.map((item, index) => (
              <div className="cart-list-item" key={index}>
                <>
                  <img
                    loading="lazy"
                    src={item.img}
                    alt={item.name}
                    onClick={() => handleClick(item)}
                  />
                  <div
                    className="cart-list-itemInfo"
                    onClick={() => handleClick(item)}
                  >
                    <h5 className="cart-list-itemTitle">
                      {`${item.name}  `}
                      <img
                        className="cart-type-icon"
                        src={item?.type === "veg" ? VegIcon : NonVegIcon}
                        alt={item.type}
                      />
                    </h5>
                    <div className="cart-list-rating">₹{item.price}</div>
                  </div>
                </>
                <div className="cart-quantity-div">
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => {
                      dispatch(
                        addOneCartDB({ email: user.email, media: item })
                      );
                    }}
                  >
                    <RemoveIcon className="cart-quantity-icon" />
                  </motion.div>

                  <p className="cart-quantity">{item.quantity}</p>

                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={() => {
                      cartMinusOne();
                    }}
                  >
                    <AddIcon className="cart-quantity-icon" />
                  </motion.div>
                </div>
                <div
                  className="cart-list-itemDelete"
                  onClick={() => {
                    dispatch(
                      removeFromCartDB({ media: item, email: user.email })
                    );
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            ))}
          </div>

          <div className="cart-bottom">
            <div className="cart-value">
              <p className="cart-light-text">Sub Total</p>
              <p className="cart-light-text">₹ {total}</p>
            </div>
            <div className="service-charge">
              <p className="cart-light-text">Service Charge</p>
              <p className="cart-light-text">₹ 5</p>
            </div>

            <div className="cart-line"></div>

            <div className="cart-total">
              <p className="cart-dark-text">Total</p>
              <p className="cart-dark-text">₹{total + 5}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="checkout-button"
            >
              Check Out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img
            src={EmptyCartIllustration}
            className="empty-cart-illustration"
            alt=""
          />
          <p className="empty-cart-text">Add some items to your cart</p>
        </div>
      )}
    </motion.div>
  );
}

export default Cart;
