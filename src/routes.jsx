import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Overview = lazy(() => import("./components/Overview"));
const UsersPage = lazy(() => import("./components/Users"));
const AuditLogs = lazy(() => import("./components/AuditLogs"));
const SubAdmin = lazy(() => import("./components/SubAdmin"));
const Properties = lazy(() => import("./components/Properties"));
const OfferEnquiry = lazy(() => import("./pages/Properties/OfferEnquiry"));
const OfferEnquiryDetails = lazy(() =>
  import("./pages/Properties/OfferEnquiryDetails")
);
const PropertyDetails = lazy(() =>
  import("./pages/Properties/PropertyDetails")
);
const AddProperty = lazy(() => import("./pages/Properties/AddProperty"));
const ContractsTable = lazy(() => import("./components/Contracts"));
const Banners = lazy(() => import("./components/Banners/Banners"));
const Social = lazy(() => import("./components/Banners/Social"));
const New = lazy(() => import("./components/Banners/New"));
const Chat = lazy(() => import("./components/Chat"));
const ToursScheduled = lazy(() =>
  import("./components/Properties/ToursScheduled")
);
const Subscriptions = lazy(() =>
  import("./components/Subscriptions/Subscribe")
);
const AddSubscribe = lazy(() =>
  import("./components/Subscriptions/AddSubscribe")
);
const Active = lazy(() => import("./components/Subscriptions/Active"));
const Earning = lazy(() => import("./components/Earning/Earning"));
const UserQuery = lazy(() => import("./components/UserQuery"));
const PromoCode = lazy(() => import("./components/PromoCode/PromoCode"));
const CreatePromo = lazy(() => import("./components/PromoCode/CreatePromo"));
const EditCode = lazy(() => import("./components/PromoCode/EditCode"));
const Review = lazy(() => import("./components/Review"));
const Terms = lazy(() => import("./components/Terms"));
const Privacy = lazy(() => import("./components/Privacy"));
const Push = lazy(() => import("./components/PushNotification/Push"));
const Support = lazy(() => import("./components/Support/Support"));
const NewUser = lazy(() => import("./components/NewUser"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));
const LoginPage = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Forgot = lazy(() => import("./components/Forgot/Forgot"));
const Otpverification = lazy(() =>
  import("./components/Forgot/Otpverification")
);
const NewPassword = lazy(() => import("./components/Forgot/NewPassword"));

// Authentication/public routes
export const authRoutes = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot", element: <Forgot /> },
  { path: "/forgot/otpverification", element: <Otpverification /> },
  { path: "/forgot/newpassword", element: <NewPassword /> },
];

export const routes = [
  { path: "", element: <Navigate to="/dashboard/home" /> },
  { path: "home", element: <Overview /> },
  { path: "users", element: <UsersPage /> },
  { path: "audit-logs", element: <AuditLogs /> },
  { path: "sub-admin", element: <SubAdmin /> },
  { path: "properties", element: <Properties /> },
  { path: "offer-enquiry", element: <OfferEnquiry /> },
  { path: "offer-enquiry/:id", element: <OfferEnquiryDetails /> },
  { path: "properties/add", element: <AddProperty /> },
  { path: "properties/:id", element: <PropertyDetails /> },
  { path: "contracts", element: <ContractsTable /> },
  { path: "tours-scheduled", element: <ToursScheduled /> },
  { path: "chat", element: <Chat /> },
  { path: "banners", element: <Banners /> },
  { path: "banners/social", element: <Social /> },
  { path: "banners/new", element: <New /> },
  { path: "subscribe", element: <Subscriptions /> },
  { path: "subscribe/addsubscribe", element: <AddSubscribe /> },
  { path: "subscribe/active", element: <Active /> },
  { path: "earning", element: <Earning /> },
  { path: "userquery", element: <UserQuery /> },
  { path: "promocode", element: <PromoCode /> },
  { path: "promocode/createpromo", element: <CreatePromo /> },
  { path: "promocode/editcode", element: <EditCode /> },
  { path: "review", element: <Review /> },
  { path: "terms", element: <Terms /> },
  { path: "privacy", element: <Privacy /> },
  { path: "push", element: <Push /> },
  { path: "support", element: <Support /> },
  { path: "users/newuser", element: <NewUser /> },
  { path: "users/:id", element: <UserDetails /> },
];

export default routes;
