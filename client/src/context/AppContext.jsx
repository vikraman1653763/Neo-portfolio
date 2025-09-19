import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
      const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
 useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const value = {
       theme,
    setTheme,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}

export const useAppContext = () => useContext(AppContext);
