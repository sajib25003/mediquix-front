import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import { useState, useEffect } from "react";
  import useAxiosSecure from "../../../hooks/useAxiosSecure";
  import { useQuery } from "@tanstack/react-query";
  
  const CheckoutForm = ({ campId, onClose, onUpdate }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
  
    const { data: camp = {} } = useQuery({
      queryKey: ["camp", campId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/joinCamps/${campId}`);
        return res.data;
      },
      enabled: !!campId, 
    });
  
    useEffect(() => {
      if (camp && camp.campFees) {
        axiosSecure
          .post("/create-payment-intent", { price: camp.campFees })
          .then((res) => setClientSecret(res.data.clientSecret))
          .catch((error) => console.error("Error creating payment intent:", error));
      }
    }, [axiosSecure, camp]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardNumberElement);
  
      if (card == null) {
        return;
      }
  
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
  
      if (paymentError) {
        setError(paymentError.message);
      } else {
        setError("");
  
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });
  
        if (confirmError) {
          setError(confirmError.message);
        } else if (paymentIntent.status === "succeeded") {
          axiosSecure
            .patch(`/joinCamps/${campId}`, {
              paymentStatus: "Paid",
              confirmationStatus: "Confirmed",
              transactionId: paymentIntent.id,
              campName: camp.campName,
              campFees: camp.campFees,
            })
            .then(() => {
              e.target.reset();
              onClose();
              onUpdate();
            })
            .catch((err) => console.error("Failed to update payment status", err));
        }
      }
    };
  
    const cardElementOptions = {
      style: {
        base: {
          fontSize: "16px",
          color: "#32325d",
          "::placeholder": {
            color: "#aab7c4",
          },
          fontFamily: "Arial, sans-serif",
          iconColor: "#c4f0ff",
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        {/* Card Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Number
          </label>
          <div className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <CardNumberElement options={cardElementOptions} />
          </div>
        </div>
  
        {/* Expiration Date Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Expiration Date
          </label>
          <div className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>
  
        {/* CVC Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CVC
          </label>
          <div className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div>
  
        <div className="flex justify-center my-4">
          <button
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
        <div>
          <p className="text-red-600">{error}</p>
        </div>
      </form>
    );
  };
  
  export default CheckoutForm;