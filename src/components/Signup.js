import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Signup = () => {
  const [cred, setcred] = useState({
    name:"",
    email: "",
    password: "",
    
  });


  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value })
  }



  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: 'POST',
      headers: {

        "Content-Type": "application/json",

      },
      body: JSON.stringify({ name:cred.name,email: cred.email, password: cred.password })

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
    }
    else {
      alert("invalid credentials");
    }

  }


  return <div className='container'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">User Name</label>
        <input type="text" className="form-control" name="name" id="name" aria-describedby="name" value={cred.name} onChange={onChange} />

      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" value={cred.email} onChange={onChange} />

      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={cred.password} />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmpassword" onChange={onChange} />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>;
};
