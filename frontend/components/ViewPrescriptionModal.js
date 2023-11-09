import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewPrescription(props) {
  const { title, onHide, prescription } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Medicines:</h4>
        <div className="row text-start">

          {prescription.medicines.map((medicine, index) => (
            <div className='card col mx-2' key={index}>
              <strong>Medicine:</strong> {medicine.medicine} ({medicine.dosage})
              <strong>Frequency:</strong> {medicine.frequency}
              <br />
              <strong>Start Date:</strong>{' '}
              {new Date(medicine.startDate).toLocaleDateString()}
              {medicine.endDate && (
                <>
                  <br />
                  <strong>End Date:</strong>{' '}
                  {new Date(medicine.endDate).toLocaleDateString()}
                </>
              )}
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewPrescription;
