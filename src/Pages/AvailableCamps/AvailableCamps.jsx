import { Helmet } from "react-helmet-async";
import PageCover from "../../Shared/PageCover/PageCover";
import { Link } from "react-router-dom";
import { useState } from "react";
import useCamps from "../../hooks/useCamps";
import { Pagination } from "flowbite-react";
import { LuLayoutDashboard } from "react-icons/lu";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const AvailableCamps = () => {
  const [camps] = useCamps();
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOption, setSortOption] = useState(""); 
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false); 
  const campsPerPage = 6;

  const filteredCamps = camps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.HealthcareProfessional.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      camp.campFees.toString().includes(searchQuery)
  );

  const sortedCamps = [...filteredCamps].sort((a, b) => {
    if (sortOption === "mostRegistered") {
      return b.participantCount - a.participantCount; 
    } else if (sortOption === "campFeesAsc") {
      return a.campFees - b.campFees; 
    } else if (sortOption === "campFeesDesc") {
      return b.campFees - a.campFees; 
    } else if (sortOption === "campName") {
      return a.campName.localeCompare(b.campName); 
    }
    return 0; 
  });

  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = sortedCamps.slice(indexOfFirstCamp, indexOfLastCamp);

  const totalPages = Math.ceil(sortedCamps.length / campsPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber); 
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value); 
    setCurrentPage(1);
  };

  const toggleLayout = () => {
    setIsTwoColumnLayout(!isTwoColumnLayout);
  };

  return (
    <div>
      <Helmet>
        <title>MediQuix | Available Camps</title>
      </Helmet>
      <PageCover title={"Available Camps"}></PageCover>

      {/* Search Bar, Sort Options, and Layout Toggle Button */}
      <div className="flex flex-col md:flex-row justify-center items-center mx-4 md:mx-10 lg:mx-32 my-4 gap-4">
        <div className="mx-auto w-3/4">
          <input
            type="text"
            placeholder="Search by Camp Name, Location, Healthcare Professional, or Fees"
            value={searchQuery}
            onChange={handleSearch}
            className="input input-bordered w-full lg:w-1/2 mx-auto"
          />
        </div>
        <div className="mx-auto gap-4 flex justify-center">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="select select-bordered w-2/3 flex-1 lg:w-1/4 mx-auto"
          >
            <option value="">Sort By</option>
            <option value="mostRegistered">Most Registered</option>
            <option value="campFeesAsc">Camp Fees (Low to High)</option>
            <option value="campFeesDesc">Camp Fees (High to Low)</option>
            <option value="campName">Camp Name (A-Z)</option>
          </select>
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Toggle Layout"
            onClick={toggleLayout}
            className="btn bg-black text-white text-3x mx-auto hidden lg:flex"
          >
            <LuLayoutDashboard />
          </button>
        </div>
      </div>

      <div
        className={`grid ${
          isTwoColumnLayout ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        } gap-4 mx-4 md:mx-10 lg:mx-32 my-10`}
      >
        {currentCamps.map((camp) => (
          <div
            key={camp._id}
            className="text-left h-full rounded-lg border-2 border-base-200 p-4 shadow-xl space-y-2 flex flex-col"
          >
            <img
              className="rounded-lg text-center h-full border"
              src={camp.imageURL}
              alt="Image of Camp"
            />
            <h3 className="text-xl font-bold">{camp.campName}</h3>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">Location: </span>
              {camp.Location}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">Camp Fees: </span>
              {camp.campFees}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">
                Date and Time:{" "}
              </span>
              {camp.DateAndTime}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">
                Total Participants:{" "}
              </span>
              {camp.participantCount}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-700">
                Healthcare Professional:{" "}
              </span>
              {camp.HealthcareProfessional}
            </p>
            <p className="text-gray-500 flex-grow">
              <span className="font-semibold text-gray-700">Description: </span>
              {camp.Description}
            </p>
            <Link
              to={`/camp-details/${camp._id}`}
              className="btn hover:scale-105 bg-black text-white"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Part */}
      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
          className="flex flex-row space-x-2"
        />
      </div>
      {/* Tooltip */}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default AvailableCamps;
