"use client"
import React, { useEffect, useMemo, useState } from 'react';
import {Table} from '../../../../components/Table'
import { Button } from '../../../../components/Button';
import CenteredModalAdmin from '../../../../components/AddAdminModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser } from '@/app/redux/actions/userActions';
import Image from 'next/image';



export default function Admins() {
  

    
  const tableHeaders = ['Username', 'Actions'];
  const [modalShow,setModalShow]=useState(false);
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const admins = useSelector(state=>state.getUsersReducer.user)
   const CreateisLoading = useSelector(state=>state.registerReducer.loading)
  const RemoveisLoading = useSelector(state=>state.removeUserReducer.loading)
  // const UpdateisLoading = useSelector(state=>state.updateHealthPackageReducer.loading)

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text={<Image src='/delete.svg' height={20} width={20} className=""/>} variant='xs' color='light' className="rounded-circle" onClick={() => {setId(id)
          handleRemove(id)}}></Button>
      </div>
    );
  };

  const handleRemove =(id)=>{
    dispatch(removeUser(id))
  } 

  const adminlist = useMemo(() => {
    if (admins && admins.data) {
      const excludedAdminId =JSON.parse(localStorage.getItem('userInfo')).data.user._id ;
      return admins.data
        .filter((value) => {
          return value._id !== excludedAdminId;
        })
        .map((value) => {
          if (value.role === 'administrator') {
            return {
              username: value.username,
              // password: value.password,
              button: generateButton(value._id),
            };
          }
          return null; 
        })
        .filter((value) => value !== null && typeof value !== 'undefined');
    }
    return [];
  }, [admins, modalShow, RemoveisLoading]);
  
  
  useEffect(()=>{    
    dispatch(getAllUsers());
    }
  ,[dispatch,modalShow,CreateisLoading,RemoveisLoading])

  return (
    <>
    <h3 className='my-1 mt-0 text-center text-title'>Admins</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <div className="row justify-content-end align-items-center">
        <Button text='Add Admin' onClick={()=>{setModalShow(true)}} variant='md' className='ms-auto col-md-2'></Button>
      </div>
      <CenteredModalAdmin
        show={modalShow}
        onHide={() => setModalShow(false)} 
        title={"Create new admin account"}
        />
      <Table headers={tableHeaders} data={adminlist}></Table>
    </div>
    </>
  );
}
