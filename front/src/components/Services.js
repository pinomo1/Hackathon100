import React from "react";
import { useEffect, useState } from "react";
import './styles/Services.css'

const Services = () => {
    const [services, setServices] = useState([]);
    const [roofs, setRoofs] = useState([]);

    useEffect(() => {
      // Fetch the data from the static file
      fetch('/services.json')
        .then(response => {
          // Parse the JSON data
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          // Update the state with the fetched data
          setServices(data.services);
          setRoofs(data.roofs);
        })
        .catch(error => {
          // Handle errors, like if the file is not found
          console.error('Fetch error: ', error.message);
        });
    }, []);

    return (
        <div className="container">
            <h1>Roofs</h1>
                <ul className="item-list">
                  {roofs.map(roof => (
                    <li className="list-item">
                        <h2 className="item-header">{roof.roofType}</h2>
                        <p className="item-description">{roof.text}</p>
                        <img src={roof.image} alt={roof.text} className="item-image" />
                        <p>$ {roof.price}</p>
                    </li>
                  ))}
                </ul>
        </div>
    );
}

export default Services;