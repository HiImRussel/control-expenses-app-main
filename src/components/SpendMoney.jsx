import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/MainContext";
import Loading from "./Loading";
import Message from "./Message";
import ProductList from "./ProductList";
import { Link, Redirect } from "react-router-dom";

import "../css/SpendMoney.css";

const SpendMoney = ({ handler }) => {
  const { loginData, limit, setLimit, expenses, handleChangeExpenses } =
    useContext(AppContext);
  const [isLoadingVisable, setIsLoadingVisable] = useState(false);

  //message
  const [isMessageVisable, setIsMessageVisable] = useState(false);
  const [message, setMessage] = useState("");

  //form values
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Category 1");
  const [cost, setCost] = useState("");

  //download expenses and handle proper message
  useEffect(() => {
    if (expenses.status === "undefinied") {
      setIsLoadingVisable(true);
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
          if (data.status === "error") {
            setIsLoadingVisable(false);
            setIsMessageVisable(true);
            setMessage(data.message);
          }
          if (data.status === "ok") {
            setIsLoadingVisable(false);
            handleChangeExpenses({
              status: "downloaded",
              expenses: data.expenses,
            });
          }
          if (data.status === "no-product") {
            handleChangeExpenses({
              status: "0-product",
              expenses: [],
            });
            setIsLoadingVisable(false);
            setIsMessageVisable(true);
            setMessage(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //add expense
  const handleSpendMoney = (e) => {
    e.preventDefault();
    if (expenses.status === "undefinied") {
      setIsMessageVisable(true);
      setMessage("You need to set limit to spend money!");
    } else {
      if (
        parseFloat(limit.limitValue) -
          parseFloat(limit.targetValue) -
          parseFloat(cost) >
        0
      ) {
        if (productName.length > 0 && category.length > 0 && cost.length > 0) {
          const newProduct = {
            name: productName,
            category: category,
            cost: parseFloat(cost),
          };

          fetch("http://127.0.0.1:3030/addProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: loginData.userId,
              name: productName,
              category: category,
              cost: parseFloat(cost),
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
                if (expenses.status === "0-product") {
                  handleChangeExpenses((prevValue) => ({
                    status: "downloaded",
                    expenses: [...prevValue.expenses, newProduct],
                  }));
                }
                if (expenses.status === "downloaded") {
                  handleChangeExpenses((prevValue) => ({
                    status: "downloaded",
                    expenses: [...prevValue.expenses, newProduct],
                  }));
                }

                setLimit((prevValue) => {
                  return {
                    isLimitSet: true,
                    startValue: prevValue.startValue,
                    limitValue: prevValue.limitValue - parseFloat(cost),
                    targetValue: prevValue.targetValue,
                    expireTime: prevValue.expireTime,
                  };
                });

                setProductName("");
                setCategory("Category 1");
                setCost("");
              } else {
                setIsMessageVisable(true);
                setMessage(data.message);
              }
            })
            .catch((err) => console.log(err));
        } else {
          setIsMessageVisable(true);
          setMessage("Fill form with properly data!");
        }
      } else {
        setIsMessageVisable(true);
        setMessage("You dont have enougth money!");
      }
    }
  };

  //close message
  const handleCloseMessage = () => {
    document.getElementById("deleted").style.opacity = 0;
    document.getElementById("deleted").addEventListener("transitionend", () => {
      document.getElementById("deleted").style.display = "none";
      setIsMessageVisable(false);
    });
  };

  const handleSetProductValues = (e) => {
    switch (e.target.name) {
      case "productName":
        setProductName(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "cost":
        if (parseFloat(e.target.value) >= 0 || e.target.value === "") {
          setCost(e.target.value);
        }
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    document
      .getElementById("spend-money")
      .addEventListener("animationend", () => {
        document.getElementsByTagName("html")[0].scrollTop = 0;
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
      });
  }, []);

  return (
    <>
      {loginData.logged || <Redirect to="/" />}
      <section id="spend-money">
        <Link to="/panel">
          <button onClick={handler} id="closeSpend">
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
        </Link>
        <div className="left-panel">
          <h2>Add new product</h2>
          <form onSubmit={handleSpendMoney}>
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              value={productName}
              onChange={handleSetProductValues}
            />
            <select
              value={category}
              name="category"
              onChange={handleSetProductValues}
            >
              <option>Gasoline</option>
              <option>Food and drinks</option>
              <option>Charges</option>
              <option>Stuff for fun</option>
              <option>Other</option>
            </select>
            <br />
            <input
              type="number"
              placeholder="Cost"
              name="cost"
              value={cost}
              onChange={handleSetProductValues}
            />
            <span>
              Current:{" "}
              {limit.isLimitSet && limit.limitValue - limit.targetValue}$
            </span>
            <p className="money-left">
              Left:{" "}
              {limit.isLimitSet &&
                limit.limitValue - limit.targetValue - cost.toString()}
              $
            </p>
            <br />
            <button>Spend</button>
          </form>
        </div>
        <div className="right-panel">
          <h2>Last product bought</h2>
          {expenses.status === "0-product" ? (
            <p>No product added yet</p>
          ) : (
            <ProductList expenses={expenses.expenses} />
          )}
        </div>
      </section>
      {isLoadingVisable && <Loading />}
      {isMessageVisable && (
        <Message handler={handleCloseMessage} message={message} />
      )}
    </>
  );
};

export default SpendMoney;
