import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ForgotPassword(props) {
  const { title, onHide, prescription, version } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Forgot your password?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        <h4>Please enter your recovery email below..</h4>
            <div className="row text-start">
                <input type="email" className='form-control'/>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ForgotPassword;
