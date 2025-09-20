import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Overview = lazy(() => import("./components/Overview"));
const UsersPage = lazy(() => import("./pages/Users/Users"));
const AuditLogs = lazy(() => import("./components/AuditLogs"));
const SubAdmin = lazy(() => import("./pages/SubAdmin/SubAdmin"));
const SubAdminPermissions = lazy(() => import("./pages/SubAdmin/Permissions"));
const Properties = lazy(() => import("./pages/Properties/Properties"));
const OfferEnquiry = lazy(() => import("./pages/Properties/OfferEnquiry"));
const OfferEnquiryDetails = lazy(() =>
  import("./pages/Properties/OfferEnquiryDetails")
);
const PropertyDetails = lazy(() =>
  import("./pages/Properties/PropertyDetails")
);
const AddProperty = lazy(() => import("./pages/Properties/AddProperty"));
const ContractsTable = lazy(() => import("./pages/Contracts/Contracts"));
const ContractEnquiries = lazy(() =>
  import("./pages/Contracts/ContractEnquiries")
);
const ContractDetails = lazy(() => import("./pages/Contracts/ContractDetails"));
const Partners = lazy(() => import("./pages/Partners/Partners"));
const Banners = lazy(() => import("./components/Banners/Banners"));
const Social = lazy(() => import("./components/Banners/Social"));
const New = lazy(() => import("./components/Banners/New"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const ToursScheduled = lazy(() => import("./pages/Properties/ToursScheduled"));
const TourPropertyDetails = lazy(() =>
  import("./pages/Properties/TourPropertyDetails")
);
const Subscriptions = lazy(() =>
  import("./components/Subscriptions/Subscribe")
);
const AddSubscribe = lazy(() =>
  import("./components/Subscriptions/AddSubscribe")
);
const EditSubscribe = lazy(() =>
  import("./components/Subscriptions/EditSubscribe")
);
const Active = lazy(() => import("./components/Subscriptions/Active"));
const Earning = lazy(() => import("./pages/Earning/Earning"));
const TransactionHistory = lazy(() =>
  import("./pages/Earning/TransactionHistory")
);
const UserQuery = lazy(() => import("./pages/UserQuery/UserQuery"));
const PromoCode = lazy(() => import("./components/PromoCode/PromoCode"));
const CreatePromo = lazy(() => import("./components/PromoCode/CreatePromo"));
const EditCode = lazy(() => import("./components/PromoCode/EditCode"));
const Review = lazy(() => import("./components/Review"));
const Terms = lazy(() => import("./pages/Terms/Terms"));
const Privacy = lazy(() => import("./pages/Privacy/Privacy"));
const FAQ = lazy(() => import("./pages/Support/FAQ"));
const Push = lazy(() => import("./pages/PushNotification/Push"));
const CreatePushNotification = lazy(() =>
  import("./components/PushNotification/CreatePushNotification")
);
const Support = lazy(() => import("./components/Support/Support"));
const Contact = lazy(() => import("./pages/Support/Contact"));
const NewUser = lazy(() => import("./pages/Users/NewUser"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));
const LoginPage = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Forgot = lazy(() => import("./components/Forgot/Forgot"));
const Otpverification = lazy(() =>
  import("./components/Forgot/Otpverification")
);
const NewPassword = lazy(() => import("./components/Forgot/NewPassword"));
const ProfileDetails = lazy(() => import("./pages/Profile/ProfileDetails"));
const Settings = lazy(() => import("./pages/Settings/Settings"));

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
  { path: "sub-admin/permissions", element: <SubAdminPermissions /> },
  { path: "properties", element: <Properties /> },
  { path: "offer-enquiry", element: <OfferEnquiry /> },
  { path: "offer-enquiry/:id", element: <OfferEnquiryDetails /> },
  { path: "properties/add", element: <AddProperty /> },
  { path: "properties/:id", element: <PropertyDetails /> },
  { path: "contracts", element: <ContractsTable /> },
  { path: "contracts/enquiries", element: <ContractEnquiries /> },
  { path: "contracts/:id", element: <ContractDetails /> },
  { path: "partners", element: <Partners /> },
  { path: "tours-scheduled", element: <ToursScheduled /> },
  { path: "tours-scheduled/:id", element: <TourPropertyDetails /> },
  { path: "chat", element: <Chat /> },
  { path: "banners", element: <Banners /> },
  { path: "banners/social", element: <Social /> },
  { path: "banners/new", element: <New /> },
  { path: "subscribe", element: <Subscriptions /> },
  { path: "subscribe/addsubscribe", element: <AddSubscribe /> },
  { path: "subscribe/edit/:id", element: <EditSubscribe /> },
  { path: "subscribe/active", element: <Active /> },
  { path: "earning", element: <Earning /> },
  { path: "earning/transaction/:id", element: <TransactionHistory /> },
  { path: "userquery", element: <UserQuery /> },
  { path: "promocode", element: <PromoCode /> },
  { path: "promocode/createpromo", element: <CreatePromo /> },
  { path: "promocode/editcode", element: <EditCode /> },
  { path: "review", element: <Review /> },
  { path: "terms", element: <Terms /> },
  { path: "privacy", element: <Privacy /> },
  { path: "faq", element: <FAQ /> },
  { path: "push", element: <Push /> },
  { path: "push/create", element: <CreatePushNotification /> },
  { path: "support", element: <Support /> },
  { path: "contact", element: <Contact /> },
  { path: "users/newuser", element: <NewUser /> },
  { path: "users/:id", element: <UserDetails /> },
  { path: "profile", element: <ProfileDetails /> },
  { path: "settings", element: <Settings /> },
];

export default routes;
