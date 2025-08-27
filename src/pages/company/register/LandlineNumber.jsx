import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import { useHistory, useLocation } from "react-router-dom";
import Textbox from "../../../components/Textbox";
import {GeometricButton} from "../../../components/GeometricButton";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Loading from "../../../components/Loading";
import Instance from "../../../axios/Axios";
import useSWR from "swr";

function LandlineNumber() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Check if we're in edit mode
  const isEditMode = new URLSearchParams(location.search).get("edit") === "true";

  const {data: userData} = useSWR("auth/me");

  // Get initial values for the form
  const getInitialValues = () => {
    if (isEditMode && userData?.data?.ServiceProvider) {
      return {
        landlineNumber: userData.data.ServiceProvider.landlineNumber || ""
      };
    }
    return {
      landlineNumber: ""
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
    Instance.post("service-provider/landline-number", data)
      .then(() => {
        setLoading(false);
        if (isEditMode) {
          history.replace("/edit-company-info");
        } else {
          history.push("/address");
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 h-full justify-between">
        <div className="flex flex-col gap-3">
          <input
            className={
              "rounded-none text-base border-purple border-b-2 bg-transparent py-1.5 placeholder:text-black placeholder:text-base focus:outline-none focus:ring-none w-full"
            }
            {...register("landlineNumber", {
              required: "Landline number is required",
            })}
            type="text"
            name="landlineNumber"
            autoComplete="off"
            aria-invalid={errors.landlineNumber ? "true" : "false"}
          />
          {errors.landlineNumber && (
            <p className="text-purple text-sm">
              {errors.landlineNumber.message}
            </p>
          )}
          <div className="text-sm leading-[17px]">Landline Number</div>
        </div>
        <div className="flex">
          <GeometricButton
            type="submit"
            cut="right"
            width="100%"
            className="flex-1"
            disabled={loading}
          >
            {isEditMode ? "Save" : "Next"}
          </GeometricButton>
          {isEditMode ? (
            <GeometricButton
              type="button"
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
              onClick={() => history.push("/otp")}
              cut="left"
              width="100%"
              className="flex-1"
            >
              Back
            </GeometricButton>
          )}
        </div>
      </form>
      <Loading open={loading} message={isEditMode ? "Updating Info" : "Saving Info"}/>
    </ServiceProviderRegistrationLayout>
  );
}

export default LandlineNumber;
