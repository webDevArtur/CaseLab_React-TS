import React, { FC, useEffect, useState } from 'react';
import { VehicleApi } from '../data/vehicles/api';
import { Vehicle, vehicleTypes, vehicleTypeTitles } from '../data/vehicles/contracts';
import styles from './Filter.module.css';

interface IProps {
    onChange: (filteredVehicles: Vehicle[]) => void;
}

const Filter: FC<IProps> = ({ onChange }) => {
    const [vehicleTitle, setVehicleTitle] = useState<string>('');
    const [vType, setVType] = useState<string | null>(null);

    useEffect(() => {
        const type = vType != null ? parseInt(vType, 10) : -1;
        const filtered = VehicleApi.search({ type: vehicleTypes[type], title: vehicleTitle || '' });
        onChange(filtered);
    }, [vehicleTitle, vType]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (inputValue.includes('\\')) {
            alert('Символ "\\" не содержится в названиях автомобилей');
        } else {
            try {
                new RegExp(inputValue);
                setVehicleTitle(inputValue);
            } catch (error) {
                console.error('Invalid regular expression:', error);
            }
        }
    };


    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVType(e.target.value !== '-1' ? e.target.value : null);
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.Container}>
            <label className={styles.label} htmlFor="searchInput">
                Поиск:
            </label>
            <input
                id="searchInput"
                className={styles.searchInput}
                type="search"
                value={vehicleTitle}
                onChange={handleTitleChange}
                aria-label="Поле поиска"
            />
            </div>
            <div className={styles.Container}>
            <label className={styles.label} htmlFor="typeSelect">
                Тип ТС:
            </label>
            <select
                id="typeSelect"
                className={styles.selectInput}
                value={vType || '-1'}
                onChange={handleTypeChange}
                aria-label="Выбор типа ТС"
            >
                <option value="-1">Все</option>
                {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                        {vehicleTypeTitles[type]}
                    </option>
                ))}
            </select>
            </div>
        </div>
    );
};

export default Filter;
