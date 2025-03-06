import Socials from "./components/Socials";
import {useForm} from "react-hook-form";
import {useHistory, useLocation} from "react-router-dom";
import {useState} from "react";
import AuthLayout from "./AuthLayout";
import SelectIcon from "../../assets/icons/SelectIcon";
import {useSetAtom, useAtomValue} from "jotai";
import {userAtom, socialAtom} from "../../state";
import {motion} from "framer-motion";
import {useEffect, useRef} from "react";

function Register() {
  const social = useAtomValue(socialAtom);
  const history = useHistory();
  const location = useLocation();
  const [showCountry, setShowCountry] = useState(false);
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
                setValue={setValue}
                showCountry={showCountry}
                setShowCountry={setShowCountry}
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


export const CountrySelect = ({register, errors, setValue, setShowCountry, showCountry}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountry(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCountry]);

  const handleSelect = (value) => {
    setValue("countryCode", value, {shouldValidate: true, shouldDirty: true});
    setShowCountry(false);
  };

  return (
    <div ref={dropdownRef} className="flex flex-col gap-1.5 w-1/4 relative cursor-pointer"
         onClick={() => setShowCountry((prev) => !prev)}>
      <input
        className="caret-transparent cursor-pointer rounded-none text-sm border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-sm focus:outline-none focus:ring-none"
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
        onFocus={(e) => e.target.blur()}
      />
      <div className="absolute top-3 right-0">
        <SelectIcon/>
      </div>
      {showCountry && (
        <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -10}}
          transition={{duration: 0.2}}
          className="absolute top-full left-0 mt-1 bg-white border border-black rounded-lg shadow-md p-2  flex flex-col gap-2"
        >
          <div
            className="bg-black px-4 py-0.5 text-sm text-white w-max rounded-lg cursor-pointer font-semibold"
            onClick={() => {

              handleSelect("+44")
              setShowCountry((prev) => !prev)
            }}
          >
            UK
          </div>
          <div
            className="bg-black px-4 py-0.5 text-sm text-white w-max rounded-lg cursor-pointer font-semibold"
            onClick={() => {
              handleSelect("+92")
              setShowCountry((prev) => !prev)
            }}
          >
            PK
          </div>
        </motion.div>
      )}
      {errors.countryCode && (
        <p className="text-purple text-sm">{errors.countryCode.message}</p>
      )}
    </div>
  );
};

export default Register;
