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
    <Button text='Remove' variant='xs' ></Button>
    </div>
    
  const tableHeaders = ['Username','Password'];

  const initialValues = [
    {
      
      username:'JohnDoe123',
      password: 'johndoe@hotmail.com',
      button
      
    },
    {
      username:'JohnDoe123',
      password: 'johndoe@hotmail.com',
      button
      
    },
    {
      username:'JohnDoe123',
      password: 'johndoe@hotmail.com',
     button
    },
    {
      username:'JohnDoe123',
      password: 'johndoe@hotmail.com',
      button
    }
  ]

  return (
    <>
    <AdminNavbar/>
    
   
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <Button text='Add Admin'></Button>
      <DoctorAppsTable headers={tableHeaders} data={initialValues}></DoctorAppsTable>
    
    </div>
    </>
  );
}
