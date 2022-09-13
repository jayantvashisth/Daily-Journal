import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Login = () => {

    const [cred, setcred] = useState({
        email: "",
        password: ""
    });


    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }



    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {

                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: cred.email, password: cred.password })

        });
        const json = await response.json();
        // console.log(json);
        console.log("first :", json.success, json.authToken)
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            history.push("/");
        }
        else {
            alert("invalid credentials");
        }

    }


    return <div className='container'>
        <form className='my-5' onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" value={cred.email} onChange={onChange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />

            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} value={cred.password} name="password" placeholder="Password" />
            </div>

            <button type="submit" className="btn btn-primary my-3" >Submit</button>
        </form>
    </div>;
};
