import loadable from "@loadable/component";

export const ServiceProviderPreferredLanguage = loadable(() =>
  import("./pages/company/register/PreferredLanguage")
);
export const ServiceProviderName = loadable(() =>
  import("./pages/company/register/CompanyName")
);
export const ServiceProviderRegistrationNumber = loadable(() =>
  import("./pages/company/register/CompanyRegNumber")
);

export const ServiceProviderEmailWebsite = loadable(() =>
  import("./pages/company/register/CompanyEmailWebsite")
);

export const ServiceProviderOtp = loadable(() =>
  import("./pages/company/register/Otp")
);

export const ServiceProviderLandLineNumber = loadable(() =>
  import("./pages/company/register/LandlineNumber")
);

export const ServiceProviderAddress = loadable(() =>
  import("./pages/company/register/CompanyAddress")
);

export const ServiceProviderPracticeArea = loadable(() =>
  import("./pages/company/register/PracticeArea")
);

export const ServiceProviderVideo = loadable(() =>
  import("./pages/company/register/VideoAdd")
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
export const Queries = loadable(() => import("./pages/voicebox/AllQueries"));

export const Register = loadable(() => import("./pages/auth/Register"));
export const Selection = loadable(() => import("./pages/auth/Selection"));
export const Login = loadable(() => import("./pages/auth/Login"));
export const ForgetPass = loadable(() => import("./pages/auth/ForgetPassword"));
export const ResetPass = loadable(() => import("./pages/auth/ResetPassword"));
export const Locale = loadable(() => import("./pages/auth/Locale"));
