import React, { useState, useContext } from 'react';
import UserContext from "../context/user/UserContext";
import Chats from '../Components/Chats';
import { Link } from 'react-router-dom';

const ChatDispaly = () => {
  const [input, setinput] = useState("");
  const context = useContext(UserContext);
  const { user, getchat } = context;

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    getchat(input);
    console.log("sent");
  }

  const onchange = (e) => {
    setinput(e.target.value);
  }

  return (
    <>
      <Chats />
      <div className='container d-flex justify-content-center fixed-bottom p-4'>
        {user ? ( // Check if user is not null
          <>
            <input type="text" onChange={onchange} className="w-100 align-center rounded-3 shadow-lg border-1 p-3" />
            <div onClick={loginSubmit} className='d-flex justify-content-center align-items-center mx-2 bg-black px-3 rounded-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </>
        ) : (
          <div>
            <p>Please login to use the chat</p>
            <Link to="/login"><button className="btn btn-primary w-100">Login</button></Link>
          </div>
        )}
      </div>
    </>
  )
}

export default ChatDispaly;
