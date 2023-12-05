"use client"
import React, { useEffect, useMemo, useState } from 'react';
import {Table} from '../../../../components/Table'
import { Button } from '../../../../components/Button';
import CenteredModalAdmin from '../../../../components/AddAdminModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser } from '@/app/redux/actions/userActions';
import Image from 'next/image';
import { Alert } from 'react-bootstrap';
import Spinner from "../../../../components/Spinner";

export default function Admins() {
  const tableHeaders = ['Username', 'Actions'];
  const [modalShow,setModalShow]=useState(false);
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const admins = useSelector(state=>state.getUsersReducer.user)
  const adminsisLoading = useSelector(state=>state.getUsersReducer.loading)
  const CreateisLoading = useSelector(state=>state.registerReducer.loading)
  const RemoveisLoading = useSelector(state=>state.removeUserReducer.loading)
  const RemoveisFail =useSelector(state=>state.removeUserReducer.error)
  const [showAlertRemoveSuccess, setShowAlertRemoveSuccess] = useState(false);
  const [showAlertRemoveFail, setShowAlertRemoveFail] = useState(false);
  const [showAlertRemoveLoading, setShowAlertRemoveLoading] = useState(false);

  const generateButton = (id) => {
    const isRemoving = showAlertRemoveLoading[id];
    return (
      <div style={{ fontSize: '1px' }}>
        {isRemoving ? (
          <Button variant="primary" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Removing...
          </Button>
        ) : (
          <Button text={<Image src='/delete.svg' height={20} width={20} className=""/>} variant='xs' color='light' className="rounded-circle" onClick={() => handleRemove(id)}>
          </Button>
        )}
      </div>
    );
  };

  const handleRemove = async (id) => {
    setShowAlertRemoveLoading({ ...showAlertRemoveLoading, [id]: true });
    setShowAlertRemoveFail(false);
    setShowAlertRemoveSuccess(false);
    dispatch(removeUser(id)).then(()=>{
      setShowAlertRemoveLoading({ ...showAlertRemoveLoading, [id]: false });
      
       if (RemoveisFail) {
        setShowAlertRemoveFail(true);
        const timer = setTimeout(() => {
          setShowAlertRemoveFail(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    else{
        setShowAlertRemoveSuccess(true);
        const timer = setTimeout(() => {
          setShowAlertRemoveSuccess(false);
        }
        , 3000);
        return () => clearTimeout(timer);
      }
     
    }
    );
  };

  const adminlist = useMemo(() => {
    if (admins && admins.data) {
    //   const excludedAdminId =JSON.parse(localStorage.getItem('userInfo')).data.user._id ;
      return admins.data
        // .filter((value) => {
        //   return value._id !== excludedAdminId;
        // })
        .map((value) => {
          if (value.role === 'administrator') {
            return {
              username: value.username,
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
   `{showAlertRemoveSuccess && (
        <Alert variant='success' className='text-center' dismissible>
          <strong>Success!</strong> Admin removed successfully
        </Alert>
      )
    }
    {
      showAlertRemoveFail && (
        <Alert variant='danger' className='text-center'>
          {RemoveisFail}
        </Alert>
      )
    }
      <div className="row justify-content-end align-items-center">
        <Button text='Add Admin' onClick={()=>{setModalShow(true)}} variant='md' className='ms-auto col-md-2'></Button>
      </div>
      <CenteredModalAdmin
        show={modalShow}
        onHide={() => setModalShow(false)} 
        title={"Create new admin account"}
        />
      {/* {adminsisLoading ? (
        <Spinner />
      ) : ( */}
        <Table headers={tableHeaders} data={adminlist ? adminlist : []}></Table>
      {/* )} */}
     
    </div>
    </>
  );
}
