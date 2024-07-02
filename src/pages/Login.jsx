import Template from "../components/cors/Auth/Template"
import loginImg from "../assets/Images/login.webp";

function Login() {
  return (
    <div className="flex justify-center items-center
                    w-screen">
        <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        image={loginImg}
        formType="login"
      />
    </div>
  );
}

export default Login;
