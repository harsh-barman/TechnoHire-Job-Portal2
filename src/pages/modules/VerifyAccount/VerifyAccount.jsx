import React, { useState } from "react";
import LoginBack from "../../../assets/img/loginBackground.png";
import LoginLogo from "../../../assets/img/loginLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";

const VerifyAccount = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("Enter your phone no");
  const [email, setEmail] = useState("Enter your email");
  const [editPhone, setEditPhone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailVerification = async () => {
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://job-portal-candidate-be.onrender.com/v1/mailVerification",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        navigate("/emailVerify", { state: { email } });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send verification code"
      );
      console.error("Error sending verification email:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
      {/* Left Side: Form */}
      <div className="w-full md:w-[60%] px-6 py-8 md:px-12 lg:px-32 overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-[10px]">
            Verify Your Account
          </h2>
          <span className="text-gray-600">
            Where should we send your verification code?
          </span>
        </div>

        {/* Error message */}
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        {/* Contact Boxes */}
        <div className="flex flex-col gap-6 items-center">
          {/* Email Box */}
          <div className="border-2 border-gray-300 w-[335px] h-[135px] rounded-lg p-4 flex flex-col items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
              <AiOutlineMail className="text-2xl text-gray-500" />
              {editEmail ? (
                <input
                  type="email"
                  className="w-[160px] border-b border-gray-400 focus:outline-none focus:border-violet text-gray-700 text-lg"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <span className="text-gray-700 text-lg">{email}</span>
              )}
              <BiEditAlt
                className="text-xl text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={() => setEditEmail(!editEmail)}
              />
            </div>
            <button
              className={`py-2 px-6 w-[190px] h-[41px] bg-violet text-white rounded-lg font-semibold hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleEmailVerification}
              disabled={loading}
            >
              {loading ? "Sending..." : "Select"}
            </button>
          </div>

          <p className="text-xl font-[600] text-gray-800">OR</p>

          {/* Phone Number Box */}
          <div className="border-2 border-gray-300 w-[335px] h-[135px] rounded-lg p-4 flex flex-col items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
              <FiPhone className="text-2xl text-gray-500" />
              {editPhone ? (
                <input
                  type="text"
                  className="w-[160px] border-b border-gray-400 focus:outline-none focus:border-violet text-gray-700 text-lg"
                  value={phone}
                  placeholder="Enter your phone no"
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                <span className="text-gray-700 text-lg">{phone}</span>
              )}
              <BiEditAlt
                className="text-xl text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={() => setEditPhone(!editPhone)}
              />
            </div>
            <button
              className="py-2 px-6 w-[190px] h-[41px] bg-violet text-white rounded-lg font-semibold hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
              onClick={() => {
                alert("Currently Under Development");
                // navigate("/phoneVerify");
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block md:w-[40%] relative h-screen">
        <img
          src={LoginBack}
          alt="Tech image"
          className="pl-20 w-[615px] h-full object-cover"
        />
        <div className="absolute left-20 inset-0 flex items-center justify-center">
          <img
            src={LoginLogo}
            alt="Login Logo"
            className="w-[200px] sm:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
