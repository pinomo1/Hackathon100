import React from "react";
import Map from "./Map.js";
import { useAddress } from './AddressProvider';
import './Order.css'

const Order = () => {
    const { address } = useAddress();

    return (
        <div className="container">
            { address ? <p></p> :
                <h1>Select your residence</h1>
            }
            {/* <Map onMapClick={onMapClick}/> */}
            <Map initialAddress={address}/>
        </div>
    );
}

export default Order;