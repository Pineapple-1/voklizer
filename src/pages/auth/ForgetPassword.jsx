import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

import AuthLayout from "./AuthLayout";
import {GeometricButton} from "../../components/GeometricButton";

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);

    history.push("/reset-pass");
  };

  return (
    <AuthLayout>
      <div className="flex justify-between flex-col gap-8 h-full">
        <div/>

        <div className="text-2xl leading-8 w-full text-center">
          Password Reset
        </div>

        <form
          className="flex justify-between flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              >
                Reset Password
              </GeometricButton>
            </div>
            <div className="w-full -ml-2">
              <GeometricButton
                type="button"
                variant="secondary"
                cut="left"
                width="100%"
                className="w-full"
                onClick={() => history.goBack()}
              >
                Cancel
              </GeometricButton>
            </div>
          </div>
        </form>
        <div/>
      </div>
    </AuthLayout>
  );
}

export default ForgetPassword;
