import Button from "react-bootstrap/Button";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import "./RegisterPage.css";

const RegisterPage = () => {
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
    console.log('signin up a user...');
    await firebase.signupUserWithEmailAndPassword(email,password);
    console.log("Signup done");
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
                Register
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
