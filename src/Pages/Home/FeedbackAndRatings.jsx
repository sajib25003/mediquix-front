import { useEffect, useState } from "react";
import PageCover from "../../Shared/PageCover/PageCover";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoaderSpinner from "../../Shared/LoaderSpinner";

const FeedbackAndRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Fetch feedbacks from the API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosPublic.get("/feedbacks"); // Replace with your feedbacks API endpoint
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [axiosPublic]);

  if (loading) return <LoaderSpinner />;

  return (
    <div id="feedback" className="my-10">
      <PageCover title={"Feedback & Ratings"}></PageCover>

      {/* Feedbacks Display */}
      <div className="mx-4 md:mx-10 lg:mx-32 my-5 grid grid-cols-1 md:grid-cols-2  gap-6">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="p-4 shadow-lg rounded-lg bg-base-100">
            <div className="flex items-center mb-4">
              <img
                src={feedback.userImage}
                alt={feedback.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">{feedback.userName}</h3>
                <p className="text-sm text-gray-500">{feedback.campName}</p>
              </div>
            </div>
            <p className="text-yellow-500 font-bold mb-2">
              Rating: {feedback.rating} / 5
            </p>
            <p className="text-gray-700">{feedback.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackAndRatings;