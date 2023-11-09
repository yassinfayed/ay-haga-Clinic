import { createHealthPackage, updateHealthPackage } from '@/app/redux/actions/healthPackagesActions';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';


function SubscribeModal(props) {
    const { title, subheader, onHide, edit, id, healthPackage  } = props;

    const dispatch=useDispatch();
    
    const [packageReciever, setPackageReciever] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();

        //logic to be added
        // dispatch(func({
        // "data": data,
        // }))
        props.onHide()
    }

    const handlePackageRecieverChange = ()=>{
        //logic to be added
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter text-primary text-bold text-center">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{subheader}</h4>
                <div>
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    {/* data fields to be added */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SubscribeModal;
