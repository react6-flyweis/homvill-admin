import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-[26px] text-center text-[#000000] font-semibold mb-6">
        Welcome Back
      </h2>

      <LoginForm />
      <div className="flex flex-col items-center">
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

        <Button
          variant="outline"
          onClick={() => navigate("/signup")}
          className="w-[340px] border border-pink-300 text-primary h-12 rounded-lg font-medium hover:bg-pink-50"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
