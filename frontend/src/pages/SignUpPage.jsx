import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="container">
      <div>
        <h1 className="h1">Create Account</h1>
        <p className="subtitle">Get started with your free account</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_fieldBl">
          <label className="form_label">
            <span>Full Name</span>
          </label>
          <input
            type="text"
            className="form_field"
            placeholder="Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
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
              {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
            </button>
          </div>
        </div>
        <button type="submit" className="btn form_btn" disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      <div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;