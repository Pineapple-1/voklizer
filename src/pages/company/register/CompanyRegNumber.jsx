import {useState} from "react";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import Loading from "../../../components/Loading";
import { GeometricButton } from "../../../components/GeometricButton";
import {useHistory, useLocation} from "react-router-dom";
import Instance from "../../../axios/Axios";
import {useForm} from "react-hook-form";
import useSWR from "swr";

function CompanyRegNumber() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  // Fetch user data
  const { data: userData } = useSWR("auth/me");

  // Get initial values for the form
  const getInitialValues = () => {
    if (isEditMode && userData?.data?.ServiceProvider) {
      return {
        companyRegistrationNumber: userData.data.ServiceProvider.companyRegistrationNumber || ""
      };
    }
    return {
      companyRegistrationNumber: ""
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: getInitialValues()
  });


  const onSubmit = (data) => {
    setLoading(true);
    Instance.post("service-provider/company-registration-number", data)
      .then(() => {
        setLoading(false);
        if (isEditMode) {
          history.replace("/edit-company-info");
        } else {
          history.push("/reg-email");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setLoading(false);
      })
      .finally(() => reset());
  };

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9 h-full justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 h-full justify-between">
          <div className="flex flex-col gap-3">
            <input
              className={
                "rounded-none text-base border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
              }
              {...register("companyRegistrationNumber", {
                required: "Company registration number is required",
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
            <div className="text-sm leading-[17px]">
              Company Registration Number
            </div>
          </div>
          <div className="flex">
            <GeometricButton
              type={"submit"}
              cut="right"
              width="100%"
              className="flex-1"
            >
              {isEditMode ? "Save" : "Next"}
            </GeometricButton>
            {isEditMode ? (
              <GeometricButton
                type={"button"}
                fillColor="#E5E7EB"
                textColor="#8532D8"
                cut="left"
                width="100%"
                className="flex-1"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); history.replace("/edit-company-info"); }}
              >
                Cancel
              </GeometricButton>
            ) : (
              <GeometricButton
                onClick={() => history.push("/reg-name")}
                cut="left"
                width="100%"
                className="flex-1"
              >
                Back
              </GeometricButton>
            )}
          </div>
        </form>
      </div>
      <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"}/>
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyRegNumber;
