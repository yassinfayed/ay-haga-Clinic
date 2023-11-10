'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button } from '../../../../components/Button';
import AddFamily from '../../../../components/AddFamilyMemberModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { viewFamilyMembers } from '@/app/redux/actions/FamilyMembersAction';
import { useEffect } from 'react';
import { useMemo } from 'react';



function Familymembers() {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const familyMembers = useSelector((state) => state.viewFamilyMembersReducer.familyMember);
    const isLoading = useSelector((state) => state. addFamilyMembersReducer.loading);
   
    async function fetchData() {
      dispatch(viewFamilyMembers());
    }
    
    useEffect(() => {
      fetchData();
    }, [dispatch,isLoading,modalShow]);
    

    const fam = useMemo(() => {
      if (familyMembers && familyMembers.data) {
        return familyMembers.data.map((value) => ({
          name: value.name, 
          nationalId: value.nationalId,
          age: value.age,
          gender: value.gender,
          relationToPatient: value.relationToPatient,
        }));
      }
      return [];
    }, [familyMembers,modalShow,isLoading]);

    console.log(fam)

  return (
    <div className='m-2 container-fluid'>
      <h3 className='my-1 mt-0 text-center text-title'>Family Members</h3>
      <div className='underline-Bold mx-auto mb-5'></div>
      <div className="row justify-content-end align-items-center me-5">
          <Button text="Add New Family Member" variant='md' className='ms-auto me-4 col-md-3' onClick={() => setModalShow(true)}/>
      </div>
      <AddFamily
      show={modalShow}
      onHide={() => setModalShow(false)} 
      title="Add family member"
      />
      <div className="my-3 row mx-auto col-md-12">
        {fam.map((familymember) => (
          <Card
            className="mx-5 my-4 col-md-3 bg-light"
            key={familymember._id}
            title={familymember.name}
            subtitle={`National ID: ${familymember.nationalId}`}
            text={<div className='text-semibold text-global text-capitalize'>
                  Age: {familymember.age}
                  <br />
                  Gender: {familymember.gender}
                  <br />
                  Relation:  {familymember.relationToPatient}
                </div> }
          />
        ))}
      </div>
    </div>
  );
 
}

export default Familymembers;
