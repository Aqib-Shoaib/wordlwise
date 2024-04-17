/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { date, emoji, cityName } = city;
  return (
    <li className={styles.cityItem}>
      <span>{emoji}</span>
      <h3>{cityName}</h3>
      <time>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
