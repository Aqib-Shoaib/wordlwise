/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

const ContextProvider = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    setIsLoading(true);
    // console.log(id);
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    // console.log(data);
    setCurrentCity(data);
  }

  return (
    <ContextProvider.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}
function useCities() {
  const context = useContext(ContextProvider);
  if (context === undefined)
    throw new Error("Context is being used outside its boundries");
  return context;
}

export { CitiesContext, useCities };
