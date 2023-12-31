import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const LOGIN = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e, type) => {
    switch (type) {
      case "email":
        setError("");
        setFormData({ ...formData, email: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("UserName is empty");
        }
        break;
      case "pass":
        setError("");
        setFormData({ ...formData, password: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Password is empty");
        }
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      fetch("http://localhost/react-project/back-end/login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res[0]);
          if (res[0].error === true) {
            setError(res[0].result);
          } else {
            setMsg("Logged in successfully!! Redirecting...");
            localStorage.setItem("login", "true");
            localStorage.setItem("email", formData.email);
            setTimeout(() => {
              console.log("logging in");
              navget("/");
            }, 3000);
          }
        })
        .catch((err) => {
          setError(res[0].result);
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required!");
    }
  };

  return (
    <div className="login__div">
      {error !== "" ? (
        <div className="error__div">{error}</div>
      ) : (
        <div className="msg__div">{msg}</div>
      )}
      <form>
        <ul className="login__ul">
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={(e) => handleChange(e, "email")}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Enter Your Password"
              onChange={(e) => handleChange(e, "pass")}
            />
          </li>
          <button
            type="submit"
            onClick={handleSubmit}
            className="login__submit"
          >
            Login
          </button>
        </ul>
      </form>
    </div>
  );
};

export default LOGIN;
