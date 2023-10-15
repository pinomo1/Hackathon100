import React, { createContext, useContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [address, setAddress] = useState("");

    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error("useAddress must be used within an AddressProvider");
    }
    return context;
};
