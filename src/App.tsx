import React, { useState, useEffect } from "react";
import { Vehicle, VehicleFilter } from "./data/vehicles/contracts";
import { VehicleApi } from "./data/vehicles/api";
import Filter from "./components/Filter";
import { Table } from "./components/Table";
import styles from './App.module.css';

const initialFilter: VehicleFilter = {
    title: "",
    type: null,
};

export default function App() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);


    useEffect(() => {
        const data = VehicleApi.search(initialFilter);
        setVehicles(data);
    }, []);


    return (
        <div className={styles.pageContainer}>
            <Filter onChange={setVehicles} />
            <Table vehicles={vehicles} />
        </div>
    );
}
