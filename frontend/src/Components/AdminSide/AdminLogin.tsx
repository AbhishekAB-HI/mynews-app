import "tailwindcss/tailwind.css";
import { FcGoogle } from "react-icons/fc";
import newlogo from "../images/newslogo.jpg";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

const AdminLoginpage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dataget = { email, password };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:3000/api/admin/adminlogin",
      dataget,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.message === "adminLogin succesfully") {
      navigate("/Adminhome");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 bg-purple-700 flex justify-center items-center order-1 md:order-2 p-5 md:p-10">
          <img
            src={newlogo}
            alt="News illustration"
            className="w-full md:w-4/5 max-w-xs md:max-w-md rounded-lg"
          />
        </div>

        <div className="flex-1 bg-black text-white flex flex-col justify-center p-5 md:p-10 order-2 md:order-1">
          <div className="mb-5 text-center"></div>

          <div className="mb-10 text-center">
            <h2
              className="text-3xl md:text-3xl"
              style={{ fontFamily: "junge" }}
            >
            ADMIN LOGIN
            </h2>
          </div>

          <div className="flex flex-col mx-auto w-full md:w-3/4">
            
           
            <form onSubmit={handlesubmit}>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your Email"
                className="py-3 px-4 border bg-black rounded mb-5 md:mb-10 text-lg w-full"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="py-3 px-4 border bg-black rounded mb-5 md:mb-10 text-lg w-full"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
              <button
                type="submit"
                className="bg-white text-black py-1 rounded text-lg mb-5"
                style={{ fontFamily: "Roboto, sans-serif", width: "100%" }}
              >
                Log in
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginpage;
