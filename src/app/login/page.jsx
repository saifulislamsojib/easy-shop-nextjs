import LoginSvg from "@/components/LoginSvg";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login - Easy Shop",
};

const LoginPage = () => {
  return (
    <div className="hero bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row justify-between w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <p className="pt-6 text-center">Login now to connect with us.</p>
          <LoginSvg />
        </div>
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
