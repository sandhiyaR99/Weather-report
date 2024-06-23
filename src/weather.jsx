import axios from "axios";
import one from "./weatherimg.jpg";
import { useState } from "react";

function Weather() {
    const [ip, setip] = useState("");
    const [iw, setiw] = useState("");
    const [it, setit] = useState("");
    const [id, setid] = useState("");
    const [valid, setvalid] = useState(true); // Initialize valid as true
    const [showWeather, setShowWeather] = useState(false); // Control visibility of weather details

    const ipupdate = (evt) => {
        setip(evt.target.value);
        setvalid(true); // Reset valid state when user starts typing again
        setShowWeather(false); // Hide weather details when input changes
    };

    const updatereport = () => {
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${ip}&appid=2957506044647b076e930c09708b9d3f`)
            .then(function (success) {
                setiw(success.data.weather[0].main);
                setit(success.data.main.temp);
                setid(success.data.weather[0].description);
                setShowWeather(true); // Show weather details on successful fetch
            })
            .catch(function (error) {
                setvalid(false);
                setiw("");
                setit("");
                setid("");
                setShowWeather(false); // Ensure weather details are hidden on error
            });
    };

    return (
        <>
            <div className="relative h-screen">
                <img src={one} className="absolute inset-0 w-full h-full object-cover blur-sm" alt="Background Image" />

                <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white bg-opacity-90 border border-gray-300 rounded-xl p-5 text-center shadow-lg sm:w-80 md:w-96">
                        <h1 className=" font-bold mb-4 text-blue-700 sm: text-2xl md:text-4xl">Weather Report</h1>
                        <p className=" mb-4 text-gray-700 md:text-lg">Enter your city for weather details.</p>
                        <input onChange={ipupdate} value={ip} className="border p-2 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your city name" />
                        <button onClick={updatereport} className="bg-blue-500 text-white rounded-xl p-2 w-full mb-4">Get Report</button>
                    </div>

                    {showWeather && valid ? (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-left mt-4">
                            <h2 className="text-lg font-semibold text-blue-700 animate-pulse">Weather:</h2>
                            <p className="mb-2 text-gray-900">{iw}</p>
                            <h2 className="text-lg font-semibold text-blue-700 animate-pulse">Temperature:</h2>
                            <p className="mb-2 text-gray-900">{it}</p>
                            <h2 className="text-lg font-semibold text-blue-700 animate-pulse">Description:</h2>
                            <p className="text-gray-900">{id}</p>
                        </div>
                    ) : valid ? null : (
                        <h1 className="text-lg font-semibold text-red-700 animate-pulse text-center mt-3">Enter valid country</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default Weather;
