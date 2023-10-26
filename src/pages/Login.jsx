import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import "./RegisterPage.css";

const LoginPage = () => {
  const firebase = useFirebase();

  const navigate = useNavigate();
  useEffect(()=>{
    if(firebase.isLoggedIn){
      navigate("/")
    }
  },[firebase,navigate])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log('Login a user...');
    await firebase.signinUserWithEmailAndPassword(email,password);
    console.log("Login done");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 custom-card">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="custom-button">
                Login
              </Button>
            </Form>
            <div className="flex text-center">
              <h1 className="text-black mt-3 mb-3">OR</h1>
              <Button variant="success" onClick={firebase.signinWithGoogle}>Sing-In with Google</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
