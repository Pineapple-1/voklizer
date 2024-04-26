import React from 'react'

function FormInput() {
  return (
    <div className="flex flex-col gap-1.5">
    <input
      className={clsx(
        "rounded-none border-[#000000] border-b-2 bg-[#00000000] py-2  placeholder:text-[#403E3E] focus:outline-none focus:ring-none ",
        errors.email &&
          "border-red-500 focus:border-red-500 focus:ring-red-500"
      )}
      placeholder="e.g johndoe@example.com"
      {...register("email", {
        required: "Email Address is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          message: "Invalid email address",
        },
      })}
      type="email"
      name="email"
      autoComplete="off"
      aria-invalid={errors.email ? "true" : "false"}
    />
    {errors.email && (
      <p className="text-red-500">Invalid email address.</p>
    )}
  </div>
  )
}

export default FormInput