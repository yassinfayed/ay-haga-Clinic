"use client"
const { default: Box } = require("./Box");
import "./Box.css"
import Link from 'next/link'

export default function AdminHomePage(){
return(
  <>
   <div className="d-lg-flex justify-content-center align-items-center min-vh-100">
    <Box head="View Doctor Apps"></Box>
    <Box head="Add new Admin"></Box>
    <Box head="View Health Packages"></Box>
    </div>
      
      </>
)}