import express from 'express';
import fs from 'fs';
import { AddressInfo } from 'net';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';

// Initialize database
const db = new sqlite3.Database(':prices:');

try{
    // Check if table exists
    db.get('SELECT * FROM prices', (err, row) => {
        if (err) {
            console.log(err);
            // If table does not exist, create it
            db.serialize(() => {
                db.run('CREATE TABLE prices (address TEXT, price INTEGER)');
            });
        }
    });
}
catch(err){
    console.log(err);
}

// Add price to database
function addPrice(address: string, price: number) {
    db.prepare('INSERT INTO prices VALUES (?, ?)').run(address, price).finalize();
}

// Generate random integer
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random price
function randomPrice() {
    return randomInt(1000, 2500) * 10;
}

// Create express app
var app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()) // Enable JSON body parsing
app.use(bodyParser.urlencoded({ extended: false }))

async function getPrice(lan: string, lon: string) {
    var address = `${lan},${lon}`; // Create address string
    return new Promise((resolve, reject) => {
        // Check if address is in database
        db.all('SELECT price FROM prices WHERE address = ?', address, (err, rows) => {
            if (err) { // If error, return 0
                console.log(err);
                resolve(0)
                return;
            }
            if (rows.length > 0) {
                if (rows.length > 1) { // If more than one row, log warning
                    console.log(`Warning: more than one row for address ${address}`);
                }
                let obj = rows[0] as object;
                if ('price' in obj) { // If price is defined, return it
                    console.log(`Found price ${obj.price} for address ${address}`);
                    resolve(obj.price)
                    return;
                }
                console.log(`Warning: price is undefined for address ${address}`); // If for some reason price is undefined, return 0
                resolve(0)
            }
            else { // If address is not in database, calculate price and add it
                var price = randomPrice();
                addPrice(address, price);
                console.log(`Added price ${price} for address ${address}`);
                resolve(price)
            }
        });
    });
}

// Get price
app.post('/price', (req, res) => {
    var lat = req.body.lat;
    var lon = req.body.lon;
    getPrice(lat, lon).then((price) => {
        console.log(price)
        res.send({ 'price': price });
    });
});

// Start server
var server = app.listen(8080, () => {
    var host = (server.address() as AddressInfo).address;
    var port = (server.address() as AddressInfo).port;
    console.log(`Listening at http://${host}:${port}`);
});
