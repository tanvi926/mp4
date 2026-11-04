import WeatherSearch from "@/components/WeatherSearch";
import styles from "./page.module.css";

export default function Home() {
  return (
      <>
        <h1 className={styles.heading}>Current Weather</h1>

        <p>
          Enter a city to see its current weather conditions.
        </p>

        {/* Search form and weather results. */}
        <WeatherSearch />

        <p className={styles.source}>
          Weather data provided by{" "}
          <a href="https://www.visualcrossing.com/">
            Visual Crossing
          </a>.
        </p>
      </>
  );
}
