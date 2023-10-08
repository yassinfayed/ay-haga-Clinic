"use client"
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { addFamilyMembers} from '../redux/actions/FamilyMembersAction';

const Home = () => {
   const dispatch = useDispatch();
   dispatch(login("sysadmin","pass1234"))
   const selector = useSelector(state => state.loginReducer.user)
   console.log(selector)
  //  console.log(selector)
  dispatch(addFamilyMembers({
    name: "Farida",
    nationalId: "3021026010fr0377",
    age: 21,
    gender: "Female",
    relationToPatient: "child"
  }))
  const consoleSelector =useSelector(state=>state.addFamilyMembersReducer)
  console.log(consoleSelector);

  return (
    <div>home</div>
  )
}

export default Home