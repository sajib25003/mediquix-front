// cSpell:disable
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../Shared/LoaderSpinner";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Successfully deleted!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleToggleRole = (user) => {

    Swal.fire({
        title: "Changing the Role?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change the Role!",
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/users/role/${user._id}`)
            .then(res => {
              if (res.data.result.modifiedCount > 0) {
                
                Swal.fire({
                  icon: "success",
                  title: `${user.name} is now ${res.data.newRole}.`,
                  showConfirmButton: false,
                  timer: 300
                });
                refetch();
              }
            })
            .catch(error => {
              console.error("Error toggling role:", error);
              Swal.fire({
                icon: "error",
                title: "Failed to change role.",
                showConfirmButton: true,
              });
            });
        }
      });
    
  };


  if (isLoading) return <LoaderSpinner></LoaderSpinner>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className=" mx-auto px-1 overflow-x-auto">
      <h2 className=" text-lg md:text-xl lg:text-3xl font-bold text-center">Manage All User Role</h2>
      <table className="text-center mt-10 w-full bg-white ml-10">
        <thead>
          <tr>
            <th className="py-4 px-4 border-b">Sl.</th>
            <th className="py-4 px-4 border-b">User Name</th>
            <th className="py-4 px-4 border-b">User Email</th>
            <th className="py-4 px-4 border-b">User Role</th>
            <th className="py-4 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="py-4 px-4 border-b">{index + 1}</td>
              <td className="py-4 px-4 border-b">{user.name}</td>
              <td className="py-4 px-4 border-b">{user.email}</td>
              <td className="py-4 px-4 border-b text-red-600 font-bold">
                {user.role === "Admin" ? user.role : <p className="text-blue-600 font-normal">Participant</p>}
              </td>
              <td className="py-4 px-4 border-b">
                <button
                  onClick={() => handleToggleRole(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
