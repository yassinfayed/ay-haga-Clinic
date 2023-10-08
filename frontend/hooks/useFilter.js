"use client"
import { useCallback, useState } from 'react';

export default function useFilter(headers, initialValue) {
    const [data, setData] = useState(initialValue);

    const filterData = (key, op, value) => {
        const newData = data.filter((arr) => {
            const headerIndex = headers.indexOf(key);
            const filterCheck = arr[headerIndex];

            switch (op) {
                case '==':
                    return filterCheck === value;
                case '!=':
                    return filterCheck !== value;
                case '>':
                    return filterCheck > value;
                case '>=':
                    return filterCheck >= value;
                case '<':
                    return filterCheck < value;
                case '<=':
                    return filterCheck <= value;
                case '%':
                    return filterCheck.includes(value);
                default:
                    return filterCheck === value;
            }
        });

        setData(newData);
    }

    const sortData = useCallback((key, direction = 'ASC') => {
        const headerIndex = headers.indexOf(key);

        setData(prevData => {
            const newData = [...prevData];

            newData.sort((a, b) => {
                const valueA = a[headerIndex];
                const valueB = b[headerIndex];

                if (direction === 'ASC') {
                    if (valueA < valueB) return -1;
                    if (valueA > valueB) return 1;
                    return 0;
                } else {
                    if (valueA > valueB) return -1;
                    if (valueA < valueB) return 1;
                    return 0;
                }
            });

            return newData;
        });
    }, []);


    return [data, setData, filterData, sortData];
}