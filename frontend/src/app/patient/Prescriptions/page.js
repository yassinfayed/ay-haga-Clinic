'use client'
import React from 'react';
import {useState} from 'react' ;
import { Card} from '../../../../components/Card'; 
import { Button } from '../../../../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ViewPrescription from './ViewPrescriptionModal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { viewALLPrescriptions } from '@/app/redux/actions/prescriptionsActions'; // Import the correct action
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { login } from '@/app/redux/actions/authActions';
import NavbarPatient from '../../../../components/NavbarPatient';


function prescriptions() {
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [name,setName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedPrescription,setSelectedPrescription] = useState(null);


    const dispatch = useDispatch();

    const prescriptions = useSelector((state) => state.viewAllPrescriptionsReducer.prescription);
    const isLoading = useSelector((state) => state.viewAllPrescriptionsReducer.loading);



    const formatDateToISOString = (date) => {
      if (!date) return ''; // Return an empty string if date is falsy
      const utcDate = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ));
      const selected =  utcDate.toUTCString();
      return selected;
    };

    async function fetchData() {
      await dispatch(login('faridashetta', 'password123'));
    
      const queryObj = {
        prescriptionDate: formatDateToISOString(selectedDate),
        name,
        filled_unfilled: selectedStatus,
      };
    
      // Remove properties with empty string values
      const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
        if (queryObj[key] !== '') {
          acc[key] = queryObj[key];
        }
        return acc;
      }, {});
    
      dispatch(viewALLPrescriptions(filteredQueryObj));
    }
    
    useEffect(() => {
      fetchData();
    }, [dispatch, selectedDate, name, selectedStatus]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const presc = useMemo(() => {
    if (prescriptions && prescriptions.data) {
      return prescriptions.data.map((value) => ({
        docName: value.doctorId.name,
        medicines: value.medicines, 
        instructions: value.instructions,
        prescriptionDate: new Date(value.prescriptionDate).toLocaleDateString(),
        filled_unfilled: value.filled_unfilled,
      }));
    }
    return [];
  }, [prescriptions]);


  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setModalShow(true);
  };

  const handleClearFilters = () =>{
    setName('');
    setSelectedDate(null);
    setSelectedStatus(null);
  }



      return (
        <div>
          <NavbarPatient></NavbarPatient>
          <div className="container-fluid my-3">
            <div className="row">
            <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Filter by date"
          className='col-lg-2 mx-lg-3 my-3'
        />
        <select onChange={handleStatusChange} className='col-lg-2 mx-lg-3'>
            <option value="">Filter by status</option>
            <option value="true">Filled</option>
            <option value="false">Unfilled</option>
          </select>
          </div>
          <div className="row my-2 mx-lg-1">
          <input
              type="text"
              className="col-lg-2"
              id="name"
              placeholder="Filter by Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            <Button text="Clear Filters" className="col-lg-3"onClick={handleClearFilters}></Button>
            {presc.map((prescription) => (
              <Card
                className="my-2"
                key={prescription._id}
                title={`Doctor: ${prescription.docName}`}
                subtitle=""
                text={
                  <>
                    <strong>Instructions:</strong> {prescription.instructions}
                    <br />
                    <strong>Prescription Date:</strong>{' '}
                    {prescription.prescriptionDate}
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
          {selectedPrescription && (
            <ViewPrescription
              show={modalShow}
              onHide={() => setModalShow(false)}
              prescription={selectedPrescription}
            />
          )}
          <Footer></Footer>
        </div>
      );
 
}

export default prescriptions;