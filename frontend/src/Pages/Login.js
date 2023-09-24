import React, { useState, useContext } from 'react';
import userContext from "../context/user/UserContext";


const Login = () => {
  const context = useContext(userContext);
  const { getuser } = context

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sending the credentials to the backend for login
    getuser(credentials.email, credentials.password)


  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='px-5 mt-5 pt-3'>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="my-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
        </div>

        <button type="submit" className="btn btn-primary mb-3">Submit</button>
      </form>
    </div>
  )
}

export default Login;
