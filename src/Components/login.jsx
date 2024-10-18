import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../contexts/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigator("/home");
    } catch {
      setError("Incorrect Password or Email");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center place-items-center bg-zinc-900">
      <div className="card bg-zinc-700 p-7 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:max-w-md">
        <h2 className="mb-8 text-3xl text-white font-bold text-center">
          Login
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
              onChange={(e) => setEmail(e.target.value)} // Update email state
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
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>

          <input
            className="text-white font-semibold p-2 cursor-pointer mt-4 w-full text-center bg-red-700"
            type="submit"
            value="Login"
          />
        </form>
        {error && (
          <p className="text-white font-semibold mt-2 text-center">{error}</p>
        )}
        <div className="mt-4 ml-auto w-fit text-white">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-red-700 cursor-pointer font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
