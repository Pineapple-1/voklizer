import React from "react";
import Base from "../../layout/Base";
import { userSubject$ } from "../auth/TokenState";
import { useForm } from "react-hook-form";
import SelectIcon from "../../assets/icons/SelectIcon";
import { useState } from "react";

function UserProfile() {
  const user = userSubject$.value.data;
  const [showCountry, setShowCountry] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastname || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber || "",
      countryCode: "+92",
    },
  });

  const onSubmit = (data) => {
    console.log("--->>>>", data);
  };
  return (
    <Base>
      <div className="text-[24px] leading-8 text-[#020202] text-center my-5">Account</div>

      <form
        className="flex justify-between flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 ">
            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
              }
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name required?",
              })}
              type="text"
              name="firstName"
              autoComplete="off"
              aria-invalid={errors.firstName ? "true" : "false"}
            />

            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
              }
              placeholder="Last Name"
              {...register("lastName", {
                required: false,
              })}
              type="text"
              name="lastName"
              autoComplete="off"
              aria-invalid={errors.lastName ? "true" : "false"}
            />
          </div>
          {errors.firstName && (
            <p className="text-purple text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex gap-4 w-full">
          <div
            className="flex flex-col gap-1.5 w-1/4 relative"
            onClick={() => setShowCountry((showCountry) => !showCountry)}
          >
            <input
              className={
                "caret-transparent cursor-pointer rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none"
              }
              disabled
              placeholder="Country"
              {...register("countryCode", {
                required: "Required",
                pattern: {
                  value: /^(\+92|\+44)$/,
                  message: "Select valid country code",
                },
              })}
              type="text"
              name="countryCode"
              autoComplete="off"
              aria-invalid={errors.countryCode ? "true" : "false"}
            />
            <div className="absolute top-3 right-0">
              <SelectIcon />
            </div>
            {showCountry && (
              <div className="flex gap-2">
                <div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer"
                  onClick={() =>
                    setValue("countryCode", "+44", {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  UK
                </div>
                <div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer"
                  onClick={() =>
                    setValue("countryCode", "+92", {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  PK
                </div>
              </div>
            )}

            {errors.countryCode && (
              <p className="text-purple text-sm">
                {errors.countryCode.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <input
              className={
                "rounded-none text-xs border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none "
              }
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: "Required eg: +92-3244272485",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid Mobile Number",
                },
              })}
              type="number"
              name="mobileNumber"
              autoComplete="off"
              aria-invalid={errors.mobileNumber ? "true" : "false"}
            />
            {errors.mobileNumber && (
              <p className="text-purple text-sm">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
        </div>
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
          <div className="text-sm">Update</div>
        </button>
      </form>
    </Base>
  );
}

export default UserProfile;
