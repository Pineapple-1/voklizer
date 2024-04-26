import React from "react";
import Socials from "./components/Socials";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import AuthLayout from "./AuthLayout";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    history.push("/locale");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5 ">
        <div className=" flex justify-between flex-col gap-8">
          <div className="text-2xl leading-8 w-full text-center">Login</div>

          <div className="flex flex-col gap-3">
            <form
              className="flex justify-between flex-col gap-[29px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1.5">
                <input
                  className={
                    "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
                  }
                  placeholder="Email Address"
                  {...register("email", {
                    required: "Valid Email Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email Address e.g johndoe@example.com",
                    },
                  })}
                  type="text"
                  name="email"
                  autoComplete="off"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-purple text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <input
                  className={
                    "rounded-none  text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
                  }
                  placeholder="Password"
                  {...register("password", {
                    required: "Minimum 8 characters eg: pass@word",
                    pattern: {
                      value:
                        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                      message: "Enter a Valid Password",
                    },
                  })}
                  type="password"
                  name="password"
                />
                {errors.password && (
                  <p className="text-purple text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                className="bg-[#D9D9D960] rounded-xl  py-[9px] flex justify-between items-center  px-3"
                type="submit"
              >
                <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
                <div className="text-sm">Login</div>
              </button>
            </form>
            <div className="flex justify-between px-1">
              <div
                className="text-purple text-sm"
                onClick={() => {
                  history.push("/forget-pass");
                }}
              >
                Forgot Password ?
              </div>
              <div
                className="text-purple text-sm"
                onClick={() => {
                  history.push("/register");
                }}
              >
                Not Registered?
              </div>
            </div>
          </div>
        </div>
        <div className=" text-lg text-center ">OR</div>
        <Socials />
      </div>
    </AuthLayout>
  );
}

export default Login;
