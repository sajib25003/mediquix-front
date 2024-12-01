import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import PageCover from "../../Shared/PageCover/PageCover";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoaderSpinner from "../../Shared/LoaderSpinner";
import JoinCamp from "./JoinCamp";

const ViewCamp = () => {
  const camp = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const [isJoinedToCamp, setIsJoinedToCamp] = useState(false);
  const [joinedCamp, setJoinedCamp] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchJoinedCamps = async () => {
      try {
        const response = await axiosSecure.get(
          `/joinedCamps?email=${user?.email}`
        );
        setJoinedCamp(response.data);

        // Check if the user has already joined the specific camp
        const joined = response.data.some(
          (campItem) => campItem.campName === camp.campName
        );
        setIsJoinedToCamp(joined);
      } catch (error) {
        console.error("Error fetching joined camps:", error);
      }
    };


    if (user?.email) {
      fetchJoinedCamps();
    }
  }, [axiosSecure, user?.email, camp.campName, joinedCamp]);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      <Helmet>
        <title>MediQuix | {camp?.campName}</title>
      </Helmet>
      <PageCover title={`${camp?.campName}`}></PageCover>
      <div className="text-left rounded-lg border-2 border-base-200 p-4 shadow-xl space-y-2 flex flex-col mb-10 mx-32">
        <img className="rounded-lg text-center" src={camp.imageURL} alt="" />
        <p className="text-gray-500">
          <span className="font-semibold text-gray-700">Location: </span>
          {camp.Location}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold text-gray-700">Camp Fees: </span>${" "}
          {camp.campFees}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold text-gray-700">Date and Time: </span>
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

        {/* Check if user is already joined */}
        <div className="mx-auto w-full">
          {isJoinedToCamp ? (
            <div className="font-bold mx-auto py-2 mt-4 rounded-lg text-white text-xl text-center bg-green-600 w-1/3">
              <p>Already Joined</p>
            </div>
          ) : (
            <button
              onClick={() => document.getElementById("modal_camp").showModal()}
              className="btn hover:scale-105 bg-black text-white w-full mt-4"
            >
              Join Camp
            </button>
          )}
        </div>

        {/* Include the JoinCamp component for the join modal */}
        <JoinCamp
          camp={camp}
          user={user}
          setIsJoinedToCamp={setIsJoinedToCamp}
        />
      </div>
    </div>
  );
};

export default ViewCamp;
