/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const ContextProvider = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      // console.log(data);
      setCities(data);
    }
    fetchCities();
  }, []);

  return <ContextProvider.Provider>{children}</ContextProvider.Provider>;
}

export { CitiesContext };
