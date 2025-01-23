import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import "../../../../common.css";
import axios from "axios";
import useGetAllUsers from "./useGetAllUsers";
import { AuthContext } from "../../../../provider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const CheckOut = ({ TK }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const { users, refetch, isPending } = useGetAllUsers(user);
  const navigate = useNavigate();
  const getPaymentIntent = async () => {
    const { data } = await axios.post(
      "https://blood-donation-server-liard.vercel.app/create-payment-intent",
      {
        amount: TK,
      }
    );
    setClientSecret(data);
  };
  // console.log(clientSecret);

  useEffect(() => {
    if (TK !== null && TK !== undefined && TK !== "" && TK > 0 && TK < 999999) {
      getPaymentIntent();
    }
  }, [TK]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // confrem payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: users?.name,
          email: users?.email,
        },
      },
    });
    console.log(paymentIntent.status);
    if (paymentIntent.status === "succeeded") {
      const response = axios.post(
        "https://blood-donation-server-liard.vercel.app/users/add-fund",
        {
          email: users?.email,
          amount: Number(TK),
          name: users?.name,
          transaction: paymentIntent?.id,
          img: users?.photoUrl,
          date: new Date().toLocaleString(),
          time: new Date().toLocaleTimeString("en-GB", { hour12: true }),
        }
      );
      if (response) {
        Swal.fire("Success", "Payment successful", "success");
        navigate("/fundme");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-outline btn-wide btn-info"
        type="submit"
        disabled={!clientSecret || !stripe || !TK}
        label={`Pay ${TK}`}
      >
        Pay {TK}$
      </button>
    </form>
  );
};

export default CheckOut;
