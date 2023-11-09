'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button } from '../../../../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHealthPackagesReducer } from '@/app/redux/actions/healthPackagesActions';
import { useEffect } from 'react';
import { useMemo } from 'react';



function HealthPackages() {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const healthPackages = useSelector((state) => state.getHealthPackagesReducer.healthPackages);
   
    async function fetchData() {
      dispatch(getHealthPackagesReducer());
    }
    
    useEffect(() => {
      fetchData();
    }, [dispatch,modalShow]);
    

    const packages = useMemo(() => {
      if (healthPackages && healthPackages.data) {
        return healthPackages.data.map((value) => ({
          name: value.name, 
        }));
      }
      return [];
    }, [healthPackages,modalShow]);

  return (
    <div className='m-2'>
        <h3 className='my-1 mt-0 text-center text-title'>Health Packages</h3>
        <div className='underline-Bold mx-auto mb-5'></div>
        <div className="container-fluid my-3">
            <Button text="Add New Family Member"  onClick={() => setModalShow(true)}/>
        </div>
        <div className="container-fluid my-3">
        {/* <AddFamily
        show={modalShow}
        onHide={() => setModalShow(false)} 
        /> */}
        {packages.map((currpackage) => (
            <Card
            className="my-2"
            key={currpackage._id}
            title={currpackage.name}
            // subtitle={`National ID: ${currpackage.nationalId}`}
            text={<>
                Doctor's appointment discount: {currpackage}
                <br />
                Medicine discount: {currpackage}
                <br />
                Subscriptions of family members discount: {currpackage}
            </> }
            />
      ))}
      
    </div>
    </div>
  );
 
}

export default HealthPackages;
