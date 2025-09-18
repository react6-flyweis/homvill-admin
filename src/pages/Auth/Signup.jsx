import SignupForm from "@/components/Auth/SignupForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-[26px] text-center text-[#000000] font-semibold mb-6">
        Register Here
      </h2>

      {/* Signup form component */}
      <SignupForm />

      {/* Divider */}
      <div className="flex items-center my-6 w-full">
        <div className="flex-1 flex items-center">
          <div className="size-1 bg-gray-300 rotate-45" />
          <hr className="flex-1 border-gray-300" />
        </div>
        <span className="mx-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <div className="size-1 bg-gray-300 rotate-45" />
        </div>
      </div>

      {/* Register */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="w-[340px] border border-pink-300 text-[#a70f3a] py-2 rounded-lg font-medium hover:bg-pink-50"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
