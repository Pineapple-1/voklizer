import Base from "../../layout/Base";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useSWR from "swr";
import CountryCodeModal from "../../components/CountryCodeModal";
import Instance from "../../axios/Axios";
import Loading from "../../components/Loading.jsx";
import countries from "../../data/countries.json";
import {GeometricButton} from "../../components/GeometricButton";
import {useHistory} from "react-router-dom";

function UserProfile() {
    const {data, isLoading, mutate} = useSWR("auth/me");
    const [posting, setPosting] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const history = useHistory();

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            countryCode: "-",
        },
    });

    useEffect(() => {
        if (data?.data) {
            const userData = data.data;

            setValue("firstName", userData.firstName || "");
            setValue("lastName", userData.lastName || "");
            setValue("email", userData.email || "");
            setValue("mobileNumber", userData.mobileNumber || "");
            setValue("countryCode", userData.countryCode || "+92");

            const foundCountry = countries.find(country => country.code === (userData.countryCode || "+92"));
            if (foundCountry) {
                setSelectedCountry(foundCountry);
            }
        }
    }, [data, setValue]);

    const handleCountrySelection = (country) => {
        setSelectedCountry(country);
        setValue("countryCode", country.code);
        // Clear any validation errors for countryCode field
        if (errors.countryCode) {
            clearErrors("countryCode");
        }
    };

    const onSubmit = async (formData) => {
        try {
            setPosting(true);
            await Instance.put("auth/update-user-info", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                countryCode: formData.countryCode,
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

                    <div className="flex flex-col gap-2 items-stretch justify-stretch rounded-none" style={{
                        minWidth: '120px',
                        maxWidth: '150px',
                        flexShrink: 0,
                        WebkitFlexShrink: 0
                    }}>
                        <div className='w-[100px] border-b-2 border-black py-0.5'>
                            <CountryCodeModal
                                selectedCountry={selectedCountry}
                                onSelectionChange={handleCountrySelection}
                                placeholder="Select Country"
                            />
                        </div>
                        
                        <input
                            type="hidden"
                            {...register("countryCode", {
                                required: "Required",
                                validate: (value) => value !== "" || "Please select a country"
                            })}
                            name="countryCode"
                        />
                        
                        {errors.countryCode && (
                            <p className="text-purple text-sm">{errors.countryCode.message}</p>
                        )}
                    </div>

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

                <div className="flex">
                    <div className="w-3/5 shrink-0">
                        <GeometricButton
                            type="submit"
                            variant="primary"
                            cut="right"
                            width="100%"
                            className="w-full"
                            disabled={posting}
                        >
                            {posting ? "Updating..." : "Update"}
                        </GeometricButton>
                    </div>
                    <div className="w-full -ml-2">
                        <GeometricButton
                            type="button"
                            variant="secondary"
                            cut="left"
                            width="100%"
                            className="w-full"
                            onClick={() => history.go(-1)}
                            disabled={posting}
                        >
                            Cancel
                        </GeometricButton>
                    </div>
                </div>
            </form>

            <Loading open={posting} message="Saving Info" />

        </Base>
    );
}

export default UserProfile;