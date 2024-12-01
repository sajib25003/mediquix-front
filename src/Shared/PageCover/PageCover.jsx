import pageImage from "../../assets/title-bg.jpeg";

const PageCover = ({ title }) => {
  return (
    <div
      className="hero h-[150px] lg:h-[300px] my-4 lg:mb-10"
      style={{
        backgroundImage: `url(${pageImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60 px-4 text-center w-1/2 h-1/2 lg:mt-10 flex justify-center items-center">
        <h1 className="lg:mb-5 text-lg md:text-2xl lg:text-5xl text-white font-bold">{title}</h1>
      </div>
      {/* <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md"></div>
      </div> */}
    </div>
  );
};

export default PageCover;
