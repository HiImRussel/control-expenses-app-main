import "../css/ExpireInfo.css";
import { useContext } from "react";
import { AppContext } from "../context/MainContext";

const ExpireInfo = ({ handler }) => {
  const { limit } = useContext(AppContext);

  return (
    <section id="expireInfo">
      <div>
        <h2 style={{ color: "#5feda9" }}>
          Time is ended! Your limit has been expired
        </h2>
        <h3>Basic info</h3>
        <h6>Start limit:</h6>
        <p>{parseFloat(limit.startValue)}</p>
        <h6>Money left:</h6>
        <p>{parseFloat(limit.limitValue)}</p>
        <h6>Target value</h6>
        <p>{parseFloat(limit.targetValue)}</p>
        <h6>You spend:</h6>
        <p>{parseFloat(limit.startValue) - parseFloat(limit.limitValue)}</p>
        <button id="closeExpire" onClick={handler}>
          OK
        </button>
      </div>
    </section>
  );
};

export default ExpireInfo;
