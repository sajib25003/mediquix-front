import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FeedbackForm = ({ campId, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");

  const { data: camp = {} } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/joinCamps/${campId}`);
      return res.data;
    },
    enabled: !!campId, 
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const feedbackInfo = {
      userName: user.displayName,
      userImage: user.photoURL,
      campName: camp.campName,
      ...data,
    };
    console.log(feedbackInfo);

    axiosSecure
      .post("/feedbacks", feedbackInfo)
      .then((res) => {
        console.log(res.data);

        return axiosSecure.patch(`/joinedCamps/feedback/${campId}`, {
          feedbackStatus: "yes",
        });
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Feedback added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error adding feedback:", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body bg-white mt-4 rounded-lg shadow-xl w-5/6 mx-auto"
      >
        <div className="pt-4 pb-6">
          <h2 className="text-lg md:text-l lg:text-3xl font-bold text-center">
            Provide Your Feedback
          </h2>
        </div>

        {/* Rating Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Rating (1 to 5)</span>
          </label>
          <input
            type="number"
            min="1"
            max="5"
            className="input input-bordered"
            {...register("rating", { required: true })}
          />
          {errors.rating && <p className="text-red-500">Rating is required</p>}
        </div>

        {/* Feedback Text Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold">Feedback</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            rows="4"
            {...register("feedback", { required: true })}
          />
          {errors.feedback && (
            <p className="text-red-500">Feedback is required</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-gray-700 text-white font-bold w-full"
        >
          Submit
        </button>
        <div>
          <p className="text-red-600">{error}</p>
        </div>
      </form>
      {/* Modal backdrop to close */}
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </div>
  );
};

export default FeedbackForm;