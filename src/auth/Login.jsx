import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lock from "../assets/icons/lock.svg";
import user from "../assets/icons/user.svg";
import email from "../assets/icons/email-1.png";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  //yup schema
  let userSchema = object({
    email: string().email().required("Email Address is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  //rhf
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const loginSubmitHandler = (data) => {
    console.log(data);
    setLoginData(data);
    reset({
      email: "",
      password: "",
    });
    navigate("/main");
    toast("Welcome!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: 'success'
    });
  };

  return (
    <section className="flex flex-col items-center justify-center bg-blue-500 bg-opacity-35 bg-bg-login w-[100%] h-screen">
      <form
        onSubmit={handleSubmit(loginSubmitHandler)}
        action="submit"
        className="text-base flex flex-col"
      >
        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-14">
            <img
              src={email}
              alt="email icon"
              className="pl-3 pr-5 py-[15px] border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="EMAIL"
            className="placeholder:text-white py-3 h-14 w-full  bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>
        <p className="text-red-500 -mt-3 mb-3 ">{errors.email?.message}</p>
        {/* <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-full">
            <img
              src={user}
              alt="user icon"
              className="pl-3 pr-5 py-3 h-14 border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            type="text"
            placeholder="USERNAME"
            className=" placeholder:text-white py-3 h-14 w-full  bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div> */}

        <div className="flex items-center mb-5 w-[500px] h-14">
          <div className="h-full">
            <img
              src={lock}
              alt="password icon"
              className="pl-3 pr-5 py-3 h-14 border border-r-0 border-white rounded-tl-[4px] rounded-bl-[4px]"
            />
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="PASSWORD"
            className="h-14 placeholder:text-white py-3 w-full bg-transparent outline-none border border-l-0 border-white rounded-br-[4px] rounded-tr-[4px]"
          />
        </div>
        <p className="text-red-500 -mt-3 mb-3 ">{errors.password?.message}</p>
        {/* <Link to="/main"> */}
        <button className="h-14 w-full bg-white text-blue-500 rounded-[4px]">
          LOGIN
        </button>
        {/* </Link> */}
      </form>
      <p className="text-base text-center text-white my-3">OR</p>
      <button className="text-base h-14 w-[500px] border border-white text-white rounded-[4px]">
        SIGNIN WITH GOOGLE
      </button>
    </section>
  );
};

export default Login;
