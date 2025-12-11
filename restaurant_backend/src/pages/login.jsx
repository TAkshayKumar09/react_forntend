import "../style/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { CustomToast } from "../components/customToast";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "",
  });
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setlogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login.email.trim() == "" || login.password.trim() == "") {
      showToast("Please fill all fields!", "danger");
      return; // Stop
    }
    setLoading(true); // start spinner
    const form = new FormData();
    form.append("email", login.email);
    form.append("password", login.password);

    try {
      const res = await axios.post(
        "https://django-project-y3ss.onrender.com/login/",
        form
      );

      showToast("Login Successful!", "success");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error.response);
      showToast("Invalid Credentials!", "danger");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  return (
    <div>
      <CustomToast
        show={toast.show}
        message={toast.message}
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
      />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Login Here</legend>

            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />

            {/* <button type="submit">Login</button> */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </button>

            <a href="/register" className="creat-acc">
              <p> Don’t have an account?</p>{" "}
              <span className="create-acc">Create one</span>
            </a>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
