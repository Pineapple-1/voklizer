import React from "react";
import ServiceProviderRegistrationLayout from "../layout/ServiceProviderRegistrationLayout";
import ChipButton from "../components/ChipButton";
import Textbox from "../components/Textbox";
import { useHistory } from "react-router-dom";
import FakeSelect from "../components/FakeSelect";

export function ServiceProviderCompanyName() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox lable={"Company Name"} />
        <div className="flex justify-end">
          <ChipButton onClick={() => history.push("/user-name")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyUser() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="grid grid-cols-2 gap-6">
          <Textbox lable={"First Name"} />
          <Textbox lable={"Last Name"} />
        </div>
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/company-reg-num")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyRegistrationNumber() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox lable={"Company Registration Number"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/company-email")}>
            Next
          </ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyEmail() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox lable={"Company Email Address"} />
        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => history.push("/otp")}>Next</ChipButton>
        </div>
      </div>
    </ServiceProviderRegistrationLayout>
  );
}

export function ServiceProviderCompanyOtp() {
  const history = useHistory();

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <Textbox lable={"Enter OTP"} subtitle={"Verify Email Address"} />
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
        <Textbox lable={"Mobile Number"} />
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
        <Textbox lable={"Landline Number"} />
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
          <Textbox lable={"Address Line 1"} />
          <Textbox lable={"Address Line 2"} />
          <div className="w-6/12">
            <Textbox lable={"City"} />
          </div>
          <div className="w-4/12">
            <Textbox lable={"Post Code"} />
          </div>
          <Textbox lable={"County"} />
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

  return (
    <ServiceProviderRegistrationLayout>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-5">
          <FakeSelect lable={"Practice Area"} />
        </div>

        <div className="flex justify-between">
          <ChipButton onClick={() => history.go(-1)}>Back</ChipButton>
          <ChipButton onClick={() => {}}>
            Next
          </ChipButton>
        </div>
      </div>     
    </ServiceProviderRegistrationLayout>
  );
}
