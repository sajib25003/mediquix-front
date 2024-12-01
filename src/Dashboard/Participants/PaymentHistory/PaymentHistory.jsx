import {  useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import LoaderSpinner from "../../../Shared/LoaderSpinner";
import { Pagination } from "flowbite-react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const {
    data: joinedCamps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["joinedCamps", user.email], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/joinedCamps?email=${user.email}`); 
      return res.data;
    },
  });

  const paidCamps = joinedCamps.filter((camp) => camp.transactionId);

  const filteredCamps = paidCamps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.campFees.toString().includes(searchQuery) || 
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

  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  if (error) return <div>Error loading payment history</div>;

  return (
    <div className="px-14 w-full">
      <Helmet>
        <title>MediQuix | Payment History</title>
      </Helmet>
      <div className="overflow-x-auto w-full">
        <div className="pt-4 pb-6">
          <h2 className="text-base md:text-3xl font-bold text-center">
            Payment History
          </h2>
        </div>
        {/* Search Bar */}
        <div className="flex justify-start my-4">
          <input
            type="text"
            className="input input-bordered w-3/4 md:w-1/2"
            placeholder="Can't find what you're looking for? Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table text-center">
          <thead>
            <tr className="bg-base-200 border-b-2">
              <th>#</th>
              <th>Participant Name</th>
              <th>Camp Fee</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps.map((camp, idx) => (
              <tr key={camp._id} className="border-b">
                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td>{camp.displayName}</td>
                <td>$ {camp.campFees}</td>
                <td>{camp.paymentStatus}</td>
                <td>{camp.confirmationStatus}</td>
                <td>{camp.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default PaymentHistory;