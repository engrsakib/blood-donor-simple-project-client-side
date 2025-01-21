import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from './CheckOut';
import { AuthContext } from '../../../../provider/AuthProvider';
import useGetAllUsers from './useGetAllUsers';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);
const AddFund = () => {
    const [TK, setTK] = useState(null);
    const {user} = useContext(AuthContext);
    const { users, refetch, isPending } = useGetAllUsers(user);
    const handleFrom = (e)=>{
        e.preventDefault();
        setTK(e.target.value)
    }
    // console.log(TK)
    return (
      <>
        <Helmet>
          <title>add funds</title>
        </Helmet>

        <section>
          <form onChange={handleFrom} action="">
            <label htmlFor="number">
              <span className="text-md text-info">
                Input Your Donation Amount
              </span>
            </label>
            <input
              type="number"
              placeholder="Input Your Amount"
              className="input input-bordered input-success w-full max-w-xs"
              name="number"
            />
          </form>
          <Elements stripe={stripePromise}>
            {/* from Component */}
            <CheckOut TK={TK}></CheckOut>
          </Elements>
        </section>
      </>
    );
};

export default AddFund;