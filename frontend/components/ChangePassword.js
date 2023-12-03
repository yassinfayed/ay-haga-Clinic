import './components.css';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAction } from '../src/app/redux/actions/authActions'; // Import your changePasswordAction
import Image from 'next/image';
import {
  Alert, 
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { validatePassword } from '@/app/assets/validators';


function ChangePassword() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {success, error} = useSelector(state => state.changePasswordReducer);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = () => {
    if(!passwordMatch || !validatePassword(newPassword))
      return;
    dispatch(changePasswordAction({
        passwordCurrent: oldPassword,
        password: newPassword,
        passwordConfirm: confirmPassword 
    }))
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'oldPassword') {
      setShowOldPassword(!showOldPassword);
    }
    if (field === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    }
    if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handlePasswordConfirmChange = (e) => {
    const confirmPasswordCurr = e.target.value;
    setPasswordMatch(
      newPassword === confirmPasswordCurr ||
        confirmPassword === confirmPasswordCurr
    );
  };


  return (
    <div className='mx-auto'>
     <div>
      {success ? (
        <Alert variant="success" dismissible>
          <strong>Success!</strong> Password successfully changed.
        </Alert>
      ) : error && (
        <Alert variant="danger" dismissible>
          <strong>Error!</strong> Invalid fields.
        </Alert>
      )}
    </div>

    <div className="global-text">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={11}>
            <h5 className="text-primary text-center text-bold mt-3">
              Change Password
            </h5>
            <hr className='mb-4'/>

            {/* Old Password Field */}
            <Form.Group as={Row} className="mb-3" controlId="oldPassword">
              <Form.Label column md={12} className="text-semibold pl-3">
                Old Password
              </Form.Label>
              <Row>
              <Col md={10}>
                <Form.Control
                  type={showOldPassword ? 'text' : 'password'}
                  isInvalid={error} //write validation instead of error
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Old Password is incorrect.
                </Form.Control.Feedback>
              </Col>
              <Col md={2} className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => togglePasswordVisibility('oldPassword')}
                  className="bg-white rounded"
                >
                  <Image src={showOldPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                </Button>
              </Col>
              </Row>
            </Form.Group>

            {/* New Password Field */}
            <Form.Group as={Row} className="mb-3" controlId="newPassword">
              <Form.Label column md={12} className="text-semibold pl-3">
                New Password
              </Form.Label>
              <Row>
              <Col md={10}>
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  isInvalid={newPassword && !validatePassword(newPassword)} //write validation instead of error
                  value={newPassword}
                  onChange={(e) => {setNewPassword(e.target.value);handlePasswordConfirmChange(e);}}
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least 8 characters,
                  including 1 uppercase letter and 1 digit.
                </Form.Control.Feedback>
              </Col>
              <Col md={2} className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="bg-white rounded"
                >
                  <Image src={showNewPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                </Button>
              </Col>
              </Row>
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
              <Form.Label column md={12} className="text-semibold">
                Confirm Password
              </Form.Label>
              <Row>
              <Col md={10}>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  isInvalid={!passwordMatch} //write validation instead of error
                  value={confirmPassword}
                  onChange={(e) => {setConfirmPassword(e.target.value);handlePasswordConfirmChange(e)}}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </Col>
              <Col md={2} className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="bg-white rounded"
                >
                  <Image src={showConfirmPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                </Button>
              </Col>
              </Row>
            </Form.Group>

            {/* Submit Button */}
            <Row className="justify-content-md-center">
              <Col md={6}>
                <Button className="btn btn-primary my-3 w-100" onClick={handlePasswordChange}>
                  Confirm
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>

</div>
  );
}

export default ChangePassword;
