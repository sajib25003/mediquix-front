import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = ({ campId, onClose, onUpdate }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_PK);

  return (
    <div>
      <div className="pt-4 pb-6">
        <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-center">
          Secure Checkout
        </h2>
      </div>
      <div className="my-2">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            campId={campId}
            onClose={onClose}
            onUpdate={onUpdate}
          ></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
