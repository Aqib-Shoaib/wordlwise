import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import "./index.css";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import { CitiesContext } from "./Contexts/CitiesContext";

function App() {
  return (
    <CitiesContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </CitiesContext>
  );
}

export default App;
