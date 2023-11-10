import './components.css';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Form, Col } from 'react-bootstrap';


function SubscribeModal(props) {
    const { title, subheader, onHide, edit, id, healthPackage  } = props;

    const dispatch=useDispatch();
    
    const [packageReciever, setPackageReciever] = useState('');
    const [familyMember, setFamilyMember] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleFamilyMemberChange = (e) => {
        setFamilyMember(e.target.value);
        console.log(e.target.value)
    }

    const handleRecieverChange = (e) => {
        setPackageReciever(e.target.value);
        console.log(e.target.value)
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!packageReciever || (packageReciever=='family' && !familyMember)){
            console.log('please enter all data')
            return;
        }
        //logic to be added
        // dispatch(func({
        // "data": data,
        // }))
        setFamilyMember(null)
        setPackageReciever(null)
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
                        <Form.Label className='col-md-4'>Subscription reciever:</Form.Label>
                        <div className='col-md-6'>
                        <Form.Check
                            inline
                            type="radio"
                            label="Me"
                            name="radioOption"
                            value="me"
                            checked={packageReciever === 'me'}
                            onChange={handleRecieverChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Family Member"
                            name="radioOption"
                            value="family"
                            checked={packageReciever === 'family'}
                            onChange={handleRecieverChange}
                        />
                        </div>
                    </Form.Group>
                    
                    <Form.Group className='row m-2'>
                        <Form.Label className='col-md-4'>Select Family Member:</Form.Label>
                        <div className='col-md-6'>
                            <Form.Control
                            as="select"
                            disabled={packageReciever === 'me'} 
                            className='col-md-4'
                            onChange={handleFamilyMemberChange}
                            required
                            >
                            <option value={null}>Choose...</option>
                            <option value='Mom'>Mom</option>
                            <option value='Dad'>Dad</option>
                            <option value='Sis'>Sister</option>
                            <option value='Bro'>Brother</option>
                            </Form.Control>
                        </div>
                    </Form.Group>
                    <div className="row justify-content-end align-items-center mt-5 mb-2">
                        <button type="submit" className="btn btn-primary mx-auto col-md-2">Submit</button>
                    </div>
                </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SubscribeModal;
