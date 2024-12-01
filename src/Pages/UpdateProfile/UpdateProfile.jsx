import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import LoaderSpinner from "../../Shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const { data: selectedUser = [], refetch } = useQuery({
    queryKey: ["selectedUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  if (loading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  const dataUpdate = (userInfo) => {
    const updatedData = {
      name: userInfo.name || selectedUser.name,
      photoURL: userInfo.photoURL || selectedUser.photoURL,
      address: userInfo.address || selectedUser.address,
      mobile: userInfo.mobile || selectedUser.mobile,
    };
    axiosSecure
      .patch(`/user?email=${selectedUser.email}`, updatedData)
      .then((response) => {
        console.log("User updated in MongoDB:", response.data);
        refetch();
      })
      .catch((error) => {
        console.error("Error updating user in MongoDB:", error);
      });
  };

  const onSubmit = (data) => {
    const { name, photoURL, address, mobile } = data;
    updateUserProfile(name, photoURL)
      .then((previousUser) => {
        window.location.reload();
        Swal.fire({
          title: "Update Successful!",
          text: "Your profile has been updated Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        return { ...previousUser, displayName: name, photoURL: photoURL };
      })
      .catch((error) => console.error(error));

    const userInfo = {
      name: name,
      photoURL: photoURL,
      address: address,
      mobile: mobile,
    };
    dataUpdate(userInfo);
  };

  return (
    <div className=" py-6 md:py-20 bg-base-200 w-full">
      <Helmet>
        <title>MediQuix | Profile</title>
      </Helmet>
      <div className="hero-content mx-auto flex-col space-y-2">
        <div className="card shrink-0 w-5/6 lg:w-3/5 shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={user && user?.displayName}
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                defaultValue={user && user?.photoURL}
                placeholder="Photo URL"
                className="input input-bordered w-full"
                {...register("photoURL")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="input input-bordered w-full"
                {...register("email")}
                disabled={true}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                defaultValue={selectedUser.address}
                className="input input-bordered w-full"
                {...register("address")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact No.</span>
              </label>
              <input
                type="number"
                defaultValue={selectedUser?.mobile}
                className="input input-bordered w-full"
                {...register("mobile")}
              />
            </div>
            <input
              className="btn bg-gray-700 text-white font-bold w-full"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
