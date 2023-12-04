import './components.css';
import { createHealthPackage, updateHealthPackage } from '@/app/redux/actions/healthPackagesActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function CenteredModalAddPack(props) {
  const dispatch=useDispatch();

  const { title, subheader, onHide, edit, id  } = props;

  const [nameValue, setNameValue] = useState('');
  const [sessionDiscountValue, setSessionDiscountValue] = useState('');
  const [medicineDiscountValue, setMedicineDiscountValue] = useState('');
  const [subscriptionsDiscountValue, setSubscriptionsDiscountValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const CreateisFail = useSelector(state=>state.createHealthPackageReducer.error)
  const UpdateisFail = useSelector(state=>state.updateHealthPackageReducer.error)

  const [showAlertCreateSuccess, setShowAlertCreateSuccess] = useState(false);
  const [showAlertCreateFail, setShowAlertCreateFail] = useState(false);
  const [showAlertCreateLoading, setShowAlertCreateLoading] = useState(false);
  const [showAlertUpdateSuccess, setShowAlertUpdateSuccess] = useState(false);
  const [showAlertUpdateFail, setShowAlertUpdateFail] = useState(false);
  const [showAlertUpdateLoading, setShowAlertUpdateLoading] = useState(false);
  if(edit){
    const {data}=props;
  useEffect(() => {
    if (edit && data) {
      setNameValue(data.name || '');
      setSessionDiscountValue(data.doctorDiscount || '');
      setMedicineDiscountValue(data.medicineDiscount || '');
      setSubscriptionsDiscountValue(data.familyMemberSubDiscount || '');
      setPriceValue(data.price || '');
    }
  }, [edit, data]);

  }

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
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
  if(priceValue < 0 || sessionDiscountValue > 100 || medicineDiscountValue > 100 || subscriptionsDiscountValue > 100){
  return;
  } 
    else if(edit === false){
    setShowAlertCreateLoading(true);
    setShowAlertCreateFail(false);
    setShowAlertCreateSuccess(false);
    dispatch(createHealthPackage({
      "name": nameValue,
      "price": priceValue,
      "doctorDiscount": sessionDiscountValue,
      "medicineDiscount": medicineDiscountValue,
      "familyMemberSubDiscount": subscriptionsDiscountValue
    })).then(()=>{
      setShowAlertCreateLoading(false);
      if (CreateisFail){
        setShowAlertCreateFail(true);
        const timer = setTimeout(() => {
          setShowAlertCreateFail(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
      else{
        setShowAlertCreateSuccess(true);
        const timer = setTimeout(() => {
          setShowAlertCreateSuccess(false);
        }, 3000);
        setTimeout(() => {
          props.onHide();
          setNameValue('');
          setSessionDiscountValue('');
          setMedicineDiscountValue('');
          setSubscriptionsDiscountValue('');
          setPriceValue('');
    
        }, 900);
        return () => clearTimeout(timer);
      }
    }
    )}else{
      const data={}
      if(nameValue) data.name=nameValue;
      if(priceValue) data.price=priceValue;
      if(sessionDiscountValue) data.doctorDiscount=sessionDiscountValue;
      if(medicineDiscountValue) data.medicineDiscount=medicineDiscountValue;
      if(subscriptionsDiscountValue) data.familyMemberSubDiscount=subscriptionsDiscountValue;

      setShowAlertUpdateLoading(true);
      setShowAlertUpdateFail(false);
      setShowAlertUpdateSuccess(false);
      dispatch(updateHealthPackage(id,data)).then(()=>{
        setShowAlertUpdateLoading(false);
        if (UpdateisFail){
          setShowAlertUpdateFail(true);
          const timer = setTimeout(() => {
            setShowAlertUpdateFail(false);
          }, 3000);

          return () => clearTimeout(timer);
        }
        else{
          setShowAlertUpdateSuccess(true);
        
          const timer = setTimeout(() => {
            setShowAlertUpdateSuccess(false);
            
          }, 3000);
          setTimeout(() => {
            props.onHide();
            setNameValue('');
            setSessionDiscountValue('');
            setMedicineDiscountValue('');
            setSubscriptionsDiscountValue('');
            setPriceValue('');
      
          }, 900);

          return () => clearTimeout(timer);
        }
      }
      )
    }
  
 

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='bg-primary'></Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
            {title}
        </Modal.Title>
        {showAlertCreateLoading && (
          <Alert variant="primary" className="text-center">
            Creating health package...
          </Alert>
        )}
        {showAlertCreateSuccess && (
          <Alert variant="success" className="text-center">
            Health package created successfully!
          </Alert>
        )}
        {showAlertCreateFail && (
          <Alert variant="danger" className="text-center">
            Failed to create health package!
          </Alert>
        )}
        {showAlertUpdateLoading && (
          <Alert variant="primary" className="text-center">
            Updating health package...
          </Alert>
        )}
        {showAlertUpdateFail && (
          <Alert variant="danger" className="text-center">
            Failed to update health package!
          </Alert>
        )}
        {showAlertUpdateSuccess && (
          <Alert variant="success" className="text-center">
            Health package updated successfully!
          </Alert>
        )}
        <hr className='mx-auto mt-2 mb-5' /> 
        <h4>{subheader}</h4>
        <Form onSubmit={handleSubmit} className='text-semibold'>
          <Row className="mx-3 mb-1">
            <Form.Group as={Col} md="6" className="my-1">
              <Form.Label htmlFor="nameInput">Name</Form.Label>
              <Form.Control
                onChange={handleNameChange}
                type="text"
                id="nameInput"
                placeholder=""
                value={nameValue}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="my-1">
              <Form.Label htmlFor="priceInput">Price</Form.Label>
              <Form.Control 
                onChange={handlePriceChange}
                type="number"
                id="priceInput"
                placeholder=""
                value={priceValue}
                isInvalid={priceValue < 0}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mx-3">
            <Form.Group as={Col} md="6" className="my-1">
              <Form.Label htmlFor="sessionDiscountInput">Doctor Session Discount</Form.Label>
              <Form.Control
                onChange={handleSessionDiscountChange}
                type="number"
                id="sessionDiscountInput"
                placeholder="xxxx %"
                value={sessionDiscountValue}
                isInvalid={sessionDiscountValue > 100}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid discount.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" className="my-1">
              <Form.Label htmlFor="medicineDiscountInput">Medicine Discount</Form.Label>
              <Form.Control
                onChange={handleMedicineDiscountChange}
                type="number"
                id="medicineDiscountInput"
                placeholder="xxxx %"
                value={medicineDiscountValue}
                isInvalid={medicineDiscountValue > 100}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid discount.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mx-3">
            <Form.Group as={Col} md="6" className="my-1">
              <Form.Label htmlFor="subscriptionsDiscountInput">Subscriptions Discount</Form.Label>
              <Form.Control
                onChange={handleSubscriptionsDiscountChange}
                type="number"
                id="subscriptionsDiscountInput"
                placeholder="xxxx %"
                value={subscriptionsDiscountValue}
                isInvalid={subscriptionsDiscountValue > 100}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid discount.
              </Form.Control.Feedback>
            </Form.Group>
            
          </Row>
          <Row className="justify-content-end align-items-center mt-5 mb-2">
            <Col md="auto">
              <Button type="submit" className="btn-primary">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModalAddPack;
