'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button } from '../../../../components/Button';
import AddFamily from './AddFamilyMemberModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { viewFamilyMembers } from '@/app/redux/actions/FamilyMembersAction';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { login } from '@/app/redux/actions/authActions';



function Familymembers() {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();



    const familyMembers = useSelector((state) => state.viewFamilyMembersReducer.familyMember);
    const isLoading = useSelector((state) => state. addFamilyMembersReducer.loading);
   


    async function fetchData() {
      dispatch(login('faridashetta', 'password123'));
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

  return (
    <div>

      <Navbar></Navbar>

        <div className="container-fluid my-3">
            <Button text="Add New Family Member"  onClick={() => setModalShow(true)}/>
        </div>

        <AddFamily
        show={modalShow}
        onHide={() => setModalShow(false)} 
        />


    <div className="container-fluid my-3">

       
       
      {fam.map((familymember) => (
        <Card
          className="my-2"
          key={familymember._id}
          title={familymember.name}
          subtitle={`National ID: ${familymember.nationalId}`}
          text={<>
            Age: {familymember.age}
            <br />
            Gender: {familymember.gender}
            <br />
            Relation to Patient: {familymember.relationToPatient}
          </> }
        />
       
      ))}
      
    </div>
    <Footer></Footer>
    </div>
  );
 
}

export default Familymembers;