import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="container">
      <div>
        <h1 className="h1">Welcome Back</h1>
        <p className="subtitle">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form_fieldBl">
          <label className="form_label">
            <span>Email</span>
          </label>
          <input
            type="email"
            className="form_field"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form_fieldBl">
          <label className="form_label">
            <span>Password</span>
          </label>
          <div className="form_fieldWrap">
            <input
              type={showPassword ? "text" : "password"}
              className="form_field"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash/>
              ) : (
                <FaEye/>
              )}
            </button>
          </div>
        </div>
        <button type="submit" className="btn form_btn" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <>
              Loading...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
      <div>
        <p>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;