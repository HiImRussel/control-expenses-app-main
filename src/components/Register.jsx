import { useState } from "react";

import "../css/Register.css";

const Register = ({ registerVisibility, clearForm }) => {
  const [loginValue, setLoginValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [registerError, setRegisterError] = useState(false);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "userName":
        setUserNameValue(e.target.value);
        break;
      case "login":
        setLoginValue(e.target.value);
        break;
      case "password":
        setPasswordValue(e.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (
      loginValue.length > 0 &&
      userNameValue.length > 0 &&
      passwordValue.length > 0
    ) {
      fetch("http://127.0.0.1:3030/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameValue,
          login: loginValue,
          password: passwordValue,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Error");
          }
        })
        .then((data) => {
          if (data.status === "ok") {
            document.getElementById("register").style.opacity = 0;
            clearForm();
            document
              .getElementById("register")
              .addEventListener("transitionend", () => {
                registerVisibility();
              });
          } else {
            setRegisterError(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCloseRegister = () => {
    document.getElementById("register").style.opacity = 0;
    clearForm();
    document
      .getElementById("register")
      .addEventListener("transitionend", () => {
        registerVisibility();
      });
  };

  return (
    <section id="register">
      <button className="closeButton" onClick={handleCloseRegister}>
        X
      </button>
      <form onSubmit={handleSubmitRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="userName"
          placeholder="User name"
          value={userNameValue}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={loginValue}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={passwordValue}
          onChange={handleChange}
        />
        <br />
        {registerError && (
          <p style={{ color: "red", marginTop: "10px" }}>
            User with this login allready exist!
          </p>
        )}
        <button>Register</button>
      </form>
    </section>
  );
};

export default Register;
