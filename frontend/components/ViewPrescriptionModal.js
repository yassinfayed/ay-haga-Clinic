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
        {prescription.medicines.map((medicine, index) => (
            <div className="row text-center">
          <div key={index}>
            <strong>Medicine:</strong> {medicine.medicine}
            <br />
            <strong>Dosage:</strong> {medicine.dosage}
            <br />
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
            <hr /> {/* Add an <hr> tag after each medicine */}
          </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewPrescription;
