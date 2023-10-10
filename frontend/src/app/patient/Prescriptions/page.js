'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button } from '../../../../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import ViewPrescription from './ViewPrescriptionModal';

function prescriptions() {
    const [modalShow, setModalShow] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const prescriptions = [
        {
          _id: 1,
          patientId: 'yourPatientIdHere1',
          doctorId: 'yourDoctorIdHere1',
          medicines: [
            {
              medicine: 'Medicine 1',
              dosage: '10mg',
              frequency: 'Twice daily',
              startDate: new Date(),
              endDate: new Date(),
            },
            {
                medicine: 'Medicine 2',
                dosage: '20mg',
                frequency: 'Once daily',
                startDate: new Date(),
                endDate: new Date(),
              },
            // Add more medicines if needed
          ],
          instructions: 'Take as directed',
          prescriptionDate: new Date(),
          filled_unfilled: true,
        },
        {
          _id: 2,
          patientId: 'yourPatientIdHere2',
          doctorId: 'yourDoctorIdHere2',
          medicines: [
            {
              medicine: 'Medicine 2',
              dosage: '20mg',
              frequency: 'Once daily',
              startDate: new Date(),
              endDate: new Date(),
            },
            // Add more medicines if needed
          ],
          instructions: 'Take with food',
          prescriptionDate: new Date(),
          filled_unfilled: false,
        },
        {
          _id: 3,
          patientId: 'yourPatientIdHere3',
          doctorId: 'yourDoctorIdHere3',
          medicines: [
            {
              medicine: 'Medicine 3',
              dosage: '5mg',
              frequency: 'Three times daily',
              startDate: new Date(),
              endDate: new Date(),
            },
            // Add more medicines if needed
          ],
          instructions: 'Take on an empty stomach',
          prescriptionDate: new Date(),
          filled_unfilled: true,
        },
        {
          _id: 4,
          patientId: 'yourPatientIdHere4',
          doctorId: 'yourDoctorIdHere4',
          medicines: [
            {
              medicine: 'Medicine 4',
              dosage: '15mg',
              frequency: 'Once daily',
              startDate: new Date(),
              endDate: new Date(),
            },
            // Add more medicines if needed
          ],
          instructions: 'Take before bedtime',
          prescriptionDate: new Date(),
          filled_unfilled: true,
        },
        {
          _id: 5,
          patientId: 'yourPatientIdHere5',
          doctorId: 'yourDoctorIdHere5',
          medicines: [
            {
              medicine: 'Medicine 5',
              dosage: '25mg',
              frequency: 'Once daily',
              startDate: new Date(),
              endDate: new Date(),
            },
            // Add more medicines if needed
          ],
          instructions: 'Take with plenty of water',
          prescriptionDate: new Date(),
          filled_unfilled: false,
        },
        // Add more prescription objects as needed
      ];
      
      
      
      const handleViewPrescription = (prescription) => {
        setSelectedPrescription(prescription);
        setModalShow(true);
      };




      return (
        <div>
          <Navbar />
          <div className="container-fluid my-3">
            {prescriptions.map((prescription) => (
              <Card
                className="my-2"
                key={prescription._id}
                title={`Doctor: ${prescription.doctorId}`}
                subtitle=""
                text={
                  <>
                    <strong>Instructions:</strong> {prescription.instructions}
                    <br />
                    <strong>Prescription Date:</strong>{' '}
                    {prescription.prescriptionDate.toLocaleDateString()}
                    <br />
                    <strong>Filled/Unfilled:</strong>{' '}
                    {prescription.filled_unfilled ? 'Filled' : 'Unfilled'}
                    <br />
                    <Button
                      text="View Prescription"
                      onClick={() => handleViewPrescription(prescription)}
                    />
                  </>
                }
              />
            ))}
          </div>
          <Footer />
          {selectedPrescription && (
            <ViewPrescription
              show={modalShow}
              onHide={() => setModalShow(false)}
              prescription={selectedPrescription}
            />
          )}
        </div>
      );
 
}

export default prescriptions;

