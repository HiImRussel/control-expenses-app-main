import { useState, useContext } from "react";
import "../css/Login.css";
import { AppContext } from "../context/MainContext";
import Register from "./Register";

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isRegisterVisable, setIsRegisterVisable] = useState(false);

  const { handleChangeLoginData, setLimit } = useContext(AppContext);

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

  const clearForm = () => {
    setLoginValue("");
    setPasswordValue("");
    setLoginError(false);
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
          handleChangeLoginData({
            logged: true,
            userName: data.userName,
            userId: data.userId,
          });

          if (data.isLimitSet) {
            setLimit({
              isLimitSet: true,
              startValue: data.startValue,
              limitValue: data.limitValue,
              targetValue: data.targetValue,
              expireTime: data.expireTime,
            });
          }
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => console.log("error: ", error));
  };

  const handleRegisterVisibility = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    setIsRegisterVisable((prevValue) => !prevValue);
  };

  return (
    <>
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
          <p onClick={handleRegisterVisibility}>register</p>
        </form>
      </div>
      {isRegisterVisable && (
        <Register
          registerVisibility={handleRegisterVisibility}
          clearForm={clearForm}
        />
      )}
    </>
  );
};

export default LoginForm;
