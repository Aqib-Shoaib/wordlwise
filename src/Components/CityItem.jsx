/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  // console.log(city);
  const { date, emoji, cityName, id, position } = city;
  const { delCity } = useCities();
  const { lat, lng } = position;
  // console.log(position);

  function handleDelete(e) {
    e.preventDefault();
    delCity(id);
  }

  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span>{emoji}</span>
        <h3>{cityName}</h3>
        <time>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
