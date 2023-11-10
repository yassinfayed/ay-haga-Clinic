import './components.css';
import { registerAction } from '@/app/redux/actions/authActions';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';


function CenteredModalAdmin(props) {
  const dispatch=useDispatch();
  const { title, subheader, onHide } = props;

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordconfirmValue, setPasswordConfrimValue] = useState('');
  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
    //console.log(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handlePasswordConfrimChange = (e) => {
    setPasswordConfrimValue(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    dispatch(registerAction({
      "username": usernameValue,
      "password": passwordValue,
      "passwordConfirm": passwordconfirmValue,
      "role": "administrator"
    }))
props.onHide()
  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='rounded'
    >
    <Modal.Header closeButton className='bg-primary'>
    </Modal.Header>
    <Modal.Body className='bg-light'>
        <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
            {title}
        </Modal.Title>
        <div className='underline-Bold mx-auto mt-2 mb-5'></div>
        <h4>{subheader}</h4>
          <form onSubmit={(e)=>handleSubmit(e)} className='text-semibold mx-3'>
            <div className="mt-3 row">
              <label htmlFor="usernameInput ">Username</label>
              <input
                onChange={handleUsernameChange}
                type="text"
                className="form-control ms-2 my-1"
                id="usernameInput"
                placeholder="Enter Username"
                value={usernameValue}
              />
            </div>
            <div className='row'>
              <div className="form-group my-3 col-md-6">
                <label htmlFor="passwordInput">Password</label>
                <input
                  onChange={handlePasswordChange}
                  type="password"
                  className="form-control my-1"
                  id="passwordInput"
                  placeholder="Password"
                  value={passwordValue}
                />
              </div>
              <div className="form-group my-3 col-md-6">
                <label htmlFor="passwordInput">Confrim Password</label>
                <input
                  onChange={handlePasswordConfrimChange}
                  type="password"
                  className="form-control my-1"
                  id="passwordInput"
                  placeholder="Password"
                  value={passwordconfirmValue}
                />
              </div>
            </div>

            <div className="row justify-content-end align-items-center mt-5 mb-2">
                <button type="submit" className="btn btn-primary mx-auto col-md-4">Submit</button>
            </div>
          </form>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModalAdmin;
