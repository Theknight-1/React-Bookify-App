import React, { useState } from 'react'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navb from '../Components/Navbar';

import {useFirebase} from "../context/Firebase"

const List = () => {
    const firebase = useFirebase();


    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverpic, setCoverPic] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        await firebase.handleCreateNewListing(name,isbnNumber,price,coverpic);   
    }
    return (
        <>
            <Navb/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-4 custom-card">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Enter Book Name</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        placeholder="Book Name"
                                        value={name}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Enter isbnNumber</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setIsbnNumber(e.target.value)}
                                        type="text"
                                        placeholder="ISBN Number"
                                        value={isbnNumber}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Enter Price</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="Number"
                                        placeholder="Price"
                                        value={price}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Enter isbnNumber</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setCoverPic(e.target.files[0])}
                                        type="file"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="custom-button">
                                    ADD
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List
