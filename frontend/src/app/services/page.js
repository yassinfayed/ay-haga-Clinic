'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listHealthPackages } from '@/app/redux/actions/healthPackagesActions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const ServicesPage = () => {

  const dispatch = useDispatch();

  const healthPackages = useSelector((state) => state.getHealthPackagesReducer.healthPackages);
 
  async function fetchData() {
    dispatch(listHealthPackages());
  }
  
  useEffect(() => {
    fetchData();
  }, [dispatch]);
  

  const packages = useMemo(() => {
    if (healthPackages && healthPackages.data) {
      return healthPackages.data.map((value) => ({
        name: value.name, 
        price: value.price,
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyDiscount: value.familyMemberSubDiscount,
      }));
    }
    return [];
  }, [healthPackages]);

  return (
    <div className='w-100'>
      <Navbar/>
      <div className="page-div container justify-content-center align-items-center align-self-center mx-auto m-5 w-100 pb-5">
      <h1 className="text-primary text-center"><strong>Health Packages</strong></h1>
      <h2 className='text-center'>Choose the package that suits your needs</h2>

      <div className="w-100 row mt-5 justify-content-center ">
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
          </div>
        </div>))}
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default ServicesPage;
