import "./Outlet.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MenuRow from "../../components/menurow/MenuRow";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OutletDB from "../../assests/json/outletdb.json";
import VegIcon from "../../assests/images/veg-icon.png";
import NonVegIcon from "../../assests/images/non-veg-icon.png";

function dynamicsort(property, order) {
  var sort_order = 1;
  if (order === "desc") {
    sort_order = -1;
  }
  return function (a, b) {
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } else if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    } else {
      return 0 * sort_order;
    }
  };
}

function Outlet() {
  const [outletData, setOutletData] = useState([]);
  const [outletQueryUrl] = useSearchParams();

  const [recommendedList, setRecommendedList] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [comboList, setComboList] = useState([]);
  const [snacksList, setSnacksList] = useState([]);
  const [riceList, setRiceList] = useState([]);
  const [breadsList, setBreadsList] = useState([]);
  const [mainCourseList, setMainCourseList] = useState([]);
  const [dessertsList, setDessertsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  useEffect(() => {
    setOutletData(
      OutletDB.data.filter((Outlet) => Outlet.id === outletQueryUrl.get("q"))[0]
    );
  }, [outletQueryUrl]);

  useEffect(() => {
    if (outletData.menu) {
      setRecommendedList(
        outletData.menu.filter(
          (Item) => Item.rating > 4 && Item.ratings_no < 1000
        )
      );
      setPopularList(outletData.menu.sort(dynamicsort("ratings_no", "desc")));
      setComboList(
        outletData.menu.filter(
          (Item) => Item.category === "combo" || Item.category === "thali"
        )
      );
      setSnacksList(
        outletData.menu.filter(
          (Item) => Item.category === "snacks" || Item.category === "starter"
        )
      );
      setRiceList(
        outletData.menu.filter(
          (Item) => Item.category === "rice" || Item.category === "noodles"
        )
      );
      setBreadsList(
        outletData.menu.filter((Item) => Item.category === "breads")
      );
      setMainCourseList(
        outletData.menu.filter((Item) => Item.category === "main-course")
      );
      setDessertsList(
        outletData.menu.filter((Item) => Item.category === "desserts")
      );
      setDrinksList(
        outletData.menu.filter((Item) => Item.category === "drinks")
      );
    }
  }, [outletData]);

  return (
    <div className="outlet">
      <Navbar />
      <section
        className="v-center"
        id="outlet-header"
        style={{ backgroundImage: `url(${outletData.img})` }}
      >
        <div className="section-container">
          <img className="outlet-logo" src={outletData.logo} alt="logo.png" />
          <h1 className="outlet-title">
            {`${outletData.name}  `}
            <img
              className="outlet-type-icon"
              src={outletData?.type === "veg" ? VegIcon : NonVegIcon}
              alt={outletData.type}
            />
          </h1>
          <h4 className="banner-timings">
            {outletData.timings + "(Now Open)"}
          </h4>
        </div>
      </section>
      {outletData.menu && (
        <>
          <MenuRow
            title={"Recommended"}
            itemList={recommendedList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Popular"}
            itemList={popularList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Combos/Thalis"}
            itemList={comboList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Snacks/Starters"}
            itemList={snacksList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Rice/Noodles"}
            itemList={riceList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Breads"}
            itemList={breadsList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Main Course"}
            itemList={mainCourseList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Desserts"}
            itemList={dessertsList}
            outlet_id={outletData.id}
          />
          <MenuRow
            title={"Drinks"}
            itemList={drinksList}
            outlet_id={outletData.id}
          />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Outlet;
