import "./About.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SideNav from "../../components/sidenav/SideNav";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TypewriterComponent from "typewriter-effect";
import HeaderLogo from "../../assests/images/about.png";
import AboutUsIllustration from "../../assests/illustrations/about-us.svg";
import ServicesIllustration from "../../assests/illustrations/services.svg";
import TeamIllustration from "../../assests/illustrations/team.svg";
import AuthIllustration from "../../assests/illustrations/auth.svg";
import PlayTrailerIllustration from "../../assests/illustrations/play-trailer.svg";
import RecommendationIllustration from "../../assests/illustrations/recommendation.svg";
import WatchListIllustration from "../../assests/illustrations/watch-list.svg";
import HistoryIllustration from "../../assests/illustrations/history.svg";
import ResponsiveIllustration from "../../assests/illustrations/responsive.svg";
import DeveloperIllustration from "../../assests/illustrations/developer.svg";
import MachineLearningIllustration from "../../assests/illustrations/machine-learning.svg";
import DocumentIllustration from "../../assests/illustrations/document.svg";
import TeamMember1 from "../../assests/images/team-member1.gif";
import TeamMember2 from "../../assests/images/team-member2.gif";
import TeamMember3 from "../../assests/images/team-member3.gif";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about">
      <Navbar />
      <SideNav />
      <section className="v-center" id="about-header">
        <div className="section-container">
          <img src={HeaderLogo} alt=".PNG" />
          <TypewriterComponent
            options={{
              strings: [
                "Lunch Time Made Easy",
                "For Your Favorite Food",
                "And Your Favorite Drinks",
                "One Stop For All Your Needs!",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              wrapperClassName: "typewriter",
            }}
          />
          <Button
            className="about-button"
            variant="contained"
            onClick={() => {
              signOut(auth);
              navigate("/login");
            }}
            // startIcon={<PlayArrowRoundedIcon />}
          >
            Login
          </Button>
          <Button
            className="about-button"
            variant="contained"
            onClick={() => {
              signOut(auth);
              navigate("/signup");
            }}
            // startIcon={<PlayArrowRoundedIcon />}
          >
            Signup
          </Button>
        </div>
      </section>

      <section className="v-center" id="about-us">
        <img className="illustration" src={AboutUsIllustration} alt="" />
        <div className="section-container">
          <h1>About Us</h1>
          <p>
            Today’s Food Court Industry has been drastically transformed by the
            pandemic, which has led to the need of rethinking and innovation in
            operations as they have to deal with significant staffing shortages,
            enforce social distancing measures in densely crowded spaces, and
            cope with supply chain constraints. These challenges are not only
            impacting students and college staff, who are experiencing long
            lines and extensive wait times, but also taking a toll on dining
            staff, who are dealing with the mounting pressure of serving large
            groups in a short period of time.
          </p>
          <p>
            In addition, college students’ eating habits have drastically
            changed over the last 20 years, with more students looking for
            healthier food choices and more snacks throughout the day. A recent
            survey showed that one-tenth of students consider themselves
            semi-vegetarian (meaning, they only eat specific kinds of meat),
            while 13% say they follow a flexitarian diet, an increase of 6% from
            2019.
          </p>
          <p>
            “FOOD COURT AUTOMATION SYSTEM”, will be the one stop solution for
            all the above-mentioned problems. It will be a website that will
            provide its users with a user-friendly interface that will fully
            responsive so that it can adapt to the user’s device of choice. It
            will provide the users with an extensive menu of all the nearby
            outlets with the estimated food preparation time. This will save the
            customers from the long queues and a long wait time and also help
            the outlets manage the orders in a better manner and also to ensure
            social distancing.
          </p>
        </div>
      </section>

      <section className="v-center" id="services">
        <h1>Services</h1>
        <img className="illustration" src={ServicesIllustration} alt="" />
        <div className="section-container">
          <div className="service">
            <img src={AuthIllustration} alt="" />
            <div className="service-details">
              <h3>Authentication</h3>
              <p>
                Process that makes creation and maintenance of your personal
                GoodWatch account a breeze.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={PlayTrailerIllustration} alt="" />
            <div className="service-details">
              <h3>Payment Gateway</h3>
              <p>
                Pay for your food and drinks with the help of our secure payment
                gateway.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={RecommendationIllustration} alt="" />
            <div className="service-details">
              <h3>Recommendations</h3>
              <p>
                Robust recommendations based on content, to provide you with a
                diverse pallete to choose from.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={WatchListIllustration} alt="" />
            <div className="service-details">
              <h3>My List</h3>
              <p>
                You can create a list of your Favourite Outlets and add them to
                My List.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={HistoryIllustration} alt="" />
            <div className="service-details">
              <h3>Purchase History</h3>
              <p>
                History to help you track your orders, in case you want to
                reorder.
              </p>
            </div>
          </div>
          <div className="service">
            <img src={ResponsiveIllustration} alt="" />
            <div className="service-details">
              <h3>Responsive</h3>
              <p>
                Multi device and cross-platflorm support, lets the site adapt to
                fit your devices' needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="v-center" id="team">
        <h1>Meet Our Team</h1>
        <img className="illustration" src={TeamIllustration} alt="" />
        <div className="section-container">
          <div className="team-member">
            <img src={DeveloperIllustration} alt="" />
            <div className="team-member-details">
              <img className="team-member-profile" src={TeamMember1} alt="" />
              <h2>
                Lakshit Bisht{" "}
                <small style={{ opacity: 0.6 }}>
                  (Team Leader, Development)
                </small>
              </h2>
              <p>
                Proficient in languages C++, Python and Java, with in depth
                knowledge in fields like Database Management Systems and
                Operating Systems, Profound understanding of Machine Learning
                and web Development. Skilled in Competitive Programming, with
                astound knowledge of Data Structure and Algorithms.
              </p>
              <span>
                Contact :{" "}
                <a href="mailto:bishtlakshit555@gmail.com">
                  bishtlakshit555@gmail.com
                </a>
              </span>
            </div>
          </div>
          <div className="team-member">
            <img src={MachineLearningIllustration} alt="" />
            <div className="team-member-details">
              <img className="team-member-profile" src={TeamMember2} alt="" />
              <h2>
                Rahul Banerjee{" "}
                <small style={{ opacity: 0.6 }}>(Machine Learning)</small>
              </h2>
              <p>
                Understanding in the fields of Machine Learning and Deep
                Learning. Experienced in languages like C++, Java and Python.
                Intermediate to advanced knowledge in building models and
                recommendation systems. Also familiar with web development.
              </p>
              <span>
                Contact :{" "}
                <a href="mailto:banerjee132000@gmail.com">
                  banerjee132000@gmail.com
                </a>
              </span>
            </div>
          </div>
          <div className="team-member">
            <img src={DocumentIllustration} alt="" />
            <div className="team-member-details">
              <img className="team-member-profile" src={TeamMember3} alt="" />
              <h2>
                Shashwat Karnwal{" "}
                <small style={{ opacity: 0.6 }}>(Research)</small>
              </h2>
              <p>
                Beginner level knowledge in Machine Learning and Advanced
                Mathematics. Familiar with web designing using HTML and CSS.
                Intermediate level knowledge in languages like C++, Java, Python
                and Front end Development. Proficient in research and content
                creation.
              </p>
              <span>
                Contact :{" "}
                <a href="mailto:shashwatkarnwal@yahoo.com">
                  shashwatkarnwal@yahoo.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="section-container v-center">
          <Button
            className="contact-button"
            variant="contained"
            startIcon={
              <MailOutlineIcon style={{ fontSize: "inherit !important" }} />
            }
            onClick={() => navigate("/about/contact")}
          >
            Contact Us
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
