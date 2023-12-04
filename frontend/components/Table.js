import React, { useState } from 'react';

function Table(props) {
    const { headers, data, className } = props;
    console.log(props)

    const currentItems = data;

    return (
        <div style={{overflowX: 'auto'}}>
            <table className={`table table-striped table-bordered table-hover my-3 ${className}`}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={`col${index}`} scope="col" className='text-capitalize text-center'>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((row, index) => (
                        <tr key={`tr${index}`}>
                            {Object.values(row).map((node, index2) => (
                                <td key={`td${index}-${index2}`} className='text-center'>{node}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

module.exports = {
    Table
}