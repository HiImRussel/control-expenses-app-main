import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    logged: false,
  });

  const [limit, setLimit] = useState({
    isLimitSet: false,
  });

  //expenses
  const [expenses, setExpenses] = useState({ status: "undefinied" });

  const handleChangeExpenses = (data) => {
    setExpenses(data);
  };

  //login
  const handleChangeLoginData = (data) => {
    setLoginData(data);
  };

  return (
    <AppContext.Provider
      value={{
        loginData,
        handleChangeLoginData,
        limit,
        setLimit,
        expenses,
        handleChangeExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
