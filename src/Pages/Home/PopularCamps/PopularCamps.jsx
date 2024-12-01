import { Link } from "react-router-dom";
import PageCover from "../../../Shared/PageCover/PageCover";
import useCamps from "../../../hooks/useCamps";

const PopularCamps = () => {
  const [camps] = useCamps();
  const sortedCamps = camps.sort(
    (a, b) => b.partitcipantCount - a.partitcipantCount
  );
  const popularCamps = sortedCamps.slice(0, 6);

  return (
    <div id="popularCamps" className=" my-10">
      <PageCover title={"Popular Camps"}></PageCover>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-10 lg:mx-32 my-10">
        {popularCamps.map((camp) => (
          <div
            key={camp._id}
            className=" rounded-lg border-2 border-base-200 p-4 text-center shadow-xl"
          >
            <div className=" text-left rounded-lg space-y-2 flex flex-col">
              <img className=" rounded-lg" src={camp.imageURL} alt="" />
              <h3 className=" text-xl font-bold">{camp.campName}</h3>
              <p className=" text-gray-500">
                <span className=" font-semibold text-gray-700">Location: </span>{" "}
                {camp.Location}
              </p>
              <p className=" text-gray-500">
                <span className=" font-semibold text-gray-700">
                  Camp Fees:{" "}
                </span>{" "}
                {camp.campFees}
              </p>
              <p className=" text-gray-500">
                <span className=" font-semibold text-gray-700">
                  Date and Time:{" "}
                </span>{" "}
                {camp.DateAndTime}
              </p>
              <p className=" text-gray-500">
                <span className=" font-semibold text-gray-700">
                  Total Participants:{" "}
                </span>{" "}
                {camp.participantCount}
              </p>
              <p className=" text-gray-500">
                <span className=" font-semibold text-gray-700">
                  Healthcare Professional:{" "}
                </span>{" "}
                {camp.HealthcareProfessional}
              </p>
              <Link to={`/camp-details/${camp._id}`} className="btn hover:scale-105 bottom-1 bg-black text-white ">
              View Details
            </Link>
            </div>
          </div>
        ))}
      </div>
      <div className=" text-center mx-4 md:mx-10 lg:mx-32">
        <Link to="availableCamps">
          <button className="btn hover:scale-105 w-full bg-black text-white">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
