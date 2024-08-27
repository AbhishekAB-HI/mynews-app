import "tailwindcss/tailwind.css";
import { FcGoogle } from "react-icons/fc";
import newlogo from "../images/newslogo.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Loginpage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const handlesubmit = async (values: { email: string; password: string }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.message === "user Login succesfully") {
        toast.success("Login successfully")
        navigate("/homepage");
      } 
    
    } catch (error) {
       if (axios.isAxiosError(error)) {
         const errorMessage =
           error.response?.data?.message || "An error occurred";
         toast.error(errorMessage);
       } else {
         toast.error("Unknown error occurred");
       }
       console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen ">
        <div className="flex-1 bg-purple-700 flex justify-center items-center order-1 md:order-2 p-5 md:p-10">
          <img
            src={newlogo}
            alt="News illustration"
            className="w-full md:w-4/5 max-w-xs md:max-w-md rounded-lg"
          />
        </div>

        <div className="flex-1 bg-black text-white flex flex-col justify-center p-5 md:p-10 order-2 md:order-1">
         

          <div className="mt-10 text-center">
            <h2
              className="text-3xl md:text-3xl"
              style={{ fontFamily: "junge" }}
            >
              Your trusted source for <br /> the latest news and insights
            </h2>
          </div>

          <div className="flex flex-col mx-auto w-full md:w-3/4">
            <button className="flex items-center justify-center bg-white text-black py-2 rounded text-lg font-semibold space-x-2">
              <FcGoogle className="text-2xl" />
              <span style={{ fontFamily: "Roboto, sans-serif" }}>
                Sign in with Google
              </span>
            </button>
            <div
              className="text-center my-5 text-sm"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              or
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handlesubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="py-3 px-4 border bg-black rounded mb-5 md:mb-10 text-lg w-full"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mb-2"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="py-3 px-4 border bg-black rounded mb-5 md:mb-10 text-lg w-full"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mb-2"
                  />

                  {error && <div className="text-red-500 mb-2">{error}</div>}

                  <button
                    type="submit"
                    className="bg-white text-black py-1 rounded text-lg mb-5"
                    style={{ fontFamily: "Roboto, sans-serif", width: "100%" }}
                    disabled={isSubmitting}
                  >
                    Log in
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center text-sm">
              <p
                className="text-gray-400"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <Link to="/forgetpass"> Forgot password?</Link>
              </p>
              <br />
              <p
                className="text-white"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Don't have an account?{" "}
                <Link to="/register" className="font-bold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
