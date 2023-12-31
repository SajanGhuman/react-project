import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const ADDFL = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    notation: "",
    description: "",
  });

  const handleChange = (e, type) => {
    switch (type) {
      case "name":NP
        setError("");
        setFormData({ ...formData, name: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Name Is Empty");
        }
        break;
      case "notation":
        setError("");
        setFormData({ ...formData, notation: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Notation Is Empty");
        }
        break;
      case "description":
        setError("");
        setFormData({ ...formData, description: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Description Is Empty");
        }
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email !== "" &&
      formData.email !== "" &&
      formData.pass1 !== ""
    ) {
      fetch("http://localhost/react-project/back-end/addFl.php", {
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
          console.log(res);
          if (res.error === true) {
            setError("Validation Failed!! Try Again");
          } else {
            setMsg("Algorithm Added successfully!! Redirecting...");
            setTimeout(() => {
              navget("/");
            }, 3000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required");
    }
  };

  return (
    <div>
      {login === "false" ? (
        <div className="lr__div">
          <Link to="/login">
            <button className="login lr__button">LOGIN</button>
          </Link>
          <Link to="/register">
            <button className="register lr__button">REGISTER</button>
          </Link>
        </div>
      ) : (
        <div className="logout__div">
          <Logout onLogout={handleLogout} />
        </div>
      )}
      <nav>
        <ul className="nav__ul">
          <li>
            <Link to="/">
              <Cube />
            </Link>
          </li>
          <li>
            <Link to="/content">ALGORITHMS</Link>
          </li>
          <li>
            {login === "false" ? (
              <Link to="/needToLogin">DASHBOARD</Link>
            ) : (
              <Link to="/dashboard">DASHBOARD</Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="add__div">
        {msg !== "" ? (
          <span className="success">{msg}</span>
        ) : (
          <span className="error">{error}</span>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <ul className="add__ul">
            <li>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter alg Name"
                onChange={(e) => handleChange(e, "name")}
              />
            </li>
            <li>
              <label htmlFor="notation">Notation:</label>
              <input
                type="text"
                name="notation"
                id="notation"
                value={formData.notation}
                placeholder="Enter Alg Notation"
                onChange={(e) => handleChange(e, "notation")}
              />
            </li>
            <li>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                placeholder="Enter Alg description"
                onChange={(e) => handleChange(e, "description")}
              />
            </li>
            <button type="submit" className="add__submit">
              Add Algorithm
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ADDFL;
