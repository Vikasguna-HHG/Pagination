import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container } from 'react-bootstrap';
import Pagination from './Pagination';
import { Link, NavLink } from 'react-router-dom';
function Home() {

    const [list, setList] = useState([]);
    const [category, setcategory] = useState(list);
    const [company, setcompany] = useState(list);
    const [colors, setcolors] = useState(list);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);



    useEffect(() => {
        axios.get('https://api.pujakaitem.com/api/products').then((res) => {
            setList(res.data)
        })
    }, [])
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = list.slice(firstPostIndex, lastPostIndex);

    const handleInput = (e) => {
        debugger

        if (e.target.value == "all") {
            return list
        } else {
            setcategory(e.target.value);
            setcompany(e.target.value);
            setcolors(e.target.value);
        }
    }

    const getUniqueData = (data, property) => {
        let newVal = data.map((item, i) => {
            return item[property];
        });

        if (property === "colors") {
            // return (newVal = ["All", ...new Set([].concat(...newVal))]);
            newVal = newVal.flat();
        }

        return (newVal = ["all", ...new Set(newVal)]);

    };

    const categoryData = getUniqueData(list, "category");
    const companyData = getUniqueData(list, "company");
    const colorsData = getUniqueData(list, "colors");
    const price = getUniqueData(list, "price");

    const max = Math.max(...price)
    console.log(max)
    return (
        <div>
            {categoryData.map((item, i) => {
                return (
                    <>
                        <button key={i} type='button' name='category' value={item} onClick={handleInput} >{item}</button>
                    </>
                )
            })}

            <br />
            {companyData.map((item, i) => {
                return (
                    <>
                        <button key={i} type='button' name='company' value={item} onClick={handleInput} >{item}</button>
                    </>
                )
            })}

            <br />
            {colorsData.map((item, i) => {
                return (
                    <>
                        <button key={i} type='button' name='colors' value={item} onClick={handleInput} style={{ color: { item } }} >{item}</button>
                    </>
                )
            })}

            {
                currentPosts.filter((data, i) => { return data.category === category || data.company === company || data.colors[i] === colors }).map((item, i) => {
                    return (
                        <>
                            <Container>
                                <div className='row'>
                                    <div className='col'>
                                        <Card style={{ width: '18rem' }} key={i} >
                                            <NavLink to={`Link/${item.id}`}>
                                                <Card.Img variant="top" src={item.image} />
                                            </NavLink>
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>
                                                    {item.fully_diluted_valuation}
                                                </Card.Text>
                                                <p>{item.company}</p>
                                                <p>{item.price}</p>
                                                <p>{item.category}</p>

                                                <Button variant="primary">Go somewhere</Button>
                                            </Card.Body>
                                        </Card>

                                    </div>
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
