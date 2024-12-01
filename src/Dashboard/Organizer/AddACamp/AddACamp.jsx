import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddACamp = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

    const campInfo = {
      campName,
      imageURL,
      campFees,
      DateAndTime: new Date(DateAndTime).toISOString().slice(0, -5),
      Location,
      HealthcareProfessional,
      participantCount,
      Description,
    };

    console.log(campInfo);

    // add camp to database
    axiosSecure
      .post("/camps", campInfo)
      .then((response) => {
        console.log("Camp added successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Camp added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manageCamps");
      })
      .catch((error) => {
        console.error("Error adding camp:", error);
      });
  };

  return (
    <div className=" py-6 md:py-20 bg-base-200 w-full">
      <Helmet>
        <title>MediQuix | Add A Camp</title>
      </Helmet>
      <div className="hero-content mx-auto flex-col space-y-2">
        <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* Camp Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Camp Name</span>
              </label>
              <input
                type="text"
                placeholder="Camp Name"
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
                placeholder="Camp Image URL"
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
                placeholder="Camp Fees"
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
                placeholder="Location"
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
                placeholder="Healthcare Professional Name"
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
                defaultValue="0"
                className=" input hidden input-bordered w-full"
                {...register("participantCount", { required: true })}
                
              />
              <input
                type="text"
                placeholder="Participant Count"
                defaultValue="0"
                className="input input-bordered w-full"
                disabled
              />
            </div>
            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                type="text"
                placeholder="Description"
                className="input input-bordered w-full"
                {...register("Description", { required: true })}
              />
            </div>
            {/* Submit Button */}
            <input
              className="btn bg-gray-700 text-white font-bold w-full"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddACamp;
