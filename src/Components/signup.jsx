import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const navigator = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password);
      navigator("/home");
    } catch {
      setError("Failed to sign up");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center place-items-center bg-zinc-900">
      <div className="card bg-zinc-700 p-7 w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
        <h2 className="mb-8 text-3xl text-white font-bold text-center">
          Sign up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-fields flex sm:place-items-center flex-col sm:flex-row sm:justify-between mt-4">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              className="bg-zinc-500 p-1 text-white outline-none max-w-72 xl:w-72"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-fields flex sm:place-items-center flex-col sm:flex-row sm:justify-between mt-4">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="bg-zinc-500 p-1 text-white outline-none max-w-72 xl:w-72"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-fields flex sm:place-items-center flex-col sm:flex-row sm:justify-between mt-4 mb-4">
            <label className="text-white" htmlFor="password-confirm">
              Re-enter password
            </label>
            <input
              className="bg-zinc-500 p-1 text-white outline-none max-w-72 xl:w-72"
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <input
            className="text-white font-semibold p-2 cursor-pointer mt-4 w-full text-center bg-red-700"
            type="submit"
            value="Sign up"
          />
        </form>
        {error && (
          <p className="text-white font-semibold mt-2 text-center">{error}</p>
        )}

        <div className="mt-4 ml-auto w-fit text-white">
          Already have an account?{" "}
          <span
            className="text-red-700 cursor-pointer font-semibold hover:underline"
            onClick={() => navigator("/login")} // Navigate to the login page
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
