"use client"
import React from 'react';
import {DoctorAppsTable} from '../doctorapps/DoctorAppsTable'
import { Button } from '../../../../components/Button';
import AdminNavbar from '../doctorapps/AdminNavbar';
import { Card } from '../../../../components/Card';


export default function Admins() {
    const button = <div style={{
        fontSize: '1px', 
      }}>
        <Button text='Update' variant='xs' ></Button>
    <Button text='Remove' variant='xs' ></Button>
    </div>
    
  const tableHeaders = ['Package Name','Doctor Session Discount','Medicine Discount','Subscriptions Discount','Price'];

  const initialValues = [
    {
      
     packagename:'Silver',
     DoctorSessionDiscount: '10%',
     MedicineDiscount: '20%',
     SubscriptionsDiscount:'30%',
     Price :'300$',
     button
      
    },
    {
        packagename:'Silver',
        DoctorSessionDiscount: '10%',
        MedicineDiscount: '20%',
        SubscriptionsDiscount:'30%',
        Price :'300$',
        button
      
    },
    {
        packagename:'Silver',
        DoctorSessionDiscount: '10%',
        MedicineDiscount: '20%',
        SubscriptionsDiscount:'30%',
        Price :'300$',
        button
    },
    {
        packagename:'Silver',
        DoctorSessionDiscount: '10%',
        MedicineDiscount: '20%',
        SubscriptionsDiscount:'30%',
        Price :'300$',
        button
    }
  ]

  return (
    <>
    <AdminNavbar/>
    
   
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <Button text='Add Package'></Button>
      <DoctorAppsTable headers={tableHeaders} data={initialValues}></DoctorAppsTable>
    
    </div>
    </>
  );
}
