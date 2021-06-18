import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/MainContext";
import Loading from "./Loading";
import Message from "./Message";
import ProductList from "./ProductList";

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

  const handleSpendMoney = (e) => {
    e.preventDefault();
    if (expenses.status === "undefinied") {
      setIsMessageVisable(true);
      setMessage("You need to set limit to spend money!");
    } else {
      if (limit.limitValue - limit.targetValue - cost.toString() > 0) {
        if (productName.length > 0 && category.length > 0 && cost.length > 0) {
          const newProduct = {
            name: productName,
            category: category,
            cost: cost,
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
              cost: cost,
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
                    limitValue: prevValue.limitValue - parseFloat(cost),
                    targetValue: prevValue.targetValue,
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
        setCost(e.target.value);
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    document
      .getElementById("spend-money")
      .addEventListener("animationend", () => {
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
      });
  }, []);

  return (
    <>
      <section id="spend-money">
        <button onClick={handler} id="closeSpend">
          X
        </button>
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
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
              <option>Category 4</option>
              <option>Category 5</option>
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
