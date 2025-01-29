import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SummaryApi } from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateValue = Object.values(data).every((e1) => e1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.newPassword !== data.confirmPassword){
      toast.error("Passwords do not match")
      return
    }

    try {
      const reponse = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });
      if (Response.data.error) {
        toast.error(reponse.data.message);
      }
      if (Response.data.success) {
        toast.success(reponse.data.message);
        navigate("/login", {
          state: data,
          newPassword : "",
          confirmPassword : ""
        });
      }
      setData({
        email: "",
      });
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [email]: value,
        [password]: value,
      };
    });
  };

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter your new password</p>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showpassword ? "text" : "password"}
                className="w-full outline-none"
                id="password"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
              />
            </div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full outline-none"
                id="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
            <div
              onClick={()=>setShowConfirmPassword (prev => !prev)}
              className="cursor-pointer"
            >
              {showpassword ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
export default ResetPassword;
