/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (!isLoading) return <Spinner />;

  const countries = cities.reduce((arr, cur) => {
    if (arr.country !== cur.country) return [...arr, cur];
    else return [...arr];
  }, []);
  //   console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
