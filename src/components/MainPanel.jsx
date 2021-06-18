import "../css/Panel.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/MainContext";
import { Redirect } from "react-router";
import Limits from "./Limits";
import SpendMoney from "./SpendMoney";
import Charts from "./Charts";
import ExpireInfo from "./ExpireInfo";
import Message from "./Message";

const MainPanel = () => {
  //panels visibility
  const [isLimitsVisable, setIsLimitsVisable] = useState(false);
  const [isSpendMoneyVisable, setIsSpendMoneyVisable] = useState(false);
  const [isChartsVisable, setIsChartsVisable] = useState(false);
  const [isExpiredVisable, setIsExpireVisabled] = useState(false);
  const [isMessageVisable, setIsMessageVisable] = useState(false);
  const [message, setMessage] = useState("");
  const {
    loginData,
    handleChangeLoginData,
    limit,
    setLimit,
    handleChangeExpenses,
  } = useContext(AppContext);

  const handleShowLimits = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    setIsLimitsVisable(true);
  };

  const handleShowSpendMoney = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    setIsSpendMoneyVisable(true);
  };

  const handleShowCharts = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    setIsChartsVisable(true);
  };

  const closeLimits = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    document.getElementById("limits").style.animation =
      "registerOut 0.3s ease-in-out";
    document.getElementById("limits").addEventListener("animationend", () => {
      setIsLimitsVisable(false);
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    });
  };

  const closeSpendMoney = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    document.getElementById("spend-money").style.animation =
      "registerOut 0.3s ease-in-out";
    document
      .getElementById("spend-money")
      .addEventListener("animationend", () => {
        setIsSpendMoneyVisable(false);
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
      });
  };

  const closeCharts = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    document.getElementById("charts").style.animation =
      "registerOut 0.3s ease-in-out";
    document.getElementById("charts").addEventListener("animationend", () => {
      setIsChartsVisable(false);
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    });
  };

  const closeExpire = () => {
    document.getElementById("expireInfo").style.opacity = 0;
    document
      .getElementById("expireInfo")
      .addEventListener("transitionend", () => {
        setIsExpireVisabled(false);
        if (limit.isLimitSet) {
          fetch("http://127.0.0.1:3030/delete-limit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loginData.userId }),
          })
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              } else {
                throw new Error("error");
              }
            })
            .then((data) => {
              if (data.deleted === true) {
                setLimit({
                  isLimitSet: false,
                });
                handleChangeExpenses({
                  status: "undefinied",
                  expenses: [],
                });

                setIsMessageVisable(true);
                setMessage("Deleted old limit!");
              } else {
                setIsMessageVisable(true);
                setMessage("Something went wrong!");
              }
            })
            .catch((error) => console.log("Error", error));
        } else {
          setIsMessageVisable(true);
          setMessage("You need to set limit first!");
        }
      });
  };

  const handleCloseMessage = () => {
    document.getElementById("deleted").style.opacity = 0;
    document.getElementById("deleted").addEventListener("transitionend", () => {
      document.getElementById("deleted").style.display = "none";
      setIsMessageVisable(false);
    });
  };

  const Logout = () => {
    handleChangeLoginData({
      logged: false,
    });
    setLimit({
      isLimitSet: false,
    });
    handleChangeExpenses({
      status: "undefinied",
      expenses: [],
    });
  };

  const nowDate = new Date();
  const expTime = new Date(limit.expireTime);
  nowDate.setHours(0, 0, 0, 0);
  expTime.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (nowDate.getTime() >= expTime.getTime()) {
      setIsExpireVisabled(true);
    }
  }, []);
  return (
    <>
      {loginData.logged || <Redirect to="/" />}
      <section id="panel">
        <button class="logOut" onClick={Logout}>
          Log out
        </button>
        <div id="userInfo">Hi {loginData.userName}!</div>
        {limit.isLimitSet && (
          <p className="limit">
            Money left:{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>
              {limit.limitValue - limit.targetValue}$
            </span>
          </p>
        )}
        <div id="action-boxes">
          <div className="action-box" onClick={handleShowLimits}>
            <p>Limits</p>
            <svg
              viewBox="0 0 404 404"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M205.156 162.547H228.828V115.203H205.156V67.8594V20.5156H0V67.8594V115.203H23.6719V162.547H0V209.891V257.234H23.6719V304.578H0V351.922H205.156V304.578H228.828V257.234H205.156V209.891V162.547Z"
                fill="#FFEA84"
              />
              <path
                d="M205.156 162.547H228.828V115.203H205.156V67.8594V20.5156H114.414V351.922H205.156V304.578H228.828V257.234H205.156V209.891V162.547Z"
                fill="#FFDC40"
              />
              <path
                d="M228.828 257.234H23.6719V304.578H228.828V257.234Z"
                fill="#FFDC40"
              />
              <path
                d="M205.156 162.547H0V209.891H205.156V162.547Z"
                fill="#FFDC40"
              />
              <path
                d="M205.156 67.8594H0V115.203H205.156V67.8594Z"
                fill="#FFDC40"
              />
              <path
                d="M205.156 162.547H114.414V209.891H205.156V162.547Z"
                fill="#FFAB15"
              />
              <path
                d="M205.156 67.8594H114.414V115.203H205.156V67.8594Z"
                fill="#FFAB15"
              />
              <path
                d="M228.828 257.234H114.414V304.578H228.828V257.234Z"
                fill="#FFAB15"
              />
              <path
                d="M289.586 383.484C226.498 383.484 175.172 332.158 175.172 269.07C175.172 205.982 226.498 154.656 289.586 154.656C352.674 154.656 404 205.982 404 269.07C404 332.158 352.674 383.484 289.586 383.484Z"
                fill="#76CC5B"
              />
              <path
                d="M289.586 154.656V383.484C352.674 383.484 404 332.158 404 269.07C404 205.982 352.674 154.656 289.586 154.656Z"
                fill="#599944"
              />
              <path
                d="M325.094 292.742C325.094 273.163 309.165 257.234 289.586 257.234C283.06 257.234 277.75 251.925 277.75 245.398C277.75 242.754 278.601 240.255 280.211 238.172C282.714 234.934 286.98 233.31 291.335 233.933L315.53 237.389L318.877 213.954L301.422 211.462V198.055H277.75V212.109C271.374 214.305 265.68 218.264 261.482 223.694C256.639 229.96 254.078 237.466 254.078 245.398C254.078 264.977 270.007 280.906 289.586 280.906C296.112 280.906 301.422 286.216 301.422 292.742C301.422 298.663 297.009 303.707 291.159 304.476C290.567 304.554 289.824 304.555 288.95 304.479L262.98 302.254L260.958 325.839L277.75 327.279V340.086H301.422V326.214C315.316 321.289 325.094 307.986 325.094 292.742Z"
                fill="#F2F2F4"
              />
              <path
                d="M289.586 198.055V233.805C290.164 233.809 290.748 233.848 291.335 233.932L315.53 237.388L318.877 213.953L301.422 211.462V198.055H289.586Z"
                fill="#DFDFE1"
              />
              <path
                d="M289.586 257.234V280.906C296.112 280.906 301.422 286.216 301.422 292.742C301.422 298.663 297.009 303.707 291.159 304.476C290.716 304.534 290.189 304.549 289.586 304.522V340.086H301.422V326.214C315.316 321.289 325.094 307.986 325.094 292.742C325.094 273.163 309.165 257.234 289.586 257.234Z"
                fill="#DFDFE1"
              />
            </svg>
          </div>
          <div className="action-box" onClick={handleShowSpendMoney}>
            <p>Spend Money</p>
            <svg
              viewBox="0 0 404 404"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M202 404C313.562 404 404 313.562 404 202C404 90.4385 313.562 0 202 0C90.4385 0 0 90.4385 0 202C0 313.562 90.4385 404 202 404Z"
                fill="#FED402"
              />
              <path
                d="M277.739 300.262H89.9539C75.9046 300.262 64.5153 288.873 64.5153 274.823C64.5153 260.774 75.9046 249.385 89.9539 249.385H277.739C291.788 249.385 303.178 260.774 303.178 274.823C303.178 288.873 291.788 300.262 277.739 300.262Z"
                fill="#0091C8"
              />
              <path
                d="M296.3 145.062L309.391 131.971L322.483 145.062L335.574 131.971L336.291 132.688V69.7665C336.291 52.4853 322.282 38.4755 305 38.4755H215.844V147.233H267.946L283.209 131.97L296.3 145.062Z"
                fill="#AFE6FF"
              />
              <path
                d="M267.946 147.234L283.209 131.971L291.281 140.043V69.7665C291.281 55.5366 300.783 43.5334 313.786 39.7348C310.997 38.9205 308.051 38.4755 304.999 38.4755H215.844V147.233H267.946V147.234Z"
                fill="#94DEFF"
              />
              <path
                d="M271.886 283.692H95.5444C90.9923 283.692 87.3019 280.002 87.3019 275.45C87.3019 270.898 90.9923 267.207 95.5444 267.207H271.887C276.439 267.207 280.13 270.898 280.13 275.45C280.129 280.002 276.439 283.692 271.886 283.692Z"
                fill="#0073AA"
              />
              <path
                d="M303.178 38.4755H126.835C109.553 38.4755 95.5436 52.4845 95.5436 69.7665V275.45H271.886V69.7665C271.886 52.4853 285.896 38.4755 303.178 38.4755Z"
                fill="white"
              />
              <path
                d="M152.048 38.4755H126.835C109.553 38.4755 95.5436 52.4845 95.5436 69.7665V275.45H120.757V69.7665C120.757 52.4853 134.766 38.4755 152.048 38.4755Z"
                fill="#E1FAFF"
              />
              <path
                d="M120.757 92.2974H192.585V108.82H120.757V92.2974Z"
                fill="#6EE1FF"
              />
              <path
                d="M221.988 92.2974H247.217V108.82H221.988V92.2974Z"
                fill="#FE646F"
              />
              <path
                d="M120.757 137.386H192.585V153.908H120.757V137.386Z"
                fill="#6EE1FF"
              />
              <path
                d="M221.988 137.386H247.217V153.908H221.988V137.386Z"
                fill="#FE646F"
              />
              <path
                d="M120.757 183.851H192.585V200.373H120.757V183.851Z"
                fill="#6EE1FF"
              />
              <path
                d="M221.988 183.851H247.217V200.373H221.988V183.851Z"
                fill="#FE646F"
              />
              <path
                d="M136.923 243.116H348.772V345.585H136.923V243.116Z"
                fill="#5D913F"
              />
              <path
                d="M336.404 255.483V333.218H149.29V255.483H336.404ZM348.772 243.116H136.923V345.585H348.772V243.116Z"
                fill="#3D772A"
              />
              <path
                d="M136.923 272.233C140.305 274.598 144.417 275.989 148.857 275.989C160.378 275.989 169.717 266.65 169.717 255.129C169.717 250.654 168.304 246.513 165.905 243.116H136.922V272.233H136.923Z"
                fill="#3D772A"
              />
              <path
                d="M148.857 313.026C144.417 313.026 140.305 314.417 136.923 316.782V345.586H166.128C168.393 342.249 169.717 338.222 169.717 333.886C169.717 322.365 160.378 313.026 148.857 313.026Z"
                fill="#3D772A"
              />
              <path
                d="M313.722 255.129C313.722 266.65 323.061 275.989 334.581 275.989C340.063 275.989 345.049 273.871 348.772 270.413V243.116H317.534C315.135 246.513 313.722 250.655 313.722 255.129Z"
                fill="#3D772A"
              />
              <path
                d="M348.772 318.601C345.049 315.143 340.064 313.025 334.581 313.025C323.061 313.025 313.722 322.364 313.722 333.885C313.722 338.221 315.046 342.248 317.31 345.584H348.772V318.601Z"
                fill="#3D772A"
              />
              <path
                d="M242.847 329.173C262.08 329.173 277.67 313.583 277.67 294.35C277.67 275.118 262.08 259.527 242.847 259.527C223.615 259.527 208.025 275.118 208.025 294.35C208.025 313.583 223.615 329.173 242.847 329.173Z"
                fill="#3D772A"
              />
              <path
                d="M158.144 287.755H198.156V300.946H158.144V287.755Z"
                fill="#6EAA50"
              />
              <path
                d="M287.589 287.755H327.601V300.946H287.589V287.755Z"
                fill="#6EAA50"
              />
              <path
                d="M240.503 312.882C236.794 312.769 233.758 312.093 230.836 310.745V302.37L236.401 301.976V305.236C236.401 306.248 236.569 306.642 237.524 306.979C238.311 307.26 239.379 307.428 240.503 307.428V296.916C235.332 295.511 230.667 293.319 230.667 286.8C230.667 281.179 234.545 277.413 240.503 276.57V271.399H244.719V276.458C247.755 276.626 250.676 277.301 253.432 278.593V286.517L247.923 286.855V283.82C247.923 282.808 247.755 282.414 246.799 282.077C246.18 281.909 245.451 281.74 244.719 281.684V291.575H244.776C249.722 293.093 254.892 295.285 254.892 302.087C254.892 308.157 250.676 311.811 244.719 312.71V318.499H240.503V312.882ZM240.503 290.116V282.023C238.705 282.642 237.58 283.933 237.58 286.182C237.581 288.206 238.705 289.274 240.503 290.116ZM244.719 298.267V307.035C246.631 306.417 247.923 305.011 247.923 302.37C247.923 300.234 246.631 299.054 244.719 298.267Z"
                fill="#6EAA50"
              />
              <path
                d="M164.771 270.2H376.621V372.669H164.771V270.2Z"
                fill="#97D729"
              />
              <path
                d="M364.253 282.568V360.302H177.138V282.568H364.253ZM376.621 270.2H164.771V372.669H376.621V270.2Z"
                fill="#6EAA50"
              />
              <path
                d="M164.771 299.317C168.153 301.682 172.266 303.073 176.706 303.073C188.226 303.073 197.565 293.734 197.565 282.214C197.565 277.739 196.152 273.597 193.754 270.2H164.77V299.317H164.771Z"
                fill="#6EAA50"
              />
              <path
                d="M176.706 340.11C172.266 340.11 168.153 341.501 164.771 343.866V372.669H193.977C196.241 369.332 197.565 365.306 197.565 360.97C197.565 349.449 188.226 340.11 176.706 340.11Z"
                fill="#6EAA50"
              />
              <path
                d="M341.57 282.214C341.57 293.734 350.91 303.073 362.43 303.073C367.911 303.073 372.898 300.955 376.62 297.497V270.2H345.382C342.983 273.597 341.57 277.739 341.57 282.214Z"
                fill="#6EAA50"
              />
              <path
                d="M376.62 345.686C372.898 342.227 367.912 340.11 362.43 340.11C350.91 340.11 341.57 349.449 341.57 360.969C341.57 365.306 342.894 369.332 345.159 372.669H376.62V345.686Z"
                fill="#6EAA50"
              />
              <path
                d="M270.696 356.258C289.928 356.258 305.519 340.667 305.519 321.435C305.519 302.203 289.928 286.612 270.696 286.612C251.464 286.612 235.873 302.203 235.873 321.435C235.873 340.667 251.464 356.258 270.696 356.258Z"
                fill="#6EAA50"
              />
              <path
                d="M185.992 314.839H226.004V328.031H185.992V314.839Z"
                fill="#8BC727"
              />
              <path
                d="M315.437 314.839H355.449V328.031H315.437V314.839Z"
                fill="#8BC727"
              />
              <path
                d="M268.351 339.965C264.642 339.852 261.607 339.177 258.685 337.828V329.453L264.249 329.06V332.32C264.249 333.331 264.417 333.725 265.373 334.062C266.159 334.344 267.228 334.512 268.351 334.512V324C263.181 322.595 258.516 320.403 258.516 313.883C258.516 308.262 262.393 304.497 268.351 303.653V298.483H272.567V303.541C275.603 303.709 278.525 304.385 281.28 305.676V313.601L275.771 313.939V310.903C275.771 309.892 275.603 309.498 274.647 309.161C274.029 308.993 273.299 308.823 272.567 308.767V318.659H272.624C277.57 320.177 282.741 322.369 282.741 329.171C282.741 335.24 278.525 338.894 272.567 339.793V345.582H268.351V339.965ZM268.351 317.2V309.107C266.553 309.726 265.429 311.018 265.429 313.266C265.429 315.29 266.552 316.358 268.351 317.2ZM272.567 325.351V334.119C274.479 333.5 275.771 332.095 275.771 329.453C275.771 327.318 274.479 326.138 272.567 325.351Z"
                fill="#97D729"
              />
              <path
                d="M75.2269 398.191C99.6061 398.191 119.369 378.428 119.369 354.048C119.369 329.669 99.6061 309.906 75.2269 309.906C50.8476 309.906 31.0843 329.669 31.0843 354.048C31.0843 378.428 50.8476 398.191 75.2269 398.191Z"
                fill="#FEE45A"
              />
              <path
                d="M75.2269 325.2C93.5655 325.2 108.613 339.257 110.2 357.184C110.291 356.151 110.346 355.106 110.346 354.048C110.346 334.652 94.6228 318.929 75.2269 318.929C55.8309 318.929 40.1073 334.652 40.1073 354.048C40.1073 355.106 40.1625 356.15 40.254 357.184C41.8408 339.257 56.8883 325.2 75.2269 325.2Z"
                fill="#FFD23C"
              />
              <path
                d="M75.2269 319.312C94.3806 319.312 109.963 334.895 109.963 354.048C109.963 373.202 94.3806 388.785 75.2269 388.785C56.0732 388.785 40.4907 373.202 40.4907 354.048C40.4907 334.895 56.0732 319.312 75.2269 319.312ZM75.2269 309.906C50.8472 309.906 31.0843 329.67 31.0843 354.048C31.0843 378.427 50.848 398.191 75.2269 398.191C99.6057 398.191 119.369 378.427 119.369 354.048C119.369 329.669 99.6065 309.906 75.2269 309.906Z"
                fill="#FAF58C"
              />
              <path
                d="M72.2553 377.538C67.5532 377.394 63.7058 376.539 60.0011 374.829V364.213L67.0545 363.714V367.848C67.0545 369.13 67.2684 369.629 68.4788 370.056C69.4762 370.413 70.8302 370.627 72.2553 370.627V357.302C65.7005 355.52 59.7873 352.742 59.7873 344.477C59.7873 337.352 64.7023 332.578 72.2553 331.509V324.954H77.5996V331.367C81.447 331.581 85.1517 332.436 88.6441 334.074V344.12L81.6609 344.548V340.701C81.6609 339.418 81.447 338.919 80.2366 338.492C79.4531 338.278 78.5267 338.064 77.5996 337.993V350.533H77.6714C83.9413 352.458 90.496 355.237 90.496 363.858C90.496 371.552 85.1517 376.184 77.5996 377.323V384.662H72.2553V377.538ZM72.2553 348.68V338.421C69.9749 339.205 68.5506 340.843 68.5506 343.694C68.5506 346.259 69.9757 347.613 72.2553 348.68ZM77.5996 359.013V370.128C80.0228 369.344 81.6609 367.563 81.6609 364.214C81.6609 361.507 80.0228 360.011 77.5996 359.013Z"
                fill="#FFD23C"
              />
            </svg>
          </div>
          <div className="action-box" onClick={handleShowCharts}>
            <p>Charts</p>
            <svg
              viewBox="0 0 404 404"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M397.268 380.397H6.81442C3.09669 380.397 0.0824585 377.383 0.0824585 373.665C0.0824585 369.947 3.09669 366.933 6.81442 366.933H390.536V57.2628C390.536 53.5451 393.55 50.5309 397.268 50.5309C400.986 50.5309 404 53.5451 404 57.2628V373.665C404 377.383 400.987 380.397 397.268 380.397Z"
                  fill="white"
                />
                <path
                  d="M40.4742 198.634H121.258V346.737H40.4742V198.634Z"
                  fill="#FDBD40"
                />
                <path
                  d="M161.649 117.85H242.433V346.737H161.649V117.85Z"
                  fill="#E9686A"
                />
                <path
                  d="M282.825 50.5309H363.608V346.737H282.825V50.5309Z"
                  fill="#238892"
                />
                <path
                  d="M141.454 30.3351L163.622 52.5035L107.794 108.332L92.3574 92.8952C89.7286 90.2672 85.4672 90.2672 82.8384 92.8952L2.05491 173.679C-0.619356 176.261 -0.693407 180.523 1.88914 183.198C4.47169 185.872 8.73386 185.946 11.4081 183.363C11.4645 183.31 11.5192 183.254 11.5739 183.198L87.5979 107.174L103.034 122.61C105.663 125.238 109.924 125.238 112.553 122.61L173.141 62.0224L195.309 84.1908L202.041 23.6031L141.454 30.3351Z"
                  fill="#E9686A"
                />
                <path
                  d="M67.4021 326.541C63.6843 326.541 60.6701 323.527 60.6701 319.809V306.345C60.6701 302.628 63.6843 299.613 67.4021 299.613C71.1198 299.613 74.134 302.628 74.134 306.345V319.809C74.134 323.527 71.1206 326.541 67.4021 326.541Z"
                  fill="white"
                />
                <path
                  d="M67.4021 286.149C63.6843 286.149 60.6701 283.135 60.6701 279.417V252.49C60.6701 248.772 63.6843 245.758 67.4021 245.758C71.1198 245.758 74.134 248.772 74.134 252.49V279.417C74.134 283.135 71.1206 286.149 67.4021 286.149Z"
                  fill="white"
                />
                <path
                  d="M188.577 326.541C184.86 326.541 181.845 323.527 181.845 319.809V306.345C181.845 302.628 184.86 299.613 188.577 299.613C192.295 299.613 195.309 302.628 195.309 306.345V319.809C195.309 323.527 192.296 326.541 188.577 326.541Z"
                  fill="white"
                />
                <path
                  d="M188.577 286.149C184.86 286.149 181.845 283.135 181.845 279.418V212.098C181.845 208.38 184.86 205.366 188.577 205.366C192.295 205.366 195.309 208.38 195.309 212.098V279.418C195.309 283.135 192.296 286.149 188.577 286.149Z"
                  fill="white"
                />
                <path
                  d="M309.753 326.541C306.035 326.541 303.021 323.527 303.021 319.809V306.345C303.021 302.628 306.035 299.613 309.753 299.613C313.47 299.613 316.485 302.628 316.485 306.345V319.809C316.485 323.527 313.471 326.541 309.753 326.541Z"
                  fill="white"
                />
                <path
                  d="M309.753 286.149C306.035 286.149 303.021 283.135 303.021 279.418V144.778C303.021 141.061 306.035 138.046 309.753 138.046C313.47 138.046 316.485 141.061 316.485 144.778V279.418C316.485 283.135 313.471 286.149 309.753 286.149Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="404" height="404" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </section>
      {isLimitsVisable && <Limits handler={closeLimits} />}
      {isSpendMoneyVisable && <SpendMoney handler={closeSpendMoney} />}
      {isChartsVisable && <Charts handler={closeCharts} />}
      {isExpiredVisable && <ExpireInfo handler={closeExpire} />}
      {isMessageVisable && (
        <Message handler={handleCloseMessage} message={message} />
      )}
    </>
  );
};

export default MainPanel;
