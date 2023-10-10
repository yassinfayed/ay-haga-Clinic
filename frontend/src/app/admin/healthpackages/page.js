"use client"
import React,{useState} from 'react';
import {DoctorAppsTable} from '../doctorapps/DoctorAppsTable'
import { Button } from '../../../../components/Button';
import AdminNavbar from '../doctorapps/AdminNavbar';
import { Card } from '../../../../components/Card';
import CenteredModalAddPack from './CenteredModalAddPack'


export default function Admins() {
    const button = <div style={{
        fontSize: '1px', 
      }}>
        <Button text='Update' variant='xs' onClick={()=>{setModalShowsec(true)}}></Button>
    <Button text='Remove' variant='xs' ></Button>
    </div>
    
  const tableHeaders = ['Package Name','Doctor Session Discount','Medicine Discount','Subscriptions Discount','Price'];
  const [modalShow,setModalShow]=useState(false);
  const [modalShowsec,setModalShowsec]=useState(false);
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
      <Button text='Add Package' onClick={()=>{setModalShow(true)}}></Button>
      <DoctorAppsTable headers={tableHeaders} data={initialValues}></DoctorAppsTable>
      <CenteredModalAddPack
        show={modalShow}
        onHide={() => setModalShow(false)} 
        //title={"Add A New Admin"}
        title={"Please Package Details"}
        />
         <CenteredModalAddPack
        show={modalShowsec}
        onHide={() => setModalShowsec(false)} 
        //title={"Add A New Admin"}
        title={"Please Update Package Details"}
        />
    
    </div>
    </>
  );
}
