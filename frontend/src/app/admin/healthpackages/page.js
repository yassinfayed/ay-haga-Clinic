"use client"
import React,{useEffect, useMemo, useState} from 'react';
import {Table} from '../../../../components/Table'
import { Button } from '../../../../components/Button';
import AdminNavbar from '../../../../components/AdminNavbar';
import { Card } from '../../../../components/Card';
import CenteredModalAddPack from '../../../../components/AddHealthPackageModal'
import { useDispatch, useSelector } from 'react-redux';
import { deleteHealthPackage, listHealthPackages } from '@/app/redux/actions/healthPackagesActions';
import { login } from '@/app/redux/actions/authActions';
import Image from 'next/image';


export default function Admins() {
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const healthpackages = useSelector(state=>state.getHealthPackagesReducer.healthPackages)
  const isLoading = useSelector(state=>state.deleteHealthPackageReducer.loading)
  const CreateisLoading = useSelector(state=>state.createHealthPackageReducer.loading)
  const UpdateisLoading = useSelector(state=>state.updateHealthPackageReducer.loading)
  const tableHeaders = ['Package Name','Doctor Session Discount','Medicine Discount','Subscriptions Discount','Price'];
  const [modalShow,setModalShow]=useState(false);
  const [modalShowsec,setModalShowsec]=useState(false);
  
  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button color="light" className="rounded-circle mx-1" text={<Image src='/edit.svg' height={20} width={20} className=""/>} variant='xs' onClick={() => {setId(id)
          setModalShowsec(true)}}>   </Button>
        <Button color="light" className="rounded-circle mx-1" text={<Image src='/delete.svg' height={20} width={20} className=""/>} variant='xs' onClick={() => handleRemove(id)}> </Button>
      </div>
    );
  };
  const handleRemove =(id)=>{
    dispatch(deleteHealthPackage(id))
  } 

  const health = useMemo(() => {
    if (healthpackages && healthpackages.data) {
      return healthpackages.data.map((value) => ({
        name: value.name, 
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyMemberSubDiscount: value.familyMemberSubDiscount,
        price: value.price,
        button: generateButton(value._id)
      }));
    }
    return [];
  }, [healthpackages,isLoading,modalShow,modalShowsec,CreateisLoading,UpdateisLoading]);
  
  useEffect(()=>{
    dispatch(listHealthPackages());
    }
  ,[dispatch,isLoading,modalShow,modalShowsec,CreateisLoading,UpdateisLoading])

  return (
    <> 
    <h3 className='my-1 mt-0 text-center text-title'>Health Packages</h3>
    <div className='underline-Bold mx-auto mb-3'></div>
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <div className="row justify-content-end align-items-center">
      <Button text='Add Package' className="ms-auto col-md-2" onClick={()=>{setModalShow(true)}} variant={'md'}></Button>
      </div>
      <Table headers={tableHeaders} data={health ? health : []}></Table>
      <CenteredModalAddPack
        show={modalShow}
        onHide={() => setModalShow(false)} 
        title={"Create new health package"}
        edit={false}
        id={id}
      />
      <CenteredModalAddPack
        show={modalShowsec}
        onHide={() => setModalShowsec(false)} 
        title={"Please Update Package Details"}
        edit={true}
        id={id}
      />
    
    </div>
    </>
  );
}
