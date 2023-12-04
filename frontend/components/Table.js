import { isValidDate, translateDate } from '@/util';
import React, { useState } from 'react';

function Table(props) {
    const { headers, data, className } = props;
    console.log(props)

    const currentItems = data;

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className={`table table-striped table-bordered table-hover my-3 ${className}`}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={`col${index}`} scope="col" className='text-capitalize text-center'>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((row, index) => {
                        return (
                            <tr key={`row${index}`}>
                                {Object.keys(row).map((key, index) => {
                                    if (key === 'button') {
                                        return (
                                            <td key={`col${index}`} className='text-center'>
                                                {row[key]}
                                            </td>
                                        );
                                    }
                                    if (key === 'DateOfbirth') {
                                        return (
                                            <td key={`col${index}`} className='text-center'>
                                                {isValidDate(row[key]) ? translateDate(row[key]) : row[key]}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={`col${index}`} className='text-center'>
                                            {row[key]}
                                        </td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

module.exports = {
    Table
}
