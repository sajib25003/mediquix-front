import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../Shared/LoaderSpinner";
import { MdCancel } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { Pagination } from "flowbite-react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";


const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [registeredCamps, setRegisteredCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/joinedCamps");
      return res.data;
    },
  });

  useEffect(() => {
    setRegisteredCamps(camps);
  }, [camps]);

  const filteredCamps = registeredCamps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.campFees.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const currentCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle Delete Action
  const handleDeleteCamp = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/joinedCamps/${id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The camp has been removed.", "success");
              refetch(); 
            }
          })
          .catch((error) => {
            console.error("Error deleting camp:", error);
            Swal.fire("Error!", "Failed to delete the camp.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className=" pl-4 lg:p-8 overflow-x-auto">
      <Helmet>
        <title>MediQuix | Manage Registered Camps</title>
      </Helmet>
      <h2 className="text-lg md:text-xl lg:text-3xl font-bold ml-4 text-center mb-6">
        Manage Registered Camps
      </h2>
      <div className="overflow-x-auto ml-6">
        {/* Search Bar */}
        <div className="flex justify-start my-4">
          <input
            type="text"
            className="input input-bordered w-full lg:w-1/2"
            placeholder="Can't find what you're looking for? Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table-auto w-full text-center border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-4">Participant Name</th>
              <th className="p-4">Camp Name</th>
              <th className="p-4">Camp Fees</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4">Confirmation Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps.map((camp) => (
              <tr key={camp._id} className="border-b border-gray-300">
                <td className="p-4">{camp.displayName}</td>
                <td className="p-4">{camp.campName}</td>
                <td className="p-4">${camp.campFees}</td>
                {camp?.paymentStatus ? (
                  <td className="p-4 text-green-700 font-medium">
                    {camp.paymentStatus}
                  </td>
                ) : (
                  <td className="p-4 text-red-600">Unpaid</td>
                )}
                {camp?.confirmationStatus ? (
                  <td className="p-4 text-green-700 font-medium">
                    {camp.confirmationStatus}
                  </td>
                ) : (
                  <td className="p-4 text-red-600">Pending</td>
                )}
                <td className="p-4">
                  {camp.paymentStatus !== "Paid" && (
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Cancel Registration"
                      className="hover:scale-125 text-red-500 text-3xl "
                      onClick={() => handleDeleteCamp(camp._id)}
                    >
                      <MdCancel />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Tooltip */}
        <Tooltip id="my-tooltip" />

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
    </div>
  );
};

export default ManageRegisteredCamps;
