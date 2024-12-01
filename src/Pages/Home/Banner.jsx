import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner/14532.jpg";
import banner2 from "../../assets/banner/3053.jpg";
import banner3 from "../../assets/banner/84799.jpg";
import BannerText from "../../Shared/Bannertext/BannerText";

const Banner = () => {
  return (
    <Carousel className="text-center">
      <div>
        <img src={banner1} />
        <BannerText
          title={"Orthopedic Camp"}
          date={"May 29, 2024"}
          location={"Sports Complex, Cedar Drive"}
        ></BannerText>
      </div>

      <div>
        <img src={banner2} />
        <BannerText
          title={"Mental Health Awareness Camp"}
          date={"April 18, 2024"}
          location={"Mental Health Center, Birch Lane"}
        ></BannerText>
      </div>

      <div>
        <img src={banner3} />
        <BannerText
          title={"Dental Check-Up Camp"}
          date={"April 28, 2024"}
          location={"Community Center, Oak Avenue"}
        ></BannerText>
      </div>
      
      <div>
        <img src={banner1} />
        <BannerText
          title={"Orthopedic Camp"}
          date={"May 29, 2024"}
          location={"Sports Complex, Cedar Drive"}
        ></BannerText>
      </div>

      <div>
        <img src={banner2} />
        <BannerText
          title={"Mental Health Awareness Camp"}
          date={"April 18, 2024"}
          location={"Mental Health Center, Birch Lane"}
        ></BannerText>
      </div>
      
      <div>
        <img src={banner3} />
        <BannerText
          title={"Dental Check-Up Camp"}
          date={"April 28, 2024"}
          location={"Community Center, Oak Avenue"}
        ></BannerText>
      </div>

      <div>
        <img src={banner1} />
        <BannerText
          title={"Orthopedic Camp"}
          date={"May 29, 2024"}
          location={"Sports Complex, Cedar Drive"}
        ></BannerText>
      </div>

      <div>
        <img src={banner2} />
        <BannerText
          title={"Mental Health Awareness Camp"}
          date={"April 18, 2024"}
          location={"Mental Health Center, Birch Lane"}
        ></BannerText>
      </div>
      
      <div>
        <img src={banner3} />
        <BannerText
          title={"Dental Check-Up Camp"}
          date={"April 28, 2024"}
          location={"Community Center, Oak Avenue"}
        ></BannerText>
      </div>

      <div>
        <img src={banner1} />
        <BannerText
          title={"Orthopedic Camp"}
          date={"May 29, 2024"}
          location={"Sports Complex, Cedar Drive"}
        ></BannerText>
      </div>

      <div>
        <img src={banner2} />
        <BannerText
          title={"Mental Health Awareness Camp"}
          date={"April 18, 2024"}
          location={"Mental Health Center, Birch Lane"}
        ></BannerText>
      </div>
      
      <div>
        <img src={banner3} />
        <BannerText
          title={"Dental Check-Up Camp"}
          date={"April 28, 2024"}
          location={"Community Center, Oak Avenue"}
        ></BannerText>
      </div>
    </Carousel>
  );
};

export default Banner;
