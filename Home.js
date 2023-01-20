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

    const handlecategory = (e) => {

        if (e.target.checked === false) {
            setcategory("")
        } else if (e.target.value === "All") {
            categoryData.map((item, i) => {
                return setcategory(item);
            })
            // setcategory(categoryData)
        } else {
            setcategory(e.target.value);
        }


    }

    console.log(category);

    const handlecompany = (e) => {
        if (e.target.checked === false) {
            setcompany("")
        } else if (e.target.value === "All") {
            companyData.map((item, i) => {
                return setcompany(item);
            })
            // setcompany(categoryData)
        } else {
            setcompany(e.target.value);
        }
    }


    const handlecolor = (e) => {
        if (e.target.checked === false) {
            setcolors("")
        } else if (e.target.value === "All") {
            companyData.map((item, i) => {
                return setcolors(item);
            })
            // setcolors(categoryData)
        } else {
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

        // return (newVal = ["All", ...new Set(newVal)]);
        return (newVal = [...new Set(newVal)]);

    };

    const categoryData = getUniqueData(list, "category");
    const companyData = getUniqueData(list, "company");
    const colorsData = getUniqueData(list, "colors");
    const price = getUniqueData(list, "price");


    const max = Math.max(...price)
    return (
        <div>
            {categoryData.map((item, i) => {
                return (
                    <>
                        <input key={i} type='checkbox' name='category' value={item} onClick={handlecategory} />{item}
                    </>
                )
            })}

            <br />
            {companyData.map((item, i) => {
                return (
                    <>
                        <input key={i} type='checkbox' name='company' value={item} onClick={handlecompany} />{item}
                    </>
                )
            })}

            <br />
            {colorsData.map((item, i) => {
                return (
                    <>
                        {/* <button key={i} type='button' name='colors' value={item} onClick={handlecategory} style={{ color: { item } }} >{item}</button> */}
                        <input key={i} type='checkbox' name='colors' value={item} onClick={handlecolor} />{item}
                    </>
                )
            })}

            {
                currentPosts.filter((data, i) => { return data.category === category || data.company === company || data.colors[i++] === colors }).map((item, i) => {
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
