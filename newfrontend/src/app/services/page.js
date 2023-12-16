'use client';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listHealthPackages } from '@/app/redux/actions/healthPackagesActions';
import Header from '@/components/Header';


const ServicesPage = () => {
  const dispatch = useDispatch();
  const healthPackages = useSelector((state) => state.getHealthPackagesReducer.healthPackages);

  async function fetchData() {
    dispatch(listHealthPackages());
  }

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  console.log(healthPackages);

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
    <div className='w-full'>
        <Header/>
      <div className="container mx-auto my-10 w-full pb-5 flex flex-col items-center">
        <h2 className='text-blue-500 text-center text-xl pt-5 mt-2 font-semibold'>Health Packages</h2>
        <h1 className=" text-center text-3xl font-bold pb-5">Choose the package that suits your needs</h1>

        <div className="w-full flex flex-wrap justify-center mt-5">
          {packages.map((pack) => (
            <div className="w-full md:w-1/3 p-4">
              <div className="prof rounded-lg shadow-md hover:shadow-lg hover:bg-[#1e2638] transform hover:scale-105 p-10">
                <h3 className="text-center text-xl font-semibold">{pack.name} Package</h3>
                <p className="text-blue-500 pb-6 text-center">
                  Subscribe for {pack.price}EGP/year
                </p>
                <ul>
                  <li><strong className='text-blue-500'>{pack.doctorDiscount}%</strong> off any doctor's appointment.</li>
                  <li><strong className='text-blue-500'>{pack.medicineDiscount}%</strong> off any medicine ordered from our pharmacy platform.</li>
                  <li><strong className='text-blue-500'>{pack.familyDiscount}%</strong> discount on subscriptions of family members in any package.</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="px-5 py-3 my-10 text-lg rounded font-medium text-white border-2 transform hover:scale-105 border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent text-[#007bff]">
            <a href="/signup/patient" class="flex items-center justify-center">
              Sign Up to Access!
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
