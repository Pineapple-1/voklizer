import { useState } from "react";
import ServiceProviderRegistrationLayout from "../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../components/ChipButton";
import Textbox from "../components/Textbox";
import { useHistory } from "react-router-dom";
import FakeSelect from "../components/FakeSelect";
import SelectIcon from "../assets/icons/SelectIcon";
import Instance from "../axios/Axios";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";

export function ServiceProviderPreferredLanguage() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const languages = ["english", "urdu", "spanish", "french"];
  const [value, setValue] = useState([]);

  const submit = () => {
    setLoading(true);
    Instance.post("service-provider/preferred-language", {
      preferredLanguages: value,
    })
      .then((res) => {
        console.log(res);
        history.push("/company-reg");
      })
      .finally(() => setLoading(false));
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4 w-full relative">
          <div className="flex gap-2 absolute -top-6 left-0">
            {value.length > 0 ? (
              value.map((item) => (
                <div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer"
                  onClick={() =>
                    setValue((value) => value.filter((v) => v !== item))
                  }
                  key={item}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="mt-2 text-[14px] leading-4">
                Preferred Language/s
              </div>
            )}
          </div>
          <div
            className={
              "caret-transparent cursor-pointer rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none h-0.5"
            }
          />
          <div className="absolute -top-1 right-0">
            <SelectIcon />
          </div>

          <div className="flex gap-2 flex-wrap">
            {languages.map((item) => (
              <div
                className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize"
                onClick={() =>
                  value.includes(item)
                    ? value
                    : setValue((value) => [...value, item])
                }
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <ChipButton onClick={() => submit()}>Next</ChipButton>
        </div>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyName() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-name", data)
      .then(() => {
        setLoading(false);
        history.push("/user-name");
      })
      .finally(() => reset());
  };
  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <input
              className={
                "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
              }
              {...register("companyName", {
                required: "Company name is required?",
              })}
              type="text"
              name="companyName"
              autoComplete="off"
              aria-invalid={errors.companyName ? "true" : "false"}
            />
            {errors.companyName && (
              <p className="text-purple text-sm">
                {errors.companyName.message}
              </p>
            )}
            <div className="text-[14px] leading-[17px]">Company Name</div>
          </div>
          <div className="flex justify-between">
            <ChipButton onClick={() => history.push("/preferred-language")}>
              Back
            </ChipButton>
            <ChipButton type={"submit"}>Next</ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyUser() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/basic-info", data)
      .then(() => {
        setLoading(false);
        history.push("/company-reg-num");
      })
      .finally(() => reset());
  };
  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex gap-6">
            <div className="flex flex-col gap-3 w-1/2">
              <input
                className={
                  "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                }
                {...register("firstName", {
                  required: "First name is required?",
                })}
                type="text"
                name="firstName"
                autoComplete="off"
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p className="text-purple text-sm">
                  {errors.firstName.message}
                </p>
              )}
              <div className="text-[14px] leading-[17px]">First Name</div>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <input
                className={
                  "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                }
                {...register("lastName", {
                  required: "Last name is required?",
                })}
                type="text"
                name="lastName"
                autoComplete="off"
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p className="text-purple text-sm">{errors.lastName.message}</p>
              )}
              <div className="text-[14px] leading-[17px]">Last Name</div>
            </div>
          </div>
          <div className="flex justify-between">
            <ChipButton onClick={() => history.push("/company-reg")}>
              Back
            </ChipButton>
            <ChipButton type={"submit"}>Next</ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyRegistrationNumber() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-registration-number", data)
      .then(() => {
        setLoading(false);
        history.push("/company-email");
      })
      .finally(() => reset());
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <input
              className={
                "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
              }
              {...register("companyRegistrationNumber", {
                required: "company registration number is required?",
              })}
              type="text"
              name="companyRegistrationNumber"
              autoComplete="off"
              aria-invalid={errors.companyRegistrationNumber ? "true" : "false"}
            />
            {errors.companyRegistrationNumber && (
              <p className="text-purple text-sm">
                {errors.companyRegistrationNumber.message}
              </p>
            )}
            <div className="text-[14px] leading-[17px]">
              Company Registration Number
            </div>
          </div>
          <div className="flex justify-between">
            <ChipButton onClick={() => history.push("/user-name")}>
              Back
            </ChipButton>
            <ChipButton type={"submit"}>Next</ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyEmail() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-info", data)
      .then(() => {
        setLoading(false);
        history.push("/otp");
      })
      .finally(() => reset());
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 w-full">
              <input
                className={
                  "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                }
                {...register("companyWebsite", {
                  required: "company website is required?",
                })}
                type="text"
                name="companyWebsite"
                autoComplete="off"
                aria-invalid={errors.companyWebsite ? "true" : "false"}
              />
              {errors.companyWebsite && (
                <p className="text-purple text-sm">
                  {errors.companyWebsite.message}
                </p>
              )}
              <div className="text-[14px] leading-[17px]">Company Website</div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <input
                className={
                  "rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none w-full"
                }
                {...register("companyEmail", {
                  required: "company email is required?",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email Address e.g johndoe@example.com",
                  },
                })}
                type="text"
                name="companyEmail"
                autoComplete="off"
                aria-invalid={errors.companyEmail ? "true" : "false"}
              />
              {errors.companyEmail && (
                <p className="text-purple text-sm">
                  {errors.companyEmail.message}
                </p>
              )}
              <div className="text-[14px] leading-[17px]">
                Company Email Address
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <ChipButton onClick={() => history.push("/company-reg-num")}>
              Back
            </ChipButton>
            <ChipButton type={"submit"}>Next</ChipButton>
          </div>
        </form>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyOtp() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox label={"Enter OTP"} subtitle={"Verify Email Address"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/mobile")}>Next</ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyMobileNumber() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox label={"Mobile Number"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/landline")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyLandLineNumber() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox label={"Landline Number"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/address")}>Next</ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyAddress() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <Textbox label={"Address Line 1"} />
          <Textbox label={"Address Line 2"} />
          <div className="w-6/12">
            <Textbox label={"City"} />
          </div>
          <div className="w-4/12">
            <Textbox label={"Post Code"} />
          </div>
          <Textbox label={"County"} />
        </div>

        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/practice-area")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyPracticeArea() {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const languages = [
    {
      area: "imigration",
      rate_type: "hour",
      rate: "3500",
      experience_type: "year",
      experience: "4",
    },
    {
      area: "Property",
      rate_type: "hour",
      rate: "4500",
      experience_type: "year",
      experience: "4",
    },

    {
      area: "Personal Injury",
      rate_type: "hour",
      rate: "3000",
      experience_type: "year",
      experience: "4",
    },

    {
      area: "Criminal Law",
      rate_type: "hour",
      rate: "3200",
      experience_type: "year",
      experience: "4",
    },

    {
      area: "Family Law",
      rate_type: "hour",
      rate: "3000",
      experience_type: "year",
      experience: "4",
    },

    {
      area: "Property Law",
      rate_type: "hour",
      rate: "2900",
      experience_type: "year",
      experience: "4",
    },

    {
      area: "imigration",
      rate_type: "hour",
      rate: "4000",
      experience_type: "year",
      experience: "4",
    },
  ];
  const [value, setValue] = useState([]);

  const submit = () => {
    setLoading(true);
    Instance.post("service-provider/practice-area", {
      practiceArea: value,
    })
      .then((res) => {
        console.log(res);
        history.push("/listing");
      })
      .finally(() => setLoading(false));
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4 w-full relative">
          <div className="flex gap-2 absolute -top-6 left-0">
            {value.length > 0 &&
              value.map((item) => (
                <div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer"
                  onClick={() =>
                    setValue((value) => value.filter((v) => v !== item))
                  }
                  key={item}
                >
                  {item.area}
                </div>
              ))}
          </div>
          <div
            className={
              "caret-transparent cursor-pointer rounded-none text-xs border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-xs focus:outline-none focus:ring-none h-0.5"
            }
          />
          <div className="absolute -top-1 right-0">
            <SelectIcon />
          </div>
          <div className="text-[14px] leading-4">Practice Area</div>
          <div className="flex flex-col gap-2 flex-wrap">
            {languages.map((item) => (
              <div className="flex gap-2">
                <div
                  className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer capitalize"
                  onClick={() =>
                    value.includes(item) ? value : setValue([item])
                  }
                  key={item}
                >
                  {item.area}
                </div>
                <div
                  className="bg-[#C9C9C9] px-3 py-0.5 text-p1 text-[#000] w-max rounded-[14px] cursor-pointer capitalize"
                  onClick={() =>
                    value.includes(item) ? value : setValue([item])
                  }
                  key={item}
                >
                  £{item.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <ChipButton onClick={() => submit()}>Next</ChipButton>
        </div>
      </div>
      <Loading open={loading} message={"Saving Info"} />
    </ServiceProviderRegistrationLayout>
  );
}
