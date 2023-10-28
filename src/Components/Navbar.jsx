import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from "../context/Firebase";
import { Button } from "react-bootstrap";
import './Navbar.css'

const Navb = () => {
    const firebase = useFirebase();
    const signOutUser = () => {
        firebase.signingOut();
    }
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className="navigation">
                    <Navbar.Brand href="/"><span data-splitting="chars">Bookify!!</span></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/book/listing">Add Listing</Nav.Link>
                        <Nav.Link href="/book/orders">Orders</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            !firebase.user &&
                            <Nav.Link href="/login">Login</Nav.Link>
                            ||
                            <Button className="btn-sm" onClick={signOutUser}>Sign-Out</Button>
                        }
                        {
                            !firebase.user &&
                            <Nav.Link href="/sign-up">Sign-up</Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
            
        </>
    )
}
export default Navb