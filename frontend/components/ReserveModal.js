import './components.css';
import React, { useEffect, useState, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { viewFamilyMembers } from '@/app/redux/actions/FamilyMembersAction';
import { viewPatientDetails } from '@/app/redux/actions/patientActions';

function ReserveModal(props) {
    const { title, subheader, onHide, id } = props;
    const hourlyRate = props.hourlyRate || 0;

    const dispatch = useDispatch();
    
    const [packageReciever, setPackageReciever] = useState(null);
    const [familyMember, setFamilyMember] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const familyMembers = useSelector((state) => state.viewFamilyMembersReducer.familyMember);
    const isLoading = useSelector((state) => state.addFamilyMembersReducer.loading);
    const patientDetails = useSelector((state) => state.patientViewMyDetailsReducer.patient);
    const patientLoading = useSelector((state) => state.patientViewMyDetailsReducer.loading);
   
    useEffect(() => {
        dispatch(viewFamilyMembers());
        dispatch(viewPatientDetails());
    }, [dispatch, isLoading]);

    const fam = useMemo(() => {
        return familyMembers?.data?.map((value) => ({
            _id: value._id,
            name: value.name,
            nationalId: value.nationalId

        })) || [];
    }, [familyMembers, isLoading]);

    const health = useMemo(() => {
        return patientDetails?.patient?.package?.doctorDiscount || 0;
    }, [patientDetails, patientLoading]);

    const handleRecieverChange = (e) => {
        setPackageReciever(e.target.value);
    };

    const handleFamilyMemberChange = (e) => {
        setFamilyMember(e.target.value);
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!packageReciever || (packageReciever === 'family' && !familyMember) || !paymentMethod) {
            console.log('Please enter all data');
            return;
        }

        setFamilyMember(null);
        setPackageReciever(null);
        setPaymentMethod(null);
        console.log('Submitted');
        onHide();
    };

    return (
        <Modal
        show={props.show} 
        onHide={props.onHide} 
        size="lg" 
        aria-labelledby="contained-modal-title-vcenter" 
        centered
    >
        <Modal.Header closeButton className='bg-primary'></Modal.Header>
            <Modal.Body className='bg-light'>
                <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
                    {title}
                </Modal.Title>
                <div className='underline-Bold mx-auto mt-2 mb-5'></div>
                <h4>{subheader}</h4>
                <Form onSubmit={handleSubmit} className='text-semibold'>
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
        <option value="">Select Family Member</option>
        {fam.map((fam) => (
            <option key={fam._id} value={fam._id}>
            {fam.name} - {fam.nationalId}
            </option>
        ))}

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

            </Modal.Body>
        </Modal>
    );
}

export default ReserveModal;


