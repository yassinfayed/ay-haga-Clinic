import './components.css';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Alert } from 'react-bootstrap';
import { changePasswordAction } from '../src/app/redux/actions/authActions'; // Import your changePasswordAction
import Image from 'next/image';

function ChangePassword() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {success, error} = useSelector(state => state.changePasswordReducer);
  const [showError, setShowError] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = () => {
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

  const handleClick = () => {
    if (newPassword !== confirmPassword) {
      setShowError(true);
      return;
    }

    setShowError(false);
    dispatch(changePasswordAction(currentPassword, newPassword));
  };
  const onSubmit = () => {
    
  }
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
    <Card
      key="change-password"
      className="my-2 bg-white px-2 border-0"
      variant='sm'
      title=''
      subtitle={<></>}
      buttonText="Details"
      onClickButton={() => {}}>  
    <div className="container">
    <div className="row global-text">
      <h5 className="mx-auto text-primary text-center text-bold mt-3">
        Change Password
      </h5>
      <hr />
      <div className="px-4 text-center">
        <div className="mb-1">
          <label htmlFor="oldPassword" className="form-label text-semibold">
            Old Password
          </label>
          <div className="row">
            <div className="col-md-10">
              <input
                type={showOldPassword ? 'text' : 'password'}
                className={`form-control ${error? "invalid" : ""}`}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-center bg-white rounded">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('oldPassword')}
                  className="border-0  bg-white rounded"
                >
                  <Image src={showOldPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                </button>
              </div>
          </div>
        </div>
        <div className="">
          <div className="mb-1 ">
            <label htmlFor="newPassword" className="form-label text-semibold">
              New Password
            </label>
            <div className="row">
              <div className="col-md-10">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className={`form-control ${error? "invalid" : ""}`}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-center bg-white rounded">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="border-0  bg-white rounded"
                >
                  <Image src={showNewPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="confirmPassword" className="form-label text-semibold">
              Confirm Password
            </label>
            <div className="row">
              <div className="col-md-10">               
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control ${error? "invalid" : ""}`}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-center bg-white rounded">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="border-0  bg-white rounded"
                >
                  <Image src={showConfirmPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary my-3"
          onClick={handlePasswordChange}
        >
          Confirm
        </button>
      </div>
    </div>
  </div></Card>
</div>
  );
}

export default ChangePassword;
