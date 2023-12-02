import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { downloadPatientDocs } from '@/app/redux/actions/patientActions';
import { removeDocsAction } from '@/app/redux/actions/patientActions';


const FileModal = ({ show, onHide, filePath, isPdf, fileName , onDelete}) => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const role = JSON.parse(localStorage.getItem('userInfo'))?.data.user.role;

  const handleDownload = () => {
    dispatch(downloadPatientDocs(fileName));
  };

  const handleRemove = () => {
    if(!deleteConfirm)
      return;
    dispatch(removeDocsAction(fileName)).then(() => {
      onDelete();
      onHide();
    });
    setDeleteConfirm(false);
  };


  const fileNameWithoutPathAndDate = fileName.replace(/^.*[\\\/]/, '').replace(/\d+-/g, '');

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className='row col-md-12'>
          <div className="col-md-6">
            {fileNameWithoutPathAndDate}
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            {role==='patient' && <Button className="mx-2 bg-primary" onClick={handleDownload}>Download</Button>} 
            {role==='patient' && <Button className="mx-2 bg-dark" onClick={()=> {setDeleteConfirm(true);}}>Delete</Button>}
          </div>
        </Modal.Title>
      </Modal.Header>
        <div className="row col-md-11 mx-auto mt-2">
        {deleteConfirm && <Alert variant="danger" className='row align-items-center' >
          <div className='col-md-8'><strong>Warning!</strong> Are you sure you want to delete this file?</div>
          <div className="d-flex justify-content-end col-md-4">
            <Button className="mx-2 bg-danger" onClick={()=>handleRemove()}>Confirm</Button>
            <Button className="mx-2 bg-dark" onClick={()=>setDeleteConfirm(false)}>Cancel</Button>
          </div>
        </Alert>}
        </div>
      <Modal.Body>
        {isPdf ? (
          <iframe src={filePath} title="PDF Preview" width="100%" height="500px" />
        ) : (
          <img src={filePath} alt="Preview" className="img-fluid" />
        )}
      </Modal.Body>
      <Modal.Footer className="p-5">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
