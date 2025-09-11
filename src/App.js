import React from "react";
import "./index.css";
import LoginPage from "./components/Login";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot/Forgot";
import Otpverification from "./components/Forgot/Otpverification";
import NewPassword from "./components/Forgot/NewPassword";
import AdminLayout from "./components/AdminLayout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Overview from "./components/Overview";
import UsersPage from "./components/Users";
import AuditLogs from "./components/AuditLogs";
import SubAdmin from "./components/SubAdmin";
import Properties from "./components/Properties";
import ContractsTable from "./components/Contracts";
import Banners from "./components/Banners/Banners";
import Social from "./components/Banners/Social";
import New from "./components/Banners/New";
import Chat from "./components/Chat";
import Subscriptions from "./components/Subscriptions/Subscribe";
import AddSubscribe from "./components/Subscriptions/AddSubscribe";
import Active from "./components/Subscriptions/Active";
import Earning from "./components/Earning/Earning";
import UserQuery from "./components/UserQuery";
import PromoCode from "./components/PromoCode/PromoCode";
import CreatePromo from "./components/PromoCode/CreatePromo";
import EditCode from "./components/PromoCode/EditCode";
import Review from "./components/Review";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Push from "./components/PushNotification/Push";
import Support from "./components/Support/Support";
import NewUser from "./components/NewUser";
const App = () => {
  return (
    <>
      {/* <LoginPage/> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/otp" element={<Otpverification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Navigate to="home" replace />} />

          <Route path="home" element={<Overview />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="sub-admin" element={<SubAdmin />} />
          <Route path="properties" element={<Properties />} />
          <Route path="contracts" element={<ContractsTable />} />
          <Route path="chat" element={<Chat />} />
          <Route path="banners" element={<Banners />} />
          <Route path="banners/social" element={<Social />} />
          <Route path="banners/new" element={<New />} />
          <Route path="subscribe" element={<Subscriptions />} />
          <Route path="subscribe/addsubscribe" element={<AddSubscribe />} />
          <Route path="subscribe/active" element={<Active />} />
          <Route path="earning" element={<Earning />} />
          <Route path="userquery" element={<UserQuery />} />
          <Route path="promocode" element={<PromoCode />} />
          <Route path="promocode/createpromo" element={<CreatePromo />} />
          <Route path="promocode/editcode" element={<EditCode />} />
          <Route path="review" element={<Review />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="push" element={<Push />} />
          <Route path="support" element={<Support />} />
          <Route path="users/newuser" element={<NewUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
