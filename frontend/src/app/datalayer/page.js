"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { getDoctorsForPatientAction } from '../redux/actions/doctorActions';
import { listHealthPackages, listHealthPackageDetails, deleteHealthPackage, createHealthPackage, updateHealthPackage } from '../redux/actions/healthPackagesActions';


const Testing = () => {
  const dispatch = useDispatch();
  // dispatch(login("omarDoe", "password123"))
  // dispatch(getDoctorsForPatientAction({}))
  // dispatch(listHealthPackages())
  // dispatch(listHealthPackageDetails("60f6b0c6f4d7b5b8e0f5b7f6"))
  // dispatch(deleteHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6"))
  // dispatch(createHealthPackage({ name: "test" }))
  // dispatch(updateHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6", { name: "test" }))
  // const selector = useSelector(state => state.authReducer)
  // const selector = useSelector(state => state.getDrsForPatientsReducer.doctors)
  // const selector = useSelector(state => state.listHealthPackagesReducer)
  // const selector = useSelector(state => state.listHealthPackageDetailsReducer)
  // const selector = useSelector(state => state.deleteHealthPackageReducer)
  const selector = useSelector(state => state.createHealthPackageReducer)
  // const selector = useSelector(state => state.updateHealthPackageReducer)

  //   name :{
  //     type:  String,
  //     unique: true,
  //     required: [true, "A name is required"],
  //     // enum : ['silver','gold','platinum']
  // },
  // price: {
  //     type: Number,
  //     required: [true, "A price is required"],
  //     //TODO: Default
  // },
  // doctorDiscount: {
  //     type: Number,
  //     required: [true, "Please enter the doctor discount"],
  // },
  // medicineDiscount:{
  //     type: Number,
  //     required: [true, "Please enter the medicine discount"],
  // },
  // familyMemberSubDiscount:{
  //     type: Number,
  //     required: [true, "Please enter the family member subsription discount"],
  // }

  useEffect(() => {
    // dispatch(login("sysAdmin", "pass1234"))
    // dispatch(getDoctorsForPatientAction({}))
    dispatch(listHealthPackages())
    // dispatch(listHealthPackageDetails("60f6b0c6f4d7b5b8e0f5b7f6"))
    // dispatch(deleteHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6"))
    // dispatch(createHealthPackage({
    //   name: "goooo1ooo",
    //   price: 100,
    //   doctorDiscount: 10,
    //   medicineDiscount: 10,
    //   familyMemberSubDiscount: 10
    // }))
    // dispatch(updateHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6", { name: "test" }))
  }

    , [dispatch])

  return (

    <div>
      {/* <h1 dr={selector}>Testing</h1> */}

      <h1 >

      </h1>
    </div>
  )
}

export default Testing

