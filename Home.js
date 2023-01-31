import React, { useState, useRef } from 'react'
import axios from 'axios';

function Search1() {

    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [show, setShow] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState("");

    function handleSearch(e) {
        debugger
        if (e.target.value == "") {
            setSearchResult([]);
            setSearchValue("");
            return false;
        }

        setSearchValue(e.target.value);

        clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => searchData(e.target.value), 500));
    }

    function handle(value) {
        setShow(value);
        document.addEventListener("click", handleClickOutside, true);
    }

    function searchData(s) {
        axios.post("http://localhost:5000/get?name=" + s).then((res) => {
            setSearchResult(res.data.data);
        });
    }

    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
            setSearchResult([]);
        }
    };


    function Search() {
        if (searchResult.length == 0)
            return <div className="searchdrop" id="search-result"></div>;

        return (
            <div className="searchdrop" id="search-result" ref={ref}>
                {searchResult.map((suggesstion, index) => {
                    if (index < 5) {
                        return (
                            <div key={index} className="searcdropbg">
                                <h5>{suggesstion.name}</h5>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }

    console.log(searchResult);
    return (
        <div>
            <div className="col-md-3 col-sm-4 col-xs-12">
                <i className="fa fa-search myicon" aria-hidden="true"></i>
                <input
                    type="text"
                    className="search-click"
                    name=""
                    onChange={handleSearch}
                    onClick={() => {
                        handle(true);
                    }}
                    placeholder="Search Here..."
                    id="search-text"
                />
                <Search />
            </div>
        </div>
    )
}

export default Search1
