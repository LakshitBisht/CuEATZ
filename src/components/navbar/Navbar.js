import React, { useEffect, useRef, useState } from "react";
import { ArrowDropDown } from "@material-ui/icons";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./Navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import LogoImg from "../../assests/images/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "../cart/Cart";

function Navbar({
  searchNavigate = true,
  searchQueryUrl = "",
  setSearchQueryUrl = undefined,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const [navClass, setNavClass] = useState("");
  const [searchActive, setSearchActive] = useState(
    location?.state?.searchActive || !searchNavigate
  );
  const [searchQuery, setSearchQuery] = useState(searchQueryUrl);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  const searchQueryRef = useRef();

  useEffect(() => {
    if (searchNavigate && searchQuery !== "") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      if (!searchNavigate && searchQuery === "") {
        navigate("/browse/home", { state: { searchActive: true } });
      }
    }
  }, [navigate, searchNavigate, searchQuery]);

  useEffect(() => {
    searchActive && searchQueryRef.current.focus();
  }, [searchActive]);

  const navTransition = () => {
    if (window.scrollY > 50) {
      setNavClass("nav-black");
    } else {
      setNavClass("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navTransition);
    return () => {
      window.removeEventListener("scroll", navTransition);
    };
  }, []);

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleHistory = (e) => {
    e.preventDefault();
    navigate("/history");
  };

  // const handleSearchQueryChange = (e) => {
  //   e.preventDefault();
  //   setSearchQuery(e.target.value);
  //   if (e.target.value !== "") {
  //     setSearchQueryUrl &&
  //       setSearchQueryUrl({ q: e.target.value }, { replace: true });
  //   }
  // };

  return (
    <>
      <Cart cartActive={cartActive} setCartActive={setCartActive} />
      <div className={`navbar ${navClass}`}>
        <div
          className={`hamburger-overlay ${
            hamburgerActive ? "overlay-slide-left" : "overlay-slide-right"
          }`}
        >
          <ul>
            <li>
              <NavLink to="/browse/home" data-after={"Home"}>
                Home
              </NavLink>
            </li>
            {/* <li>
            <NavLink to="/browse/outlets" data-after={"Outlets"}>
              Outlets
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse/dishes" data-after={"Dishes"}>
              Dishes
            </NavLink>
          </li> */}
            <li>
              <NavLink to="/mylist" data-after={"Favourites"}>
                Favourites
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-items">
          <ul className="nav-left">
            <div
              className={`hamburger-lines ${hamburgerActive ? "active" : ""} ${
                searchActive ? "hidden" : ""
              }`}
              onClick={() => setHamburgerActive(!hamburgerActive)}
            >
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <li>
              <NavLink to="/browse/home" className="logo-link">
                <img className="logo" src={LogoImg} alt="logo.png" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/browse/home">Home</NavLink>
            </li>
            {/* <li>
            <NavLink to="/browse/outlets">Outlets</NavLink>
          </li>
          <li>
            <NavLink to="/browse/dishes">Dishes</NavLink>
          </li> */}
            <li>
              <NavLink to="/mylist">Favourites</NavLink>
            </li>
          </ul>

          <ul className="nav-right">
            {/* <li
            className={`nav-search ${searchActive ? "open" : ""}`}
            onClick={() => setSearchActive(true)}
          >
            <SearchRoundedIcon
              style={{ fontSize: 20 }}
              className="nav-searchIcon"
              onClick={() => setSearchActive(true)}
            />
            <input
              type="search"
              ref={searchQueryRef}
              value={searchQuery}
              onBlur={() => setSearchActive(false)}
              onChange={handleSearchQueryChange}
              placeholder="Search..."
            />
          </li> */}
            {user?.photoURL && (
              <>
                <li className="nav-cart">
                  <div
                    className="cart-link"
                    onClick={() => {
                      setCartActive(true);
                    }}
                  >
                    <ShoppingCartIcon />
                  </div>
                </li>
                <div className="nav-profile">
                  <img
                    className="avatar"
                    src={user.photoURL}
                    alt="avatar.png"
                  />
                  <ArrowDropDown className="nav-icon" />
                  <ul className="options">
                    <li onClick={handleProfile}>Profile</li>
                    <li onClick={handleHistory}>History</li>
                    <li
                      onClick={() => {
                        signOut(auth);
                        toast.success("We'll be waiting for your return!");
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
