import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularCamps from "./PopularCamps/PopularCamps";
import FeedbackAndRatings from "./FeedbackAndRatings";
import FaqSection from "./FaqSection";

const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>MediQuix | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <FeedbackAndRatings></FeedbackAndRatings>
      <FaqSection></FaqSection>
    </div>
  );
};

export default Home;
