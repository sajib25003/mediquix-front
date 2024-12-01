import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import LoaderSpinner from "../../../Shared/LoaderSpinner";

const UpdateCamps = ({ campId, onClose, onUpdate }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const { data: camp = {}, isLoading } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${campId}`);
      return res.data;
    },
    enabled: !!campId, 
  });

  useEffect(() => {
    if (camp) {
      setValue("campName", camp.campName);
      setValue("imageURL", camp.imageURL);
      setValue("campFees", camp.campFees);
      setValue("DateAndTime", camp.DateAndTime ? new Date(camp.DateAndTime).toISOString() : "");
      setValue("Location", camp.Location);
      setValue("HealthcareProfessional", camp.HealthcareProfessional);
      setValue("participantCount", camp.participantCount);
      setValue("Description", camp.Description);

      if (camp.DateAndTime) {
        const campDate = new Date(camp.DateAndTime);
        setStartDate(campDate);
      }
    }
  }, [camp, setValue]);

  if (isLoading) return <LoaderSpinner />;

  const handleDateChange = (date) => {
    setStartDate(date);
    setValue("DateAndTime", date.toISOString());
  };

  const onSubmit = (data) => {
    const {
      campName,
      imageURL,
      campFees,
      DateAndTime,
      Location,
      HealthcareProfessional,
      participantCount,
      Description,
    } = data;

    const updatedCampInfo = {
      campName,
      imageURL,
      campFees,
      DateAndTime: new Date(DateAndTime).toISOString().slice(0, -5),
      Location,
      HealthcareProfessional,
      participantCount,
      Description,
    };

    axiosSecure
      .patch(`/update-camp/${campId}`, updatedCampInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: `${camp.campName} is now updated.`,
            showConfirmButton: false,
            timer: 300,
          });

          onClose();
          onUpdate();
        }
      })
      .catch((error) => {
        console.error("Error updating camp:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to update the camp.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Update Camp</h2>
      <div className="hero-content mx-auto flex-col space-y-2">
        <div className="card shrink-0 w-5/6 shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Camp Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("campName", { required: true })}
              />
            </div>
            {/* Camp Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Camp Image URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("imageURL", { required: true })}
              />
            </div>
            {/* Camp Fees */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Camp Fees</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("campFees", { required: true })}
              />
            </div>
            {/* Date & Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date And Time</span>
              </label>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="yyyy-MM-dd'T'HH:mm:ss" // Set the desired format
                className="input input-bordered w-full"
              />
            </div>
            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("Location", { required: true })}
              />
            </div>
            {/* Healthcare Professional Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Healthcare Professional Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("HealthcareProfessional", { required: true })}
              />
            </div>
            {/* Participant Count */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Participant Count</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("participantCount", { required: true })}
              />
            </div>
            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                className="input input-bordered w-full"
                {...register("Description", { required: true })}
              />
            </div>
            {/* Submit Button */}
            <input
              className="btn bg-gray-700 mt-4 text-white font-bold w-full"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCamps;