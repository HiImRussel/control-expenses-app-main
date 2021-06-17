import LoginForm from "./LoginForm";
import "../css/Login.css";
import { Redirect } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/MainContext";

const Login = () => {
  const { loginData } = useContext(AppContext);
  return (
    <>
      {loginData.logged && <Redirect to="/panel" />}
      <section id="LoginSection">
        <section className="Login-Form">{<LoginForm />}</section>
        <div className="login-banner">
          <h1>Start saving money with us!</h1>
          <svg
            viewBox="0 0 374 375"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M330.172 242.285H319.215C313.159 242.285 308.258 237.384 308.258 231.328C308.258 225.272 313.159 220.371 319.215 220.371H330.172C342.252 220.371 352.086 210.538 352.086 198.457C352.086 192.604 349.807 187.104 345.666 182.963C341.386 178.683 341.386 171.749 345.666 167.469C349.946 163.189 356.88 163.189 361.16 167.469C369.442 175.751 374 186.751 374 198.457C374 222.629 354.344 242.285 330.172 242.285Z"
                fill="#E667A8"
              />
              <path
                d="M208.914 110.07H154.129C147.336 110.07 140.542 110.727 132.873 112.261C118.409 96.9211 97.7374 88.1562 76.6992 88.1562C70.5626 88.1562 65.7422 92.9766 65.7422 99.1133V149.15C52.5945 163.175 42.9523 180.048 37.6915 198.457H32.8711C14.6817 198.457 0 213.139 0 231.328V253.242C0 271.43 14.6817 286.113 32.8711 286.113C32.8711 286.113 40.3226 286.113 46.0188 286.113C53.4703 300.795 63.9883 314.455 76.6992 324.974C76.6992 339.656 76.6992 363.543 76.6992 363.543C76.6992 369.678 81.5196 374.5 87.6562 374.5H132.215C138.352 374.5 143.172 369.678 143.172 363.543V352.147C146.897 352.366 150.404 352.586 154.129 352.586H208.914V363.543C208.914 369.678 213.734 374.5 219.871 374.5H263.699C269.836 374.5 274.656 369.678 274.656 363.543V333.082C308.623 310.949 330.172 272.088 330.172 231.328C330.172 164.928 275.314 110.07 208.914 110.07Z"
                fill="#FFB3D9"
              />
              <path
                d="M330.172 231.328C330.172 272.088 308.623 310.948 274.656 333.082V363.543C274.656 369.678 269.836 374.5 263.699 374.5H219.871C213.734 374.5 208.914 369.678 208.914 363.543V352.586H187V110.07H208.914C275.314 110.07 330.172 164.928 330.172 231.328Z"
                fill="#FF99CC"
              />
              <path
                d="M87.5496 220.585C81.4933 220.585 76.475 215.578 76.475 209.521C76.475 203.465 81.4926 198.457 87.5496 198.457C93.6067 198.457 98.6133 203.464 98.6133 209.521C98.6133 215.577 93.6059 220.585 87.5496 220.585ZM98.3883 209.521H98.6023H98.3883ZM87.5496 209.521H87.7636H87.5496Z"
                fill="#5C5F66"
              />
              <path
                d="M187 110.07C156.793 110.07 132.215 85.4922 132.215 55.2852C132.215 25.0781 156.793 0.5 187 0.5C217.207 0.5 241.785 25.0781 241.785 55.2852C241.785 85.4922 217.207 110.07 187 110.07Z"
                fill="#F9BC35"
              />
              <path
                d="M230.828 176.543H143.172C137.116 176.543 132.215 171.642 132.215 165.586C132.215 159.53 137.116 154.629 143.172 154.629H230.828C236.884 154.629 241.785 159.53 241.785 165.586C241.785 171.642 236.884 176.543 230.828 176.543Z"
                fill="#5C5F66"
              />
              <path
                d="M230.828 154.629H187V176.543H230.828C236.884 176.543 241.785 171.642 241.785 165.586C241.785 159.53 236.884 154.629 230.828 154.629Z"
                fill="#53565C"
              />
              <path
                d="M241.785 55.2852C241.785 25.0781 217.207 0.5 187 0.5V110.07C217.207 110.07 241.785 85.4922 241.785 55.2852Z"
                fill="#F39E31"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="374"
                  height="374"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Login;
