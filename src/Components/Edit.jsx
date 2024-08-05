import React, { useContext, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import { editTodoAPI } from '../services/allApis';
import { editTodoResponseContext } from '../Context/ContextShare';

function Edit({ displayData }) {
  const {editTodoResponse,setEditTodoResponse} = useContext(editTodoResponseContext)
  const [todo, setTodo] = useState({
    id: displayData._id,
    description: displayData.description,
    createdDate: displayData.createdDate,
    todoStatus: displayData.todoStatus,
    
  });
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTodo({
      id: displayData._id,
      description: displayData.description,
      createdDate: displayData.createdDate,
      todoStatus: displayData.todoStatus,
      
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, description, createdDate, todoStatus } = todo;
    if (!description || !createdDate) {
      alert("Please fill the form completely.");
      return;
    }
    const token = sessionStorage.getItem("token");
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const result = await editTodoAPI(id, todo, reqHeader);
      if (result.status === 200) {
      
        setEditTodoResponse(result.data)
        handleClose();
      } else {
        console.log(result);
     
        handleClose();
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      <FaEdit onClick={handleShow} className="text-xl" />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header>
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder='Project Name'
                value={todo.description}
                onChange={(e) => setTodo({ ...todo, description: e.target.value })}
              /><br />
              <input
                type="text"
                className="form-control"
                placeholder='Created Date'
                value={todo.createdDate}
                onChange={(e) => setTodo({ ...todo, createdDate: e.target.value })}
              /><br />
              <div className="flex">
                <input
                  type="checkbox"
                  id="choose-me"
                  className="peer hidden"
                  checked={todo.todoStatus}
                  onChange={(e) => setTodo({ ...todo, todoStatus: e.target.checked })}
                />
                <label
                  htmlFor="choose-me"
                  className={`select-none cursor-pointer rounded-full py-1 px-4 font-semibold transition-colors duration-200 ease-in-out ${
                    todo.todoStatus ? "bg-green-500 text-white" : "text-gray-700 bg-gray-300"
                  }`}
                >
                  {todo.todoStatus ? "Completed" : "Uncompleted"}
                </label>
              </div>
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

export default Edit;
