import loadable from "@loadable/component";

export const ServiceProviderCompanyName = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyName
  )
);

export const ServiceProviderCompanyUser = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyUser
  )
);

export const ServiceProviderCompanyRegistrationNumber = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyRegistrationNumber
  )
);

export const ServiceProviderCompanyEmail = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyEmail
  )
);

export const ServiceProviderCompanyOtp = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyOtp
  )
);

export const ServiceProviderCompanyMobileNumber = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyMobileNumber
  )
);

export const ServiceProviderCompanyLandLineNumber = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyLandLineNumber
  )
);

export const ServiceProviderCompanyAddress = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyAddress
  )
);

export const ServiceProviderCompanyPracticeArea = loadable(() =>
  import("./pages/ServiceProviderRegestration").then(
    (mod) => mod.ServiceProviderCompanyPracticeArea
  )
);

export const Play = loadable(() => import("./pages/home/Play"));
export const SendSuccess = loadable(() => import("./pages/home/SendSuccess"));

export const QueryListing = loadable(() =>
  import("./pages/company/QueryListing")
);
export const PitchSuccess = loadable(() =>
  import("./pages/company/PitchSuccess")
);

export const Replies = loadable(() => import("./pages/voicebox/Replies"));
export const VokDiary = loadable(() => import("./pages/voicebox/VokDiary"));

export const Register = loadable(() => import("./pages/auth/Register"));
export const Selection = loadable(() => import("./pages/auth/Selection"));
export const Login = loadable(() => import("./pages/auth/Login"));
export const ForgetPass = loadable(() => import("./pages/auth/ForgetPassword"));
export const ResetPass = loadable(() => import("./pages/auth/ResetPassword"));
export const Locale = loadable(() => import("./pages/auth/Locale"));
