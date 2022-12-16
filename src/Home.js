import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container } from 'react-bootstrap';
import Pagination from './Pagination';
function Home() {

    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);

   

    useEffect(()=>{
        axios.get('https://api.pujakaitem.com/api/products').then((res) => {
            setList(res.data)
        })
    })
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = list.slice(firstPostIndex, lastPostIndex);
    return (
        <div>
            {
                currentPosts.map((item, i) => {
                    return (
                        <>
                            <Container >
                                <div style={{ display: "flex" }}>
                                    <Card style={{ width: '18rem' }} >
                                        <Card.Img variant="top" src={item.image} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                                {item.fully_diluted_valuation}
                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Container>
                        </>
                    )
                })
            }
            <Pagination
                totalPosts={list.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default Home
