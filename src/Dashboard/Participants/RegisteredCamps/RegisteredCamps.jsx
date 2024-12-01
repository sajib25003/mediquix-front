import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import LoaderSpinner from "../../../Shared/LoaderSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Pagination } from "flowbite-react";
import { MdCancel, MdFeedback } from "react-icons/md";
import Swal from "sweetalert2";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Payment from "./Payment";
import FeedbackForm from "./FeedbackForm";

const RegisteredCamps = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampId, setSelectedCampId] = useState(null);
  const itemsPerPage = 10;

  const {
    data: selectedCamps = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["selectedCamp"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/joinedCamps?email=${user.email}`);
      return res.data;
    },
  });

  const filteredCamps = selectedCamps.filter(
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

  const handleDeleteCamp = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this camp registration!",
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
              Swal.fire(
                "Deleted!",
                "The camp registration has been deleted.",
                "success"
              );
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting camp:", error);
            Swal.fire(
              "Error!",
              "Failed to delete the camp registration.",
              "error"
            );
          });
      }
    });
  };

  const handleMakePayment = (campID) => {
    setSelectedCampId(campID);
    document.getElementById("updatePayment").showModal();
  };

  const handleFeedbackForm = (campID) => {
    setSelectedCampId(campID);
    document.getElementById("feedbackModal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("updatePayment").close();
  };
  const handleCloseModal2 = () => {
    document.getElementById("feedbackModal").close();
  };

  if (loading || isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  if (error) return <div>Error loading camps</div>;

  return (
    <div className="">
      <Helmet>
        <title>MediQuix | Registered Camps</title>
      </Helmet>
      <div className="ml-4 w-full md:mr-4 mr-2">
        <div className="pt-4 pb-6">
          <h2 className="text-lg md:text-3xl font-bold text-center">
            Registered Camps
          </h2>
        </div>
        {/* Search Bar */}
        <div className="flex justify-start my-4">
          <input
            type="text"
            className="input input-bordered ml-12 mr-3 w-1/2"
            placeholder="Can't find what you're looking for? Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto text-base md:text-lg w-full">
          <table className=" table-auto text-center">
            <thead>
              <tr className="bg-base-200 border-b-2">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Camp Name</th>
                <th className="px-4 py-2">Camp Fees</th>
                <th className="px-4 py-2">Participant Name</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Confirmation Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCamps.map((camp, idx) => (
                <tr key={camp._id} className="border-b">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="px-4 py-2">{camp.campName}</td>
                  <td className="px-4 py-2">{camp.campFees}</td>
                  <td className="px-4 py-2">{camp.displayName}</td>
                  <td className="px-4 py-2">
                    {camp.paymentStatus === "Paid" ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => handleMakePayment(camp._id)}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {camp.confirmationStatus === "Confirmed" ? (
                      <p className="text-green-600">Confirmed</p>
                    ) : (
                      <p className="text-red-600">Pending</p>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center items-center text-3xl gap-3">
                      {camp.paymentStatus !== "Paid" && (
                        <button
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Cancel Registration"
                          className="hover:scale-125 text-red-500"
                          onClick={() => handleDeleteCamp(camp._id)}
                        >
                          <MdCancel />
                        </button>
                      )}
                      {camp.paymentStatus === "Paid" && (
                        <button
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Give Feedback"
                          className={`${
                            camp?.feedbackStatus
                              ? "text-gray-500"
                              : "text-blue-500 hover:scale-125"
                          }`}
                          onClick={() => handleFeedbackForm(camp._id)}
                          disabled={camp?.feedbackStatus}
                        >
                          <MdFeedback />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      {/* Payment Modal */}
      <dialog id="updatePayment" className="modal w-3/4 mx-auto">
        <div className="modal-box min-w-full bg-base-200">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          <div className="">
            {selectedCampId && (
              <Payment
                campId={selectedCampId}
                onClose={handleCloseModal}
                onUpdate={refetch}
              />
            )}
          </div>
        </div>
      </dialog>

      {/* Feedback modal */}
      <dialog id="feedbackModal" className="modal w-3/4 mx-auto">
        <div className="modal-box min-w-full bg-base-200">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal2}
          >
            ✕
          </button>
          <div className="">
            {selectedCampId && (
              <FeedbackForm
                campId={selectedCampId}
                onClose={handleCloseModal2}
                onUpdate={refetch}
              ></FeedbackForm>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RegisteredCamps;
