import { useState, useContext } from "react";
import "../css/Login.css";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../context/MainContext";

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginError, setLoginError] = useState(false);

  const { loginData, handleChangeLoginData } = useContext(AppContext);

  const handleChangeInput = (e) => {
    switch (e.target.name) {
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

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: loginValue, password: passwordValue }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        if (data.logged) {
          handleChangeLoginData(data);
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => console.log("error: ", error));
  };

  return (
    <div className="form-bg">
      <form id="login-form" onSubmit={handleSubmitLogin}>
        <h2>Login</h2>
        <input
          type="text"
          name="login"
          value={loginValue}
          onChange={handleChangeInput}
          placeholder="Login"
        />
        <br />
        <input
          type="password"
          name="password"
          value={passwordValue}
          onChange={handleChangeInput}
          placeholder="Password"
        />
        <br />
        {loginError && (
          <p style={{ color: "red", marginTop: "20px" }}>
            Nieprawidłowe dane logowania!
          </p>
        )}
        <button>Login</button>
        <p>or</p>
        <Link to="/register">
          <p>register</p>
        </Link>
      </form>
      {loginData.logged && <Redirect to="/panel" />}
    </div>
  );
};

export default LoginForm;
