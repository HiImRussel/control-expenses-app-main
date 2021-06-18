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

  return (
    <section id="charts">
      <button onClick={handler} id="close-charts">
        X
      </button>
      <div className="chart-one">
        <h1>Yours expenses in this limit</h1>
        <canvas id="expenses-chart" width="500"></canvas>
        {isErrorVisable && <p>You need to add product to analise data!</p>}
      </div>
    </section>
  );
};

export default Charts;
