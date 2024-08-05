import React, { useState, useEffect } from 'react';
import { editProjectAPI } from '../services/allApis';
import { Button, Modal } from 'react-bootstrap';
import { BASEURL } from '../services/baseUrl';  // Import BASEURL

function EditProject({ displayData }) {
  const [project, setProject] = useState({
    id: '',
    projectname: '',
    createdDate: '',
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (displayData) {
      setProject({
        id: displayData._id,
        projectname: displayData.projectname,
        createdDate: displayData.createdDate,
      });
    }
  }, [displayData]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    if (displayData) {
      setProject({
        id: displayData._id,
        projectname: displayData.projectname,
        createdDate: displayData.createdDate,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, projectname, createdDate } = project;
  
    if (!projectname || !createdDate) {
      alert('Please fill the form completely.');
      return;
    }
  
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Authentication error. Please log in again.');
      return;
    }
  
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const url = `${BASEURL}/project/edit/${id}`;
      console.log('Making request to:', url);  // Log the URL for debugging
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: reqHeader,
        body: JSON.stringify({ projectname, createdDate }),
      });
  
      if (!response.ok) {
        console.error('Error response from server:', response.status, response.statusText);
        alert('Error updating project. Please try again later.');
        return;
      }
  
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        alert('An unexpected error occurred. Please try again later.');
        return;
      }
  
      if (result.status === 200) {
        handleClose();
      } else {
        console.log(result);
        alert('Failed to update project.');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('An error occurred while updating the project. Please try again later.');
    }
  };
  

  return (
    <>
      <button onClick={handleShow}>EditProject</button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Project Name"
                value={project.projectname}
                onChange={(e) => setProject({ ...project, projectname: e.target.value })}
              /><br />
              <input
                type="date"
                className="form-control"
                placeholder="Created Date"
                value={project.createdDate}
                onChange={(e) => setProject({ ...project, createdDate: e.target.value })}
              /><br />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
