'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {useState} from 'react' ;
import { Button } from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { listHealthPackages } from '@/app/redux/actions/healthPackagesActions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import SubscribeModal from '../../../../components/SubscribeModal';



function HealthPackages() {
    const [modalShow, setModalShow] = useState(false);
    const [healthPackage,setHealthPackage] = useState(null);
    const dispatch = useDispatch();

    const healthPackages = useSelector((state) => state.getHealthPackagesReducer.healthPackages);
   
    async function fetchData() {
      dispatch(listHealthPackages());
    }
    
    useEffect(() => {
      fetchData();
    }, [dispatch,modalShow]);
    

    const packages = useMemo(() => {
      if (healthPackages && healthPackages.data) {
        return healthPackages.data.map((value) => ({
          _id: value._id,
          name: value.name, 
          price: value.price,
          doctorDiscount: value.doctorDiscount,
          medicineDiscount: value.medicineDiscount,
          familyDiscount: value.familyMemberSubDiscount,
        }));
      }
      return [];
    }, [healthPackages,modalShow]);


  return (
    <div className='m-2'>
        <h3 className='my-1 mt-0 text-center text-title'>Health Packages</h3>
        <div className='underline-Bold mx-auto mb-5'></div>
        {/* <h5 className='my-1 mt-0 text-center text-primary mb-3 text-semibold'>Current active health package subscription:</h5> */}
        <div className="w-100 row m-3 justify-content-center ">
        <SubscribeModal
        title={`Subscribe to our ${healthPackage?.name} Health Package`}
        subheader={``}
        show={modalShow}
        onHide={() => setModalShow(false)} 
        id={healthPackage?.id}
        />
        {packages.map((pack) => (
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">{pack.name} Package</h3>
              <p className="card-subtitle text-primary pb-2 text-center">
              Subscribe for {pack.price}EGP/year
              </p>
              <ul>
                <li><strong className='text-primary'>{pack.doctorDiscount}%</strong> off any doctor's appointment.</li>
                <li><strong className='text-primary'>{pack.medicineDiscount}%</strong> off any medicine ordered from our pharmacy platform.</li>
                <li><strong className='text-primary'>{pack.familyDiscount}%</strong> discount on subscriptions of family members in any package.</li>
              </ul>
            </div>
            <div className="col-md-10 my-3 mb-4 mx-auto">
            <Button text="Subscribe"  variant="md" className="col-md-12" onClick={() => {setHealthPackage(pack); setModalShow(true);}}/>
            </div>
          </div>
        </div>))}
    </div>   
    </div>);
}

export default HealthPackages;
