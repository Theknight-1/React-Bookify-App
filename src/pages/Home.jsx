import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
// import { CardGroup } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

//Components
import Navb from '../Components/Navbar'
import Card from '../Components/BookCard';

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        firebase.listAllBooks().then((books) => {
            setBooks(books.docs);
        })
    }, [firebase])



    return (
        <>
            <Navb />
            <div className='container mt-3'>
                <Row>
                    {
                        books.map((book, index) => {
                            return <Card key={book.id} id={book.id} index={index} {...book.data()} />
                        })
                    }
                </Row>
                {
                    books.length === 0 && (
                        <div className='d-flex text-center display-4'>nothing to show</div>
                    )
                }
            </div>
        </>
    )
}

export default Home
