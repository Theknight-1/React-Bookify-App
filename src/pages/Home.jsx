import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
// import { CardGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

//Components
import Navb from '../Components/Navbar'
import Card from '../Components/Card';

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        firebase.listAllBooks().then((books) => {
            setBooks(books.docs);
        })
    }, [])



    return (
        <>
            <Navb />
            <div className='container mt-5'>
                <Row>
                    {
                        books.map((book) => {
                            return <Card  key={book.id} id={book.id} {...book.data()}/>
                        })
                    }
                </Row>
            </div>
        </>
    )
}

export default Home
