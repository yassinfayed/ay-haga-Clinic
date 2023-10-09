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
  dispatch(createHealthPackage({ name: "test" }))
  // dispatch(updateHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6", { name: "test" }))
  // const selector = useSelector(state => state.authReducer)
  // const selector = useSelector(state => state.getDrsForPatientsReducer.doctors)
  // const selector = useSelector(state => state.listHealthPackagesReducer)
  // const selector = useSelector(state => state.listHealthPackageDetailsReducer)
  // const selector = useSelector(state => state.deleteHealthPackageReducer)
  const selector = useSelector(state => state.createHealthPackageReducer)
  // const selector = useSelector(state => state.updateHealthPackageReducer)



  useEffect(() => {
    dispatch(login("omarDoe", "password123"))
    dispatch(getDoctorsForPatientAction({}))
    dispatch(listHealthPackages())
    dispatch(listHealthPackageDetails("60f6b0c6f4d7b5b8e0f5b7f6"))
    dispatch(deleteHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6"))
    dispatch(createHealthPackage({ name: "test" }))
    dispatch(updateHealthPackage("60f6b0c6f4d7b5b8e0f5b7f6", { name: "test" }))
  }

    , [dispatch])

  return (

    <div>
      <h1 dr={selector}>Testing</h1>
      {/* print the out */}
      {/* status */}
      <h1 >

      </h1>



    </div>
  )
}

export default Testing

