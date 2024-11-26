import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderBook = (props) => {
    const [url, setURL] = useState(null);
    const navigate = useNavigate()
    const firebase = useFirebase();
    
    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => {
            setURL(url)
        })
    }, [firebase])
    return (
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {
                            props.desc && <span className='text-success'>{props.desc}</span>
                            || <span className='text-danger'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        }
                    </Card.Text>
                    <Button onClick={(e)=>navigate(props.link)} variant="primary">View Order Detail</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default OrderBook
