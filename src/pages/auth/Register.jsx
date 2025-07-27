import Socials from "./components/Socials";
import {useForm} from "react-hook-form";
import {useHistory, useLocation} from "react-router-dom";
import {useState} from "react";
import AuthLayout from "./AuthLayout";
import {useSetAtom, useAtomValue} from "jotai";
import {userAtom, socialAtom} from "../../state";

function Register() {
  const social = useAtomValue(socialAtom);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [removePassword, setRemovePassword] = useState(
      searchParams.get("hidepass") === "true" ? true : false
  );
  const setUser = useSetAtom(userAtom);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: social?.firstname || "",
      lastName: social?.lastname || "",
      email: social?.email || "",
    },
  });

  const onSubmit = (data) => {
    if (!removePassword) {
      const {confirmPassword, ...restOfData} = data;
      setUser({...restOfData, authType: "customPassword"});
    } else {
      const {password, confirmPassword, ...restOfData} = data;
      setUser({...restOfData, authType: "google"});
    }
    history.push("/selection");
  };
  const password = watch("password");

  return (
      <AuthLayout>
        <div className="flex flex-col gap-5 ">
          <div className=" flex justify-between flex-col gap-8">
            <div className="text-2xl leading-8 w-full text-center">Sign Up</div>

            <form
                className="flex justify-between flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ">
                  <input
                      className={
                        "rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none w-full"
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
                        "rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none w-full"
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

                <CountrySelect
                    register={register}
                    errors={errors}
                />

                <div className="flex flex-col gap-2 w-full">
                  <input
                      className={
                        "rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none "
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

              <div className="flex flex-col gap-2">
                <input
                    className={
                      "rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none"
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

              {!removePassword && (
                  <>
                    <div className="flex flex-col gap-2">
                      <input
                          className={
                            "rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none"
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

                    <div className="flex flex-col gap-2">
                      <input
                          className={
                            "rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none"
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
                  </>
              )}

              {console.log(removePassword)}
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

          <Socials setValue={setValue} setRemovePassword={setRemovePassword}/>
        </div>
      </AuthLayout>
  );
}


export const CountrySelect = ({register, errors}) => {
  return (
      <div className="flex flex-col gap-2 w-1/4">
        <select
            className="rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 focus:outline-none focus:ring-none cursor-pointer"
            {...register("countryCode", {
              required: "Required",
              pattern: {
                value: /^(\+92|\+44)$/,
                message: "Select valid country code",
              },
            })}
            name="countryCode"
            aria-invalid={errors.countryCode ? "true" : "false"}
            defaultValue=""
        >
          <option value="" disabled className="text-gray-400">
            Country
          </option>
          <option value="+44" className="text-black">
            UK (+44)
          </option>
          <option value="+92" className="text-black">
            PK (+92)
          </option>
        </select>
        {errors.countryCode && (
            <p className="text-purple text-sm">{errors.countryCode.message}</p>
        )}
      </div>
  );
};

export default Register;