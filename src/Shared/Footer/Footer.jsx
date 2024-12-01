import {
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaRegEnvelopeOpen,
  FaX,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 text-white text-sm md:text-base">
      {/* left part */}
      <div className=" space-y-3 bg-black text-center md:text-right text-white py-4 md:py-10 md:pr-10 lg:pr-32">
        <Link to='/'>
        <h3 className=" uppercase  font-bold text-lg md:text-xl lg:text-3xl">
          Medi<span className=" text-lime-400">Quix</span>
        </h3></Link>

        <div className="flex justify-center md:justify-end gap-3">
          <FaLocationDot />
          <p>132, West Kafrul, Mirpur, Dhaka-1216</p>
        </div>
        <div className="flex justify-center md:justify-end gap-3">
          <FaPhone />
          <p>+880-1234-567-890</p>
        </div>
        <div className="flex justify-center md:justify-end gap-3">
          <FaRegEnvelopeOpen />
          <p>medi@quix.com</p>
        </div>
      </div>
      {/* right part - important links, socials, copyright */}
      <div className=" space-y-4 text-center md:text-left bg-gray-800 text-white py-4 md:py-10 md:pl-10 lg:pl-32">
        {/* socials */}
        <div className=" flex gap-6 md:gap-8 justify-center md:justify-start text-xl md:text-3xl">
          <Link className=" hover:scale-125" to="https://www.facebook.com/">
            <FaFacebookF />
          </Link>
          <Link className=" hover:scale-125" to="https://x.com/">
            <FaX />
          </Link>
          <Link className=" hover:scale-125" to="https://www.instagram.com/">
            <FaInstagram />
          </Link>
        </div>
        {/* navlinks */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-2 lg:gap-6 font-medium">
          <Link className=" hover:scale-110" to="/#popularCamps">
            Popular Camps
          </Link>
          <Link className=" hover:scale-110" to="/availableCamps">
            Available Camps
          </Link>
          <Link className=" hover:scale-110" to="#feedback">
            Feedback & Ratings
          </Link>
          <Link className=" hover:scale-110" to="/dashboard">
            Dashboard
          </Link>
        </div>
        {/* subscribe */}
        <div className="join">
          <input
            type="text"
            placeholder="username@site.com"
            className="input input-bordered bg-gray-700 border-white join-item"
          />
          <button className="btn bg-black hover:scale-110 text-white font-semibold join-item">
            Subscribe
          </button>
        </div>
        {/* copyright */}
        <p>Copyright © 2024 - All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
