import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const navigate = useNavigate();
  const { token, _logout } = useAuth();

  return (
    <div>
      {!token ? (
        <>
          <div className="bg-white border shadow h-16 flex justify-between pl-32">
            <div className="flex justify-center text-gray-600 h-full ml-14">
              <button
                className=" pl-3 text-gray-500  "
                onClick={() => {
                  navigate("/");
                }}
              >
                FarmVest
              </button>
            </div>
            <div className="flex pr-32">
              <button
                className="flex flex-col justify-center text-gray-500 font-light h-full mr-12"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SignUp
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="flex flex-col justify-center text-gray-500 font-light h-full mr-12"
              >
                LogIn
              </button>
              {/* <button className="flex flex-col justify-center text-gray-600 font-light h-full mr-12">
                Pricing
              </button>
              <button className="flex flex-col justify-center text-gray-600 font-light h-full mr-12">
                About
              </button> */}
              <button
                className="flex flex-col justify-center text-gray-500 font-light  h-full mr-12"
                onClick={() => {
                  navigate("/farms");
                }}
              >
                Products
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-slate-100 border-2 shadow h-16 flex justify-between pl-32">
            <div className="flex justify-center text-gray-500 font-light h-full ml-14">
              {/* <img className="h-12 w-12 mt-1" src={img}></img> */}
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="pl-3 text-gray-500 "
              >
                FarmVest
              </button>
            </div>
            <div className="flex pr-32">
              <button
                className="flex flex-col justify-center text-gray-500 font-light  h-full mr-12"
                onClick={() => {
                  navigate("/farms");
                }}
              >
                Products
              </button>
              <button
                className="flex flex-col justify-center text-gray-500 font-light h-full mr-12"
                onClick={() => {
                  navigate("/wallet");
                }}
              >
                Wallet
              </button>
              <button
                className="flex flex-col justify-center text-gray-500 font-light h-full mr-12"
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Profile
              </button>
              <button
                className="flex flex-col justify-center text-gray-500 font-light h-full mr-12"
                onClick={() => {
                  navigate("/addfarms");
                }}
              >
                Add Farm
              </button>
              <button
                className="flex flex-col justify-center text-gray-500 font-light  h-full mr-12"
                onClick={() => {
                  _logout();
                  // navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
