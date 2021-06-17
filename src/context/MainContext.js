import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    logged: false,
  });

  const [limit, setLimit] = useState({
    isLimitSet: false,
  });

  const handleChangeLoginData = (data) => {
    setLoginData(data);
  };

  return (
    <AppContext.Provider
      value={{ loginData, handleChangeLoginData, limit, setLimit }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
