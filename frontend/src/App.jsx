
import { useState } from "react";
import api from "./api";
import Dashboard from "./Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    organization_name: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isLogin ? "login/" : "register/";

      const payload = isLogin
        ? {
            username: formData.username,
            password: formData.password,
          }
        : formData;

      const response = await api.post(endpoint, payload);

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        "Something went wrong. Please try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMessage("");
    setFormData({
      username: "",
      email: "",
      password: "",
      organization_name: "",
    });
  };

  if (isAuthenticated) {
    return (
      <div>
        <Dashboard />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>StockFlow</h1>
      <h2>Inventory Management System</h2>

      <h3>{isLogin ? "Login" : "Register"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {!isLogin && (
          <>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              name="organization_name"
              placeholder="Organization Name"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p>{message}</p>

      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
      >
        {isLogin
          ? "Create a new account"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default App;
