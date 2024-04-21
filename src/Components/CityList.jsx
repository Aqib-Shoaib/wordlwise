/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { useCities } from "../Contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (!isLoading) return <Spinner />;
  // console.log(cities);
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={city.id + Math.trunc(Math.random * Math.random)}
        />
      ))}
    </ul>
  );
}

export default CityList;
