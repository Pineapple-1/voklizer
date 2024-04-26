import React from "react";
import Socials from "./components/Socials";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import AuthLayout from "./AuthLayout";

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);

    history.push("/reset-pass");
  };

  return (
    <AuthLayout>
      <div className="flex justify-between flex-col gap-8 h-full">
        <div />

        <div className="text-2xl leading-8 w-full text-center">
          Password Reset
        </div>

        <form
          className="flex justify-between flex-col gap-6"
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

          <button
            className="bg-[#D9D9D960]  flex justify-between items-center rounded-xl py-[9px] px-3"
            type="submit"
          >
            <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
            <div className="text-sm">Reset Password</div>
          </button>
        </form>
        <div />
      </div>
    </AuthLayout>
  );
}

export default ForgetPassword;
