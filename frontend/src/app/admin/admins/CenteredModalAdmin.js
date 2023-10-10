import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function CenteredModalAdmin(props) {
  const { title, subheader, onHide } = props;

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
    console.log(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{subheader}</h4>
        <p>
          <form>
            <div className="form-group my-3">
              <label htmlFor="usernameInput">Username</label>
              <input
                onChange={handleUsernameChange}
                type="text"
                className="form-control my-1"
                id="usernameInput"
                placeholder="Enter Username"
                value={usernameValue}
              />
            </div>
            <div className="form-group my-3">
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CenteredModalAdmin;
