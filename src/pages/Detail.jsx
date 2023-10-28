import React, { useEffect, useState } from 'react'
import Navb from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { useFirebase } from '../context/Firebase';
import "./RegisterPage.css"
import { Button } from 'react-bootstrap';

const BookDetail = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState();
  const [qty, setQty] = useState();
  const [feedback, setFeedback] = useState("");
  const [url, setURL] = useState(null);


  useEffect(() => {
    firebase.getBookByID(params.bookID).then((value) => setData(value.data()))
    console.log(data);
  }, [firebase])
  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url))
    }
  }, [data, firebase])

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookID, qty)
    console.log("Order placed", result);
  }
  const giveFeedback = async (e) => {
    e.preventDefault();
    const result = await firebase.giveFeedback(params.bookID, feedback)
    console.log("Order placed", result.data);
    e.target.value= null
  }


  if (data === null) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <Navb />
      <div className='container mt-2'>
        {
          data && <h1 className='flex text-center'>{data.name}</h1>
        }
        <div className='bg-success-lighter'>
          <div className='p-4' style={{ display: "block", margin: "auto", maxWidth: "500px", maxHeight: "650px" }}>
            <img src={url} alt="" width={"100%"} height={"100%"} style={{ borderRadius: "20px" }} />
          </div>
        </div>
        <h1 className='text-success'>Details</h1>
        {data && <p>{data.desc}</p>}
        {data && <h4>Price Rs. {data.price}</h4>}
        {data && <h4>ISBN Number, {data.isbn}</h4>}
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter Ammount of Book</Form.Label>
          <Form.Control
            onChange={e => setQty(e.target.value)}
            value={qty}
            type="Number"
            placeholder="Enter Qty"
          />
        </Form.Group>
        <Button onClick={placeOrder}>Buy Now</Button>
        <h1>Owner Details</h1>
        <div className='bg-grey'>
          <div className='d-flex mt-4 p-2 gap-3'>
            {
              data && <img src={data.photoURL} alt=""   style={{ borderRadius: "50px",maxWidth:"50px",maxHeight:"50px" }} />
            }
            <div>
              {
                data && data.displayName
              }
              <h4>{data && data.userEmail}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Feedback */}
      <div className='container mt-3 p-2 rounded bg-success'>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label className='text-white'>Enter Your Feedback</Form.Label>
            <div className='d-flex'>
              <Form.Control
                onChange={e => setFeedback(e.target.value)}
                value={feedback}
                type="text"
                placeholder="Feedback"
              />
              <Button variant='danger' onClick={giveFeedback}>Submit</Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

export default BookDetail
