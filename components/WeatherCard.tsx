import type { Weather } from "@/types";
import styles from "./WeatherCard.module.css";

// Display the weather received from the server.
export default function WeatherCard({
                                        weather,
                                    }: {
    weather: Weather;
}) {
    return (
        <section className={styles.card}>
            <h2 className={styles.heading}>{weather.location}</h2>

            <p className={styles.temperature}>
                {weather.temperature}°C
            </p>

            <p>{weather.conditions}</p>

            {/* Additional weather measurements. */}
            <dl className={styles.details}>
                <div>
                    <dt>Feels like</dt>
                    <dd>{weather.feelsLike}°C</dd>
                </div>

                <div>
                    <dt>Humidity</dt>
                    <dd>{weather.humidity}%</dd>
                </div>
            </dl>
        </section>
    );
}
