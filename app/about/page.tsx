import styles from "./page.module.css";

// Second page explaining what the app displays.
export default function About() {
    return (
        <section className={styles.card}>
            <h1 className={styles.heading}>About Weather Search</h1>

            <p>
                Weather Search lets you check the current weather for a city.
                It displays the temperature, feels-like temperature,
                humidity, and weather conditions.
            </p>

            <p>
                Enter a city on the Home page and select Search.
                Temperatures are displayed in degrees Celsius.
            </p>

        </section>
    );
}
