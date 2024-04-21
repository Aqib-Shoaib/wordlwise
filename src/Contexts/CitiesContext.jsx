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
    try {
      setIsLoading(true);
      // console.log(id);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // console.log(data);
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(newCity) {
    try {
      setIsLoading(true);
      // console.log(id);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setCurrentCity(data);
      setCities((citiesss) => [...citiesss, newCity]);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function delCity(id) {
    try {
      setIsLoading(true);
      // console.log(id);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setCurrentCity(data);
      setCities((city) => city.filter((cc) => cc.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <ContextProvider.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        delCity,
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
