// Description: This file contains the code for Smart Flow Control System.
// Each hour, the system checks the weather forecast for the next hour in the garden location,
// and if it's rainy, it sends a request to the endpoint to open the water retention valve 
// and empty the water tank to avoid overflow due to the rain.


import https from 'https';
import http from 'http';
import mongoose, { Document, Model, Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Define the schema for the database entries
interface IEntry extends Document {
    endpoint: string;
    latitude: number;
    longitude: number;
}

// Connect to the database
const entrySchema: Schema<IEntry> = new mongoose.Schema({
    endpoint: String,
    latitude: Number,
    longitude: Number,
});

// Define the model for the database entries
const Entry: Model<IEntry> = mongoose.model('Entry', entrySchema);

// Function to fetch weather data and send requests if it's rainy
async function checkWeatherAndSendRequests(entry: IEntry) {
    const { latitude, longitude, endpoint } = entry;
    const apiKey = process.env.WEATHER_API_KEY as string;

    // Calculate the timestamp for the next hour
    const currentTime = new Date();
    const nextHourTime = new Date(currentTime.getTime() + 60 * 60 * 1000).getHours(); // Adding 1 hour
    console.log('Next hour time in UTC:', nextHourTime);

    // Make the API request to get the weather forecast for the next hour
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&hour=${nextHourTime}`;
    console.log('Fetching weather data from:', url);
    http.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try { // Parse the weather data and check if it's rainy
                const weatherData = JSON.parse(data);
                const isRainy = weatherData?.forecast?.forecastday[0].hour[0].will_it_rain === 0;
                console.log('Is rainy:', weatherData?.forecast?.forecastday[0].hour[0].will_it_rain);
                if (isRainy) {
                    // Send the request to the endpoint
                    console.log('Sending request to:', endpoint);
                    https.get(endpoint, (endpointResponse) => {
                        // Handle the response from the endpoint here
                    });
                }
            } catch (error) {
                console.error('Error parsing weather data:', error);
            }
        });
    });
}

// Function to fetch all entries from the database and check the weather for each one
async function checkWeatherForAllEntries() {
    //const entries = await Entry.find();
    
    // test with a single entry
    const entries = [{endpoint: "https://webhook.site/6086a0cd-5c54-4769-b18a-7f01d8dc5391", latitude: 40.3828294, longitude: 49.8720135}] as IEntry[];

    for (const entry of entries) {
        await checkWeatherAndSendRequests(entry);
    }
}

// Call the function to check the weather for all entries every hour
setInterval(checkWeatherForAllEntries, 60 * 60 * 1000);
