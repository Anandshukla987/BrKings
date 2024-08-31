import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Error = () => {
  const params = useParams();
  const navigation = useNavigate();
  // console.log(params.id);
  return (
    <div>
      <div className="errorPage">
        <h1>404</h1>
        <div className="err-content">
          <h3>WE ARE SORRY, PAGE NOT FOUND!</h3>
          <p>
            THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME
            CHANGED OR IS TEMPORARILY UNAVAILABLE.
          </p>
          <button
            type="button"
            className="mt-4 rounded-md bg-rose-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigation("")}
          >
            Back to Home Page
          </button>
          {/* <NavLink to="/">Back to Home Page</NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Error;
