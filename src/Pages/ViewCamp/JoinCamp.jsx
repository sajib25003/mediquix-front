import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const JoinCamp = ({ camp, user, setIsJoinedToCamp }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    const joinedCamp = {
      ...data,
      campName: camp.campName,
      campFees: camp.campFees,
      location: camp.Location,
      healthcareProfessional: camp.HealthcareProfessional,
    };

    axiosSecure
    .post("/joinCamps", joinedCamp)
    .then((response) => {
      if (response.data.insertedId) {
        document.getElementById("modal_camp").close(); 

        camp.participantCount += 1;

          Swal.fire({
            title: "Success!",
            text: "Joined to camp Successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            target: document.getElementById("modal_camp"),
          });
        setIsJoinedToCamp(true);
      }
    })
    .catch((error) => {
      console.error("Error joining camp:", error);
    });
  };

  return (
    <dialog id="modal_camp" className="modal">
<form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body bg-base-200 rounded-lg shadow-xl w-1/2 mx-32"
          >
            {/* Camp data load */}
            {/* Camp name and camp fees */}
            <div className="flex gap-2 justify-between">
              <div className="form-control border flex-grow bg-gray-300 px-4 py-2 rounded-lg">
                <input
                  type="hidden"
                  defaultValue={camp?.campName}
                  {...register("campName")}
                />
                <label className="label">
                  <span className="label-text font-bold">Camp Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={camp?.campName}
                  className="input font-bold input-bordered w-full"
                  disabled
                />
              </div>
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg">
                <label className="label">
                  <span className="label-text font-bold">Camp Fees</span>
                </label>
                <input
                  type="text"
                  defaultValue={camp?.campFees}
                  className="input font-bold input-bordered w-full"
                  disabled
                />
                <input
                  type="hidden"
                  defaultValue={camp?.campFees}
                  {...register("campFees")}
                />
              </div>
            </div>

            {/* Location and healthcare professional */}
            <div className="flex gap-4 justify-between">
              <div className="form-control border bg-gray-300 px-4 py-2 flex-grow rounded-lg">
                <input
                  type="hidden"
                  defaultValue={camp.Location}
                  {...register("Location")}
                />
                <label className="label">
                  <span className="label-text font-bold">Location</span>
                </label>
                <input
                  type="text"
                  defaultValue={camp?.Location}
                  className="input font-bold input-bordered w-full"
                  disabled
                />
              </div>

              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <input
                  type="hidden"
                  defaultValue={camp?.HealthcareProfessional}
                  {...register("HealthcareProfessional")}
                />
                <label className="label">
                  <span className="label-text font-bold">
                    Healthcare Professional
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={camp?.HealthcareProfessional}
                  className="input font-bold input-bordered w-full"
                  disabled
                />
              </div>
            </div>

            {/* User data load */}
            {/* Participant Name & Email */}
            <div className="flex gap-4 justify-between">
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <input
                  type="hidden"
                  defaultValue={user?.displayName}
                  {...register("displayName")}
                />
                <label className="label">
                  <span className="label-text font-bold">Participant Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  className="input font-bold input-bordered w-full"
                  disabled
                />
              </div>
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <input
                  type="hidden"
                  defaultValue={user?.email}
                  {...register("email")}
                />
                <label className="label">
                  <span className="label-text font-bold">
                    Participant Email
                  </span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="input font-bold input-bordered w-full"
                  disabled
                />
              </div>
            </div>
            {/* Participant Age & Gender */}
            <div className="flex gap-4 justify-between">
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <label className="label">
                  <span className="label-text font-bold">Age</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="Age of the participant"
                  className="input font-bold input-bordered w-full"
                  {...register("userAge", { min: 0, max: 100 })}
                />
                {errors.age && (
                  <p className="text-red-500 pt-3">
                    Age must be between 0 & 100
                  </p>
                )}
              </div>
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <label className="label">
                  <span className="label-text font-bold">Gender</span>
                </label>
                <select {...register("gender")} className="p-2" required>
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            {/* Participant Phone & Emergency Contact No. */}
            <div className="flex gap-4 justify-between">
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <label className="label">
                  <span className="label-text font-bold">Phone No.</span>
                </label>
                <input
                  type="tel"
                  placeholder="+88-01234567890"
                  required
                  className="input font-bold input-bordered w-full"
                  {...register("phone")}
                />
              </div>
              <div className="form-control border bg-gray-300 px-4 py-2 rounded-lg flex-grow">
                <label className="label">
                  <span className="label-text font-bold">
                    Emergency Contact
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="+88-01234567890"
                  required
                  className="input font-bold input-bordered w-full"
                  {...register("emergencyContact")}
                />
              </div>
            </div>

            {/* Confirm Button */}
            <input
              className="btn bg-gray-700 my-2 text-white font-bold w-full"
              type="submit"
              value="Confirm"
            />
          </form>
      {/* Modal backdrop to close */}
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default JoinCamp;