import Socials from "./components/Socials";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import SelectIcon from "../../assets/icons/SelectIcon";
import { useSetAtom, useAtomValue } from "jotai";
import { userAtom, socialAtom } from "../../state";

function Register() {
  const social = useAtomValue(socialAtom);
  const history = useHistory();
  const [showCountry, setShowCountry] = useState(false);
  const setUser = useSetAtom(userAtom);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: social?.firstname || "",
      lastName: social?.lastname || "",
      email: social?.email || "",
    },
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...restOfData } = data;
    setUser({ ...restOfData });
    history.push("/selection");
  };
  const password = watch("password");

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5 ">
        <div className=" flex justify-between flex-col gap-8">
          <div className="text-2xl leading-8 w-full text-center">Sign Up</div>

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
                <p className="text-purple text-sm">
                  {errors.firstName.message}
                </p>
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
                        setValue("countryCode", "+92", {
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
                        setValue("countryCode", "+44", {
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
                type="password"
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
                type="password"
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
              <div className="text-sm">Register</div>
            </button>
          </form>
        </div>

        <div className=" text-lg text-center ">OR</div>

        <Socials setValue={setValue} />
      </div>
    </AuthLayout>
  );
}

export default Register;
