"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import getWeather from "@/lib/getWeather";
import WeatherCard from "./WeatherCard";
import type { Weather } from "@/types";
import styles from "./WeatherSearch.module.css";

export default function WeatherSearch() {
    // Track the input, result, and request status.
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<Weather | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Clear the previous result before starting another search.
        setError("");
        setWeather(null);

        if (!city.trim()) {
            setError("Please enter a city.");
            return;
        }

        setLoading(true);

        try {
            // Call the server function without exposing the API key.
            const result = await getWeather(city);

            if (result.success) {
                setWeather(result.weather);
            } else {
                setError(result.error);
            }
        } catch {
            setError("Unable to connect to the server. Please try again.");
        } finally {
            // Clear loading after either success or failure.
            setLoading(false);
        }
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="city">
                    City
                </label>

                <div className={styles.row}>
                    <input
                        className={styles.input}
                        id="city"
                        name="city"
                        type="text"
                        placeholder="For example, Boston, MA"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        disabled={loading}
                        required
                    />

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Search"}
                    </button>
                </div>
            </form>

            {/* Display the current request status or result. */}
            {loading && (
                <p className={styles.status} role="status">
                    Loading weather...
                </p>
            )}

            {error && (
                <p className={styles.error} role="alert">
                    {error}
                </p>
            )}

            {weather && <WeatherCard weather={weather} />}
        </>
    );
}
