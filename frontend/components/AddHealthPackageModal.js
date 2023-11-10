import './components.css';
import { createHealthPackage, updateHealthPackage } from '@/app/redux/actions/healthPackagesActions';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
function CenteredModalAddPack(props) {
  const dispatch=useDispatch();

  const { title, subheader, onHide, edit, id  } = props;
  
  const [nameValue, setNameValue] = useState('');
  const [sessionDiscountValue, setSessionDiscountValue] = useState('');
  const [medicineDiscountValue, setMedicineDiscountValue] = useState('');
  const [subscriptionsDiscountValue, setSubscriptionsDiscountValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
    console.log(e.target.value)
  };

  const handleSessionDiscountChange = (e) => {
    setSessionDiscountValue(e.target.value);
  };

  const handleMedicineDiscountChange = (e) => {
    setMedicineDiscountValue(e.target.value);
  };

  const handleSubscriptionsDiscountChange = (e) => {
    setSubscriptionsDiscountValue(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(id)
    if(edit === false){
    dispatch(createHealthPackage({
      "name": nameValue,
      "price": priceValue,
      "doctorDiscount": sessionDiscountValue,
      "medicineDiscount": medicineDiscountValue,
      "familyMemberSubDiscount": subscriptionsDiscountValue
    }))}else{
      const data={}
      if(nameValue) data.name=nameValue;
      if(priceValue) data.price=priceValue;
      if(sessionDiscountValue) data.doctorDiscount=sessionDiscountValue;
      if(medicineDiscountValue) data.medicineDiscount=medicineDiscountValue;
      if(subscriptionsDiscountValue) data.familyMemberSubDiscount=subscriptionsDiscountValue;
      dispatch(updateHealthPackage(id,data))
    }
props.onHide()
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='bg-primary'>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
            {title}
        </Modal.Title>
        <div className='underline-Bold mx-auto mt-2 mb-5'></div>
        <h4>{subheader}</h4>
        <p>
          <form onSubmit={(e)=>{handleSubmit(e)}} className='text-semibold'>
            <div className="row mx-3 mb-1">
              <div className="form-group my-1 col-md-6">
                <label htmlFor="nameInput">Name</label>
                <input
                  onChange={handleNameChange}
                  type="text"
                  className="form-control my-1"
                  id="nameInput"
                  placeholder=""
                  value={nameValue}
                />
              </div>
              <div className="form-group my-1 col-md-6">
                <label htmlFor="priceInput">Price</label>
                <input 
                  onChange={handlePriceChange}
                  type="number"
                  className="form-control my-1"
                  id="priceInput"
                  placeholder=""
                  value={priceValue}
                />
              </div>
            </div>
            <div className="row mx-3">
              <div className="form-group my-1 col-md-6">
                <label htmlFor="sessionDiscountInput">Doctor Session Discount</label>
                <input
                  onChange={handleSessionDiscountChange}
                  type="number"
                  className="form-control my-1"
                  id="sessionDiscountInput"
                  placeholder="xxxx %"
                  value={sessionDiscountValue}
                />
              </div>
              <div className="form-group my-1 col-md-6">
                <label htmlFor="medicineDiscountInput">Medicine Discount</label>
                <input
                  onChange={handleMedicineDiscountChange}
                  type="number"
                  className="form-control my-1"
                  id="medicineDiscountInput"
                  placeholder="xxxx %"
                  value={medicineDiscountValue}
                />
              </div>
            </div>
            <div className="row mx-3">
              <div className="form-group my-1 col-md-6">
                <label htmlFor="subscriptionsDiscountInput">Subscriptions Discount</label>
                <input
                  onChange={handleSubscriptionsDiscountChange}
                  type="number"
                  className="form-control my-1"
                  id="subscriptionsDiscountInput"
                  placeholder="xxxx %"
                  value={subscriptionsDiscountValue}
                />
              </div>
            </div>
            <div className="row justify-content-end align-items-center mt-5 mb-2">
                <button type="submit" className="btn btn-primary mx-auto col-md-4">Submit</button>
            </div>
          </form>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModalAddPack;
