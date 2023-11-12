import './components.css';
import { registerAction } from '@/app/redux/actions/authActions';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import Image from 'next/image';


function CenteredModalAdmin(props) {
  const dispatch=useDispatch();
  const { title, subheader, onHide } = props;

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordconfirmValue, setPasswordConfrimValue] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
    if (field === 'confirmpassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

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
    console.log('added admin')
    props.onHide()
  }


  return (
    <Modal
      {...props}
      size="lg"
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
                <div className="mb-3 row my-1">
                  <div className="col-md-10">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control py-3"
                      placeholder="Password"
                      name="password"
                      id='passwordInput'
                      value={passwordValue}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-center bg-light rounded">
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="border-0  bg-light rounded mx-auto"
                    >
                      <Image src={showPassword ? "/hide.svg" : "/show.svg"} width={35} height={35} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group my-3 col-md-6">
                <label htmlFor="passwordInput">Confrim Password</label>
                {/* <input
                  onChange={handlePasswordConfrimChange}
                  type="password"
                  className="form-control my-1"
                  id="passwordInput"
                  placeholder="Password"
                  value={passwordconfirmValue}
                /> */}
                <div className="mb-3 row my-1">
                  <div className="col-md-10">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control py-3"
                      placeholder="Password"
                      name="password"
                      id='passwordInput'
                      value={passwordconfirmValue}
                      onChange={handlePasswordConfrimChange}
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-center bg-light rounded">
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmpassword')}
                      className="border-0  bg-light rounded mx-auto"
                    >
                      <Image src={showConfirmPassword ? "/hide.svg" : "/show.svg"} width={35} height={35} />
                    </button>
                  </div>
                </div>
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
