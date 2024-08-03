import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { Modal,Button } from 'react-bootstrap';

function Edit({displayData}) {
    const [show, setShow] = useState(false);
    const handleShow =() =>  setShow(true);
    const handleClose =() => setShow(false)
    console.log(displayData);
  return (
    <>  
    <FaEdit onClick={handleShow} className="text-xl" />
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered>
        <Modal.Header >
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="">
                <input type="text" className="form-control" placeholder='Project Name' value={displayData.description}
                /><br/>
                <input type="text" className="form-control" placeholder='Language Used' value={displayData.createdDate}
                /><br/>
                <div className="flex">
                 <input
                   type="checkbox"
                   id="choose-me"
                   className="peer hidden"
                   checked={displayData.todoStatus}

                   
                 />
                 <label
                   htmlFor="choose-me"
                   className={`select-none cursor-pointer rounded-full py-1 px-4  font-semibold transition-colors duration-200 ease-in-out ${
                     displayData.todoStatus
                       ? "bg-green-500 text-white"
                       : "text-gray-700 bg-gray-300"
                   }`}
                 >
                   {displayData.todoStatus ? "Completed" : "Uncompleted"}
                 </label>
               </div>
               
            </div>
          </div>
         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
  
    </>
  )
}

export default Edit