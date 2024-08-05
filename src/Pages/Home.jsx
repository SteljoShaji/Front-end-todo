import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import { Link } from "react-router-dom";
import AddProject from "../Components/AddProject";






function Home() {
 
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showNewComponent, setShowNewComponent] = useState(false);
 // This useEffect runs only once when the component mounts

  const handleButtonClick = () => {
    setShowNewComponent(!showNewComponent);
  };

  useEffect(() => {
    const existingUser = localStorage.getItem("existingUser");
    if (existingUser) {
      setUsername(JSON.parse(existingUser).username);
    }
  }, []);

  useEffect(() => {
    setLoggedIn(!!sessionStorage.getItem("token"));
  }, []);

  return (
    <>
      {isLoggedIn ? <Link to={"/"} /> : <Link to={"/login"} />}

      <div className="w-screen shadow-sm mb-5 sticky top-0 bg-white">
        <div className="flex justify-between items-center container h-16">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome <span className="text-warning">{username}</span>
            </h1>
          </div>
          <div className="p-4">
            <button onClick={handleButtonClick} className="px-3 py-1 border">
              {showNewComponent ? "Close Project" : "Add Project"}
            </button>
          </div>
        </div>
      </div>
      <ProjectCard/>
      {showNewComponent && <AddProject onClose={() => setShowNewComponent(false)} />}
    </>
  );
}

export default Home;
