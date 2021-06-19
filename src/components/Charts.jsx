import "../css/Charts.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/MainContext";
import { Chart, registerables } from "chart.js";

const Charts = ({ handler }) => {
  //error
  const [isErrorVisable, setIsErrorVisable] = useState(false);

  const { loginData, expenses, handleChangeExpenses, limit } =
    useContext(AppContext);

  useEffect(() => {
    Chart.register(...registerables);

    if (expenses.status === "undefinied") {
      fetch("http://127.0.0.1:3030/loadExpenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: loginData.userId }),
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
            handleChangeExpenses({
              status: "downloaded",
              expenses: data.expenses,
            });
            setIsErrorVisable(false);
          }
        })
        .catch((err) => console.log(err));
    }

    if (expenses.status === "downloaded") {
      const expensesInCat = [0, 0, 0, 0, 0];

      expenses.expenses.forEach((element) => {
        if (element.category === "Category 1") {
          expensesInCat[0] += parseFloat(element.cost);
        }
        if (element.category === "Category 2") {
          expensesInCat[1] += parseFloat(element.cost);
        }
        if (element.category === "Category 3") {
          expensesInCat[2] += parseFloat(element.cost);
        }
        if (element.category === "Category 4") {
          expensesInCat[3] += parseFloat(element.cost);
        }
        if (element.category === "Category 5") {
          expensesInCat[4] += parseFloat(element.cost);
        }
      });

      if (document.querySelector(".chart-one") === null) {
        document.querySelector(".chart-one").innerHTML =
          '<canvas id="expenses-chart" width="500"></canvas>';
      }
      const data = {
        labels: [
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
          "Category 5",
        ],
        datasets: [
          {
            label: "Expenses",
            data: expensesInCat,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255,255,20)",
              "rgb(21,5,5)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      const config = {
        type: "doughnut",
        data: data,
      };

      const expensesChart = new Chart(
        document.getElementById("expenses-chart"),
        config
      );
    } else {
      setIsErrorVisable(true);
    }
  }, [expenses.status]);

  useEffect(() => {
    document.getElementById("panel").style.display = "none";
    document.getElementById("charts").addEventListener("animationend", () => {
      document.getElementsByTagName("html")[0].scrollTop = 0;
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    });
  }, []);

  return (
    <section id="charts">
      <button onClick={handler} id="close-charts">
        <svg
          height="30px"
          viewBox="0 0 144 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="17.9061"
            y="0.728638"
            width="178"
            height="25"
            rx="12.5"
            transform="rotate(45 17.9061 0.728638)"
            fill="white"
          />
          <rect
            x="0.228638"
            y="126.594"
            width="178"
            height="25"
            rx="12.5"
            transform="rotate(-45 0.228638 126.594)"
            fill="white"
          />
        </svg>
      </button>
      <div className="chart-one">
        <h1>Yours expenses in this limit</h1>
        <div>
          <canvas id="expenses-chart" width="300"></canvas>
          {isErrorVisable && (
            <>
              <p>You need to add product to analise data!</p>
            </>
          )}
        </div>
      </div>
      <div class="limitData">
        {limit.isLimitSet && (
          <>
            <div>
              <h2>
                Start limit:{" "}
                <span style={{ color: "red" }}>
                  {parseFloat(limit.startValue)}
                </span>
              </h2>
              <h2>
                Money left:{" "}
                <span style={{ color: "#5FEDA9" }}>
                  {parseFloat(limit.limitValue)}
                </span>
              </h2>
              <h2>
                Target value:{" "}
                <span style={{ color: "#5FEDA9" }}>
                  {parseFloat(limit.targetValue)}
                </span>
              </h2>
              <h2>
                You spend:{" "}
                <span style={{ color: "red" }}>
                  {parseFloat(limit.startValue) - parseFloat(limit.limitValue)}
                </span>
              </h2>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Charts;
