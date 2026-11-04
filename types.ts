// Weather fields displayed by the app.
export type Weather = {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    conditions: string;
};

// The server returns either weather data or an error message.
export type WeatherResult =
    | { success: true; weather: Weather }
    | { success: false; error: string };

