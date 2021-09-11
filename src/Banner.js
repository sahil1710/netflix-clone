import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);

    // a snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return (
        <header className="banner"
            style = {{
                backgroundSize: "100% 100%",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner-content">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie.original_name}
                </h1>

                <div className="banner-buttons">
                    <button className="banner-button">Play</button>
                    <button className="banner-button">My list</button>
                </div>
                <h1 className="banner-des">
                    {truncate(movie?.overview,150)}
                </h1> 

            </div>
            <div className="fadebottom"/>
        </header>
    )
}

export default Banner
