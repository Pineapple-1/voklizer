import Base from "../../layout/Base";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useSWR from "swr";
import {CountrySelect} from '../auth/Register';
import Instance from "../../axios/Axios";
import Loading from "../../components/Loading.jsx";

function UserProfile() {
    const {data, isLoading, mutate} = useSWR("auth/me");
    const [posting, setPosting] = useState(false);
    const [showCountry, setShowCountry] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            countryCode: "+92",
        },
    });

    // Populate form with API data when it loads
    useEffect(() => {
        if (data?.data) {
            const userData = data.data;

            // Set individual form values from API data
            setValue("firstName", userData.firstName || "");
            setValue("lastName", userData.lastName || "");
            setValue("email", userData.email || "");
            setValue("mobileNumber", userData.mobileNumber || "");
            setValue("countryCode", userData.countryCode || "+92");

            // Alternative: Use reset to set all values at once
            // reset({
            //     firstName: userData.firstName || "",
            //     lastName: userData.lastName || "",
            //     email: userData.email || "",
            //     mobileNumber: userData.mobileNumber || "",
            //     countryCode: userData.countryCode || "+92",
            // });
        }
    }, [data, setValue]);

    const onSubmit = async (formData) => {
        try {
            setPosting(true);
            await Instance.put("auth/update-user-info", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
            });

            // Revalidate to get fresh data
            await mutate();
            setPosting(false);

        } catch (error) {
            console.error("Error updating profile:", error);
            setPosting(false);
        }
    };

    // Show loading state while fetching initial data
    if (isLoading) {
        return (
            <Base>
                <div className="text-[24px] leading-8 text-[#020202] text-center my-5">Account</div>
                <Loading open={true} message="Loading profile..." />
            </Base>
        );
    }

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
                                "rounded-none text-base border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
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
                                "rounded-none text-base border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
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
                    <CountrySelect
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        showCountry={showCountry}
                        setShowCountry={setShowCountry}
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <input
                            className={
                                "rounded-none text-base border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none "
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
                            "rounded-none text-base border-black border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none"
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
                    className="bg-[#D9D9D960] flex justify-between items-center rounded-xl py-[9px] px-3"
                    type="submit"
                    disabled={posting}
                >
                    <div className="h-1.5 w-1/2 bg-purple rounded-2xl"></div>
                    <div className="text-sm">{posting ? "Updating..." : "Update"}</div>
                </button>
            </form>

            <Loading open={posting} message="Saving Info" />

        </Base>
    );
}

export default UserProfile;