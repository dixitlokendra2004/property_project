import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authServices";
import { Eye, EyeOff, LogIn } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password);
      console.log("Registration successful");
      // Redirect to login page with prefilled credentials
      navigate("/login", { state: { email, password } });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        {/* Centered Icon */}
        <div className="flex justify-center">
          <LogIn className="h-12 w-12 text-purple-600" />
        </div>

        <h2 className="text-center text-2xl font-bold">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 pr-10"
              />

              {/* Eye Icon Button */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        {/* Go Back to Login */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-purple-600 hover:underline"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
