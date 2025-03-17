import React from "react";
import {useForm} from "react-hook-form";
import ServiceProviderRegistrationLayout from "../../../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../../../components/ChipButton";
import {useHistory} from "react-router-dom";
import Textbox from "../../../components/Textbox";

function CompanyAddress() {
  const history = useHistory();
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      postCode: "",
      county: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    history.push("/practice-area");
  };

  return (
    <ServiceProviderRegistrationLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <Textbox
            label={"Address Line 1"}
            {...register("addressLine1", {required: "Address Line 1 is required"})}
            subtitle={errors.addressLine1?.message}
          />

          <Textbox
            label={"Address Line 2"}
            {...register("addressLine2")}
          />

          <div className="w-6/12">
            <Textbox
              label={"City"}
              {...register("city", {required: "City is required"})}
              subtitle={errors.city?.message}
            />
          </div>

          <div className="w-4/12">
            <Textbox
              label={"Post Code"}
              {...register("postCode", {
                required: "Post Code is required"
              })}
              subtitle={errors.postCode?.message}
            />
          </div>

          <div className="w-4/12">
            <Textbox
              label={"County"}
              {...register("county", {required: "County is required"})}
              subtitle={errors.county?.message}
            />
          </div>

        </div>

        <div className="flex justify-between">
          <ChipButton
            type="button"
            onClick={() => history.push("/address")}
          >
            Back
          </ChipButton>

          <ChipButton type="submit">
            Next
          </ChipButton>
        </div>
      </form>
    </ServiceProviderRegistrationLayout>
  );
}

export default CompanyAddress;