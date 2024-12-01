import { useQuery } from "@tanstack/react-query";
import UpdateProfile from "../../Pages/UpdateProfile/UpdateProfile";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import defaultUserImage from "../../assets/default.png";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: selectedUser = [] } = useQuery({
    queryKey: ["selectedUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="mt-10 ml-[18%] md:ml-[15%] overflow-x-auto">
      <div className="w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl lg:text-5xl font-semibold text-center">
            Profile
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="mb-4">
            <img
              src={selectedUser ? selectedUser?.photoURL : defaultUserImage}
              alt="Profile"
              className="w-14 md:w-32 h-14 md:h-32 rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 bg-white p-3 lg:p-6 rounded-lg shadow-lg w-full lg:max-w-screen-md mt-6">
            <div className="text-gray-700">
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold col-span-3 md:col-span-1">Name:</p>
                <p className="col-span-3 md:col-span-2 break-words">{selectedUser.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold col-span-3 md:col-span-1">Email:</p>
                <p className="col-span-3 md:col-span-2 break-words">{selectedUser.email}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold col-span-3 md:col-span-1">Address:</p>
                <p className="col-span-3 md:col-span-2 break-words">{selectedUser?.address ? selectedUser.address : "N/A"}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold col-span-3 md:col-span-1">Contact No.:</p>
                <p className="col-span-3 md:col-span-2 break-words">{selectedUser?.mobile ? selectedUser.mobile : "N/A"}</p>
              </div>
            </div>
          </div>

          <button
            className="btn bg-gray-700 text-white font-bold mt-10"
            onClick={() => document.getElementById("updateProfile").showModal()}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="updateProfile"
        className="backdrop:bg-slate-50 backdrop:opacity-60 h-2/3 rounded-lg w-full lg:w-3/5 mx-auto my-auto"
      >
        <div className="mx-auto m-0 p-0 bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle border-1 border-black btn-ghost absolute right-2 top-2">
              x
            </button>
          </form>
          <div className="mx-auto m-0 p-0">
            <UpdateProfile></UpdateProfile>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;