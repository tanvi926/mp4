"use server";

import type { WeatherResult } from "@/types";

export default async function getWeather(
    city: string
): Promise<WeatherResult> {
    // Remove extra spaces before checking the input.
    const location = city.trim();

    if (!location) {
        return {
            success: false,
            error: "Please enter a city.",
        };
    }

    // Read the private key on the server.
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return {
            success: false,
            error: "The weather service is not configured.",
        };
    }

    // Request current weather using Celsius.
    const url =
        "https://weather.visualcrossing.com/" +
        "VisualCrossingWebServices/rest/services/timeline/" +
        `${encodeURIComponent(location)}/today` +
        "?unitGroup=metric&include=current&contentType=json" +
        `&key=${encodeURIComponent(apiKey)}`;

    try {
        const response = await fetch(url, {
            cache: "no-store",
            // Stop the API request if it takes longer than 10 seconds.
            signal: AbortSignal.timeout(10000),
        });

        // Handle the API's request limit.
        if (response.status === 429) {
            return {
                success: false,
                error: "The API request limit has been reached. Please try again later.",
            };
        }

        if (response.status === 400 || response.status === 404) {
            return {
                success: false,
                error: "Could not find that location. Check the city name and try again.",
            };
        }

        if (response.status === 401 || response.status === 403) {
            return {
                success: false,
                error: "The weather service could not authenticate. Please check the server API key.",
            };
        }

        // Handle other unsuccessful API responses.
        if (!response.ok) {
            return {
                success: false,
                error: "The weather service is unavailable. Please try again later.",
            };
        }

        const data = await response.json();
        const current = data?.currentConditions;

        // Check that the response contains the fields needed by the card.
        if (
            typeof data?.resolvedAddress !== "string" ||
            typeof current?.temp !== "number" ||
            typeof current?.feelslike !== "number" ||
            typeof current?.humidity !== "number" ||
            typeof current?.conditions !== "string"
        ) {
            return {
                success: false,
                error: "Weather data is unavailable for this location.",
            };
        }

        // Return only the weather data needed by the frontend.
        return {
            success: true,
            weather: {
                location: data.resolvedAddress,
                temperature: current.temp,
                feelsLike: current.feelslike,
                humidity: current.humidity,
                conditions: current.conditions,
            },
        };
    } catch {
        // Handle connection failures, timeouts, and invalid JSON.
        return {
            success: false,
            error: "The weather request failed or timed out. Please try again.",
        };
    }
}
