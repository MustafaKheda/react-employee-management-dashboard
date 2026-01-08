import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login">
      <h2>Login</h2>
      <button
        onClick={() => {
          login();
          navigate("/dashboard");
        }}
      >
        Login
      </button>
    </div>
  );
}
