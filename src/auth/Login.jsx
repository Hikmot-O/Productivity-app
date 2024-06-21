import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lock from "../assets/icons/lock.svg";
import user from "../assets/icons/user.svg";
import email from "../assets/icons/email-1.png";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { app, db } from "../../utils/Firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import LogoBig from "../components/LogoBig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    //create a db using the uid as the doc Id
    try {
      // setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user, result, credential);
      const { displayName, email, accessToken, photoURL, uid } = user;
      console.log(user.email);
      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("username", displayName);

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      // if(docSnap.exists()){
      //   console.log('yesss!!')
      // }else{
      //   await setDoc(doc(db, "users", uid), {
      //     email: email,
      //     username: displayName.split(" ")[0],
      //     todos: [],
      //     goals: [],
      //     goalsInProgress: [],
      //     todosInProgress: [],
      //     completedGoals: [],
      //     completeTodos: [],
      //   });
      // }

      if (accessToken) {
        // setIsLoading(false);
        navigate("/main/home");
        toast.success("Welcome!");
      } else {
        // setIsLoading(false);
        return;
      }
    } catch (error) {
      // setIsLoading(false);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(error.code);
      console.log(error.message);
    }
  };

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

  const loginSubmitHandler = async (data) => {
    6;
    console.log(data);
    setIsLoading(true);
    setLoginData(data);
    reset({
      email: "",
      password: "",
    });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userToken = user.accessToken;
      const userUid = user.uid;

      sessionStorage.setItem("uid", userUid);
      // sessionStorage.setItem("username", userUid);

      console.log(user);

      if (userToken) {
        setIsLoading(false);
        navigate("/main/home");
        toast.success("Welcome!");
      } else {
        setIsLoading(false);
        return;
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setLoginError(err.me);
      toast.error(err.code);
    }
  };

  return (
    <section className="px-3 sm:px-0 overflow-x-hidden overflow-y-scroll flex flex-col items-center justify-center bg-blue-500 bg-opacity-35 bg-bg-login w-screen h-screen">
      <LogoBig />
      <form
        onSubmit={handleSubmit(loginSubmitHandler)}
        action="submit"
        className="text-base flex flex-col w-full sm:w-[500px]"
      >
        <div className="flex items-center mb-5 w-full sm:w-[500px] h-14">
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
        {/* <div className="flex items-center mb-5 w-full sm:w-[500px] h-14">
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

        <div className="flex items-center mb-5 w-full sm:w-[500px] h-14">
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
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </button>
        {/* </Link> */}
      </form>
      <p className="text-base text-center text-white my-3">OR</p>
      <button
        onClick={loginWithGoogle}
        className="text-base h-14 w-full sm:w-[500px] border border-white text-white rounded-[4px]"
      >
        SIGNIN WITH GOOGLE
      </button>
      <p className="pt-2 text-center text-white text-base">
        Don't have an account?{" "}
        <Link className="underline text-blue-500" to="/create-account">
          Signup
        </Link>
      </p>
    </section>
  );
};

export default Login;
