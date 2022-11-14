import { useState, useEffect } from "react";
import Banner from "../../components/banner/Banner";
import Navbar from "../../components/navbar/Navbar";
import Row from "../../components/row/Row";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectUser, selectMyList } from "../../features/userSlice";
import Loading from "../../components/loading/Loading";
import "./HomeScreen.css";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Outlet from "../../assests/json/outletdb.json";

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

export default function HomeScreen() {
  const [bannerMedia, setBannerMedia] = useState([]);
  const [recommendedList, setRecommendedList] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [vegList, setVegList] = useState([]);
  const [nonVegList, setNonVegList] = useState([]);

  const [loadingProgress, setLoadingProgress] = useState(0);

  const user = useSelector(selectUser);
  const myList = useSelector(selectMyList);
  const location = useLocation();

  useEffect(() => {
    location?.state?.bannerMedia
      ? setBannerMedia(location.state.bannerMedia)
      : setBannerMedia(
          Outlet.data[Math.floor(Math.random() * Outlet.data.length)]
        );
    return () => {
      setBannerMedia([]);
    };
  }, [location?.state?.bannerMedia]);

  useEffect(() => {
    setRecommendedList(
      Outlet.data.filter(
        (Outlet) => Outlet.rating > 4 && Outlet.rating_count < 1000
      )
    );
    setPopularList(Outlet.data.sort(dynamicsort("rating_count", "desc")));
    setTrendingList(Outlet.data.sort(dynamicsort("rating", "desc")));
    setVegList(Outlet.data.filter((Outlet) => Outlet.type === "veg"));
    setNonVegList(Outlet.data.filter((Outlet) => Outlet.type === "non-veg"));
    return () => {
      setRecommendedList([]);
      setPopularList([]);
      setTrendingList([]);
      setVegList([]);
      setNonVegList([]);
    };
  }, []);

  return (
    <div className="homeScreen">
      {!user.displayName ? (
        <Loading />
      ) : (
        bannerMedia.id && (
          <>
            <LoadingBar
              color="#3cb19f"
              progress={loadingProgress}
              onLoaderFinished={() => setLoadingProgress(0)}
            />
            <Navbar />
            <Banner
              title={"Featured Outlet"}
              bannerOutlet={bannerMedia}
              setLoadingProgress={setLoadingProgress}
            />
            <Row title={"Favourites"} outletList={myList} />
            <Row title={"Recommended Outlets"} outletList={recommendedList} />
            <Row title={"Trending Outlets"} outletList={trendingList} />
            <Row title={"Popular Outlets"} outletList={popularList} />
            <Row title={"Vegetarian Outlets"} outletList={vegList} />
            <Row title={"Non-Vegetarian Outlets"} outletList={nonVegList} />
            <Footer />
          </>
        )
      )}
    </div>
  );
}
