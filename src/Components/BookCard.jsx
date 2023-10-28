
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
    const [url, setURL] = useState(null);
    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => {
            setURL(url);
        });
    }, [firebase]);

    return (
            <Col className='singleCard m-2'>
                <Card style={{ width: '25rem', height: '25rem', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                    {/* ... Rest of your component */}
                    <Card.Img variant="top" src={url} style={{ height: "15rem", objectFit: "contain", padding: "4px" }} className='cardImage' />
                    <Card.Body>
                        <Card.Title>{props.name.slice(0, 40)}</Card.Title>
                        <Card.Text>
                            {
                                props.desc ? <p>{props.desc}</p>
                                    :
                                    <p>
                                        Some quick example text to build on the card desc.
                                    </p>
                            }
                        </Card.Text>
                        <div className='d-flex justify-content-between'>
                            <Button onClick={e => navigate(`/book/view/${props.id}`)} variant="primary">View</Button>
                            <span className='font-weight-bolder'>Published By : {props.displayName}</span>
                            <img src={props.photoURL} alt="UPLOADED BY" style={{ borderRadius: "50%", height: "35px" }} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
    );
};

export default BookCard;
