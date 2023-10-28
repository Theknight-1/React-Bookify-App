import React, { useEffect, useState } from 'react'
import Navb from '../Components/Navbar'
import { useFirebase } from '../context/Firebase';
import OrderBook from '../Components/OrderBook';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const ViewOrder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        if (firebase.isLoggedIn) {
            firebase.fetchMyBooks(firebase.user.uid)?.then(books => setBooks(books.docs));
        }
    }, [firebase])

    if (!firebase.isLoggedIn) {
        return navigate("/login")

    }

    return (
        <>
            <Navb />
            <div className='container mt-4'>
                <Row>
                    {
                        books?.map((book) => (
                            <OrderBook link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
                        ))
                    }
                </Row>
            </div>
        </>
    )
}

export default ViewOrder
