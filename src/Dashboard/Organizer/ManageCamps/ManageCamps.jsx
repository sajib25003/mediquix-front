import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoaderSpinner from "../../../Shared/LoaderSpinner";
import Swal from "sweetalert2";
import UpdateCamps from "./UpdateCamps";
import { useState } from "react";
import { Pagination } from "flowbite-react";

const ManageCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCampId, setSelectedCampId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const {
    data: camps = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  // Filter camps based on search query
  const filteredCamps = camps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.DateAndTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.HealthcareProfessional.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      camp.Location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);

  // Get camps for current page
  const currentCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Delete camp
  const handleDeleteCamp = (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this camp!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-camp/${campId}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The camp has been deleted.", "success");
            }
            refetch(); // Refetch data after deletion
          })
          .catch((error) => {
            console.error("Error deleting camp:", error);
            Swal.fire("Error!", "Failed to delete the camp.", "error");
          });
      }
    });
  };

  // Update camp
  const handleUpdateCamp = (campID) => {
    setSelectedCampId(campID);
    document.getElementById("updateCamp").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("updateCamp").close();
  };

  if (isLoading) return <LoaderSpinner></LoaderSpinner>;
  if (error) return <div>Error loading camps</div>;

  return (
    <div className="ml-4 md:ml-8 lg:ml-24">
      <Helmet>
        <title>MediQuix | Manage Camps</title>
      </Helmet>

      <div className="mr-4 ml-6">
        <div className="pt-4 pb-6">
          <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-center">Manage Camps</h2>
        </div>
        {/* Search Bar */}
        <div className="flex justify-start my-4 w-full lg:w-1/2">
          <input
            type="text"
            className="input input-bordered w-full md:w-1/2"
            placeholder="Can't find what you're looking for? Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table text-center min-w-full">
            <thead>
              <tr className="bg-base-200 border-b-2">
                <th>#</th>
                <th>Camp Name</th>
                <th>Date And Time</th>
                <th>Location</th>
                <th>Healthcare Professional</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCamps.map((camp, idx) => (
                <tr key={camp._id} className="border-b">
                  <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td>{camp.campName}</td>
                  <td>{camp.DateAndTime}</td>
                  <td>{camp.Location}</td>
                  <td>{camp.HealthcareProfessional}</td>
                  <td className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdateCamp(camp._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCamp(camp._id)}
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

        {/* Pagination */}
        <div className="flex justify-center my-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
            className="flex space-x-2"
          />
        </div>
      </div>
      <dialog id="updateCamp" className="modal">
        <div className="modal-box w-full max-w-lg">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          <div>
            {selectedCampId && (
              <UpdateCamps
                campId={selectedCampId}
                onClose={handleCloseModal}
                onUpdate={refetch} 
              />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageCamps;