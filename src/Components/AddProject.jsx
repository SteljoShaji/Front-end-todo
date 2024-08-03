import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from "../services/allApis";

const AddProject = ({ onClose }) => {
  
  const [token, setToken] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    projectname: "",
    createdDate: "",
    userId: ""
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const { projectname, createdDate } = projectDetails;
    if (!projectname || !createdDate) {
      toast.info("Please fill in the form completely!");
      return;
    }

    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const result = await addProjectAPI(projectDetails, reqHeader);
      if (result.status === 200) {
        toast.success(`Project '${result.data.projectname}' added successfully.`);
        setProjectDetails({ projectname: "", createdDate: "", userId: "" });

        
        handleClose();
      } else {
        toast.warning(`Failed to add project: ${result.response.data}`);
      }
    } catch (error) {
      toast.error(`Error adding project: ${error.message}`);
    }
  };

  useEffect(() => {
    const existingUser = localStorage.getItem("existingUser");
    const storedToken = sessionStorage.getItem("token");
    if (existingUser && storedToken) {
      const userId = JSON.parse(existingUser)._id;
      setProjectDetails(prevDetails => ({ ...prevDetails, userId }));
      setToken(storedToken);
    }
  }, []);

  const handleClose = () => {
    setProjectDetails({ projectname: "", createdDate: "", userId: "" });
    onClose(); // Ensure that the `onClose` prop is called to close the modal
  };

  return (
    <>
      <div className="absolute top-0 bg-gray-600/20 w-screen h-screen">
        <div className="bg-white my-[150px] w-1/2 mx-auto">
          <div className="flex flex-col items-end">
            <button
              onClick={handleClose}
              className="mt-2 px-3 flex justify-end w-fit text-end py-1 border bg-red-500 text-white"
            >
              x
            </button>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-md text-center">
            <h1 className="text-primary font-bold text-2xl mb-4">Project Name</h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Project Name"
                className="border border-border p-2 rounded w-full"
                value={projectDetails.projectname}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    projectname: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                placeholder="Created Date"
                className="border border-border p-2 rounded w-full"
                value={projectDetails.createdDate}
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    createdDate: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={handleSave}
              className="me-2 bg-primary text-primary-foreground hover:bg-primary/80 mt-4 p-2 rounded"
            >
              Add Project
            </button>
            <button
              onClick={handleClose}
              className="me-2 bg-success text-accent-foreground hover:bg-accent/80 mt-4 p-2 rounded"
            >
              Clear
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="colored"
          />
        </div>
      </div>
    </>
  );
};

export default AddProject;
