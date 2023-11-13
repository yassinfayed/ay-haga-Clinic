import './components.css';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { viewFamilyMembers } from '@/app/redux/actions/FamilyMembersAction';
import { useMemo } from 'react';
import {viewPatientDetails} from '@/app/redux/actions/patientActions';

function ReserveModal(props) {
    const { title, subheader, onHide, id ,hourlyRate} = props;

    const dispatch=useDispatch();
    
    const [packageReciever, setPackageReciever] = useState(null); //package reciever me or fam?
    const [familyMember, setFamilyMember] = useState(null);  //fam member national id
    const [paymentMethod, setPaymentMethod] = useState(null);  //wallet or card

    const familyMembers = useSelector((state) => state.viewFamilyMembersReducer.familyMember);
    const isLoading = useSelector((state) => state. addFamilyMembersReducer.loading);
    const patientDetails = useSelector((state) => state.viewPatientDetailsReducer);



    async function fetchData() {
        dispatch(viewFamilyMembers());
        dispatch(viewPatientDetails());
      }
      
      useEffect(() => {
        fetchData();
      }, [dispatch,isLoading]);

    
    const fam = useMemo(() => {
        if (familyMembers && familyMembers.data) {
          return familyMembers.data.map((value) => ({
            name: value.name, 
          }));
        }
        return [];
      }, [familyMembers,isLoading]);

      const health = useMemo(() => {
        if (patientDetails && patientDetails.data && patientDetails.data.healthPackage){
          return patientDetails.data.package.doctorDiscount;
        }
        return null;

      }, [patientDetails,isLoading]);
      
    console.log(health)
      console.log(fam)

    const handleRecieverChange = (e) => {
        setPackageReciever(e.target.value);
        console.log(e.target.value)
    };


    const handleFamilyMemberChange = (e) => {
        setFamilyMember(e.target.value);
        console.log(e.target.value)
    }


    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!packageReciever || (packageReciever=='family' && !familyMember) || !paymentMethod){
            console.log('please enter all data')
            return;
        }
        //logic to be added
        // dispatch(func({
        // "data": data,
        // }))
        setFamilyMember(null)
        setPackageReciever(null)
        setPaymentMethod(null)
        console.log('submitted')
        props.onHide()
    }


    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton className='bg-primary'>
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
                    {title}
                </Modal.Title>
                <div className='underline-Bold mx-auto mt-2 mb-5'></div>
                <h4>{subheader}</h4>
                <div>
                <Form onSubmit={(e)=>{handleSubmit(e)}} className='text-semibold'>
                    <Form.Group className='row m-2'>
                        <Form.Label className='col-md-4'>Appointments Reciever *</Form.Label>
                        <div className='col-md-6'>
                        <Form.Check
                            inline
                            type="radio"
                            label="Me"
                            name="packageReciever"
                            value="me"
                            checked={packageReciever === 'me'}
                            onChange={(e)=>handleRecieverChange(e)}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Family Member"
                            name="packageReciever"
                            value="family"
                            checked={packageReciever === 'family'}
                            onChange={(e)=>handleRecieverChange(e)}
                        />
                        </div>
                    </Form.Group>
                    
                    <Form.Group className='row m-2'>
                        <Form.Label className='col-md-4'>Family Member {packageReciever==='family'? "*":""}</Form.Label>
                        <div className='col-md-6'>
                            <Form.Control
                            as="select"
                            disabled={packageReciever === 'me'} 
                            className='col-md-4'
                            onChange={handleFamilyMemberChange}
                            required
                            >
                            <option value={null}>Choose...</option>
                            {fam.map((mem)=>(<option value={mem.nationalId}>{mem.name}</option>))}
                            </Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group className='row m-2'>
                        <Form.Label className='col-md-4'>Payment Method *</Form.Label>
                        <div className='col-md-6'>
                        <Form.Check
                            inline
                            type="radio"
                            label="Wallet"
                            name="paymentMethod"
                            value="wallet"
                            checked={paymentMethod === 'wallet'}
                            onChange={(e)=>handlePaymentChange(e)}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Credit Card"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e)=>handlePaymentChange(e)}
                        />
                        </div>
                    </Form.Group>
                    
                    <div className='row m-2'>
                        <div className='col-md-4'>Total Price</div>
                        <div className='col-md-6 d-flex align-items-center'>
                            {health ? (
                                <>
                                    <div className='text-decoration-line-through'>
                                        {hourlyRate.toFixed(2)}
                                    </div>
                                    <div className='ms-3'>
                                        {(hourlyRate - hourlyRate * health / 100).toFixed(2)}
                                    </div>
                                </>
                            ) : (
                                <div>
                                    {hourlyRate.toFixed(2)}
                                </div>
                            )}
                        </div>
                    </div>

                
                    <div className="row justify-content-end align-items-center mt-5 mb-2">
                        <button type="submit" className="btn btn-primary mx-auto col-md-2">Submit</button>
                    </div>
                </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ReserveModal;
