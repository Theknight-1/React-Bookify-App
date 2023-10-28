import React, { useEffect, useState } from 'react'
import Navb from '../Components/Navbar'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ViewOrderDetail = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [orders, setOrders] = useState([])
    useEffect(() => {
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs))
    }, [])

    return (
        <div>
            <Navb />
            <div className='container'>
                <h1>Orders</h1>
                <div>
                    {
                        orders.map((order) => {
                            const data = order.data();
                            console.log(data);
                            return (
                                <div key={order.id} className='gap-2 border p-2 m-2 bg-secondary rounded text-white border-dark'>
                                    <div className='d-flex gap-3'>
                                        <h4>Ordered By: {data.displayName}</h4>
                                        <img src={data.photoURL} alt="" style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
                                    </div>
                                    <p>Quentity : {data.qty}</p>
                                    <p>Email : {data.userEmail}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewOrderDetail
