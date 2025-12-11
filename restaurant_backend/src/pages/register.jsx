import "../style/register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { CustomToast } from "../components/customToast";

export const Register = () => {
  const [loading, setloading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "",
  });

  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true); // start spinner

    const form = new FormData();
    form.append("name", formdata.name);
    form.append("email", formdata.email);
    form.append("mobile", formdata.mobile);
    form.append("password", formdata.password);

    try {
      const res = await axios.post(
        "https://django-project-y3ss.onrender.com/register/",
        form
      );

      showToast("Account Created Successfully!!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error.response);
      showToast("Unable to Register!", "danger");
    } finally {
      setloading(false); // stop spinner
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
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Sign up</legend>

            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formdata.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formdata.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Enter your Mobile"
              maxLength={10}
              value={formdata.mobile}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formdata.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Create account"
              )}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
