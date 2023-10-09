"use client"
import React from 'react';
import { DoctorAppsTable } from './DoctorAppsTable';
import { Button } from '../../../../components/Button';

export default function DoctorApps() {
    const button = <div style={{
        fontSize: '1px', 
      }}>
    <Button text='Approve' variant='sl' ></Button>
    <Button text='Reject' 
  ></Button>
    </div>
  const tableHeaders = ['Affiliation', 'Hourly Rate', 'Educational Background', 'Approval'];

  const initialValues = [
    ['John Doe', 30, 'USA',button],
    ['Alither Smith', 25, 'Canada',button],
    ['Bob Johnson', 35, 'UK', button],
    ['Catherine Lee', 30, 'Australia', button],
  ];


  return (
    <div className="d-lg-flex justify-content-center align-items-center min-vh-100">
      <DoctorAppsTable
        headers={tableHeaders}
        data={initialValues}
        itemsPerPageOptions={[3, 5, 10, 20]}
        
      />
    </div>
  );
}
