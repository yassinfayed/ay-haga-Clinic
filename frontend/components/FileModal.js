import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { downloadPatientDocs } from '@/app/redux/actions/patientActions';
import { removeDocsAction } from '@/app/redux/actions/patientActions';

const FileModal = ({ show, onHide, filePath, isPdf, fileName , onDelete}) => {
  const dispatch = useDispatch();
  const role = JSON.parse(localStorage.getItem('userInfo')).data.user.role;
  const handleDownload = () => {
    dispatch(downloadPatientDocs(fileName));
  };

  const handleRemove = () => {
    dispatch(removeDocsAction(fileName)).then(() => {
      onHide();
      onDelete();
    });
  };

  const fileNameWithoutPathAndDate = fileName.replace(/^.*[\\\/]/, '').replace(/\d+-/g, '');

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {fileNameWithoutPathAndDate}
          {role==='patient' && <Button className="mx-4" onClick={handleDownload}>
            Download
          </Button>} 
          {role==='patient' && <Button onClick={handleRemove}>Delete</Button>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isPdf ? (
          <iframe src={filePath} title="PDF Preview" width="100%" height="500px" />
        ) : (
          <img src={filePath} alt="Preview" className="img-fluid" />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
