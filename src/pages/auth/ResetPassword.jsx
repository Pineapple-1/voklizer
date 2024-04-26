import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import AuthLayout from "./AuthLayout";

function ResetPass() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    history.replace("/");
  };

  return (
    <AuthLayout>
      <div className="flex justify-between flex-col gap-8 h-full">
        <div />

        <div className="text-2xl leading-8 w-full text-center">
          Password Reset
        </div>

        <form
          className="flex justify-between flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1.5">
            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
              }
              placeholder="Password"
              {...register("password", {
                required: "Minimum 8 characters eg: pass@word",
                pattern: {
                  value: /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                  message: "Enter a Valid Password",
                },
              })}
              type="text"
              name="password"
            />
            {errors.password && (
              <p className="text-purple text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
              }
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="text"
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <p className="text-purple text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            className="bg-[#D9D9D960]  flex justify-between items-center rounded-xl py-[9px] px-3"
            type="submit"
          >
            <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
            <div className="text-sm">Update Password</div>
          </button>
        </form>
        <div />
      </div>
    </AuthLayout>
  );
}

export default ResetPass;
