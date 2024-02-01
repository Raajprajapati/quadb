import React, { useEffect, useState } from 'react';
import Movie from '../Components/Movie.jsx';
import '../styles/Pages/Home.css'

const Home = () => {
    const [movies, setMovies] = useState([]);



// function to get all the movies data
    const getMovies = async () => {
    
        try {
            let localMovies = localStorage.getItem('movies')

            if (localMovies){
                localMovies = JSON.parse(localMovies);
                localMovies.forEach((val) => {
                    setMovies((prev) => {
                        return [...prev, val]
                    })
                })
                return
            }
            const res = await fetch('https://api.tvmaze.com/search/shows?q=all');
            const data = await res.json();
            data.forEach((val) => {
                setMovies((prev) => {
                    return [...prev, val]
                })
            })
            localStorage.setItem('movies', JSON.stringify(data))

        } catch (error) {
            console.log(error)
        }
    }


    // get the movies data
    useEffect(() => {
        getMovies();
    }, [])
    return (
        <>
            <h1 className='allmovies'> All available movies</h1>
            <div className='movies-wrapper'>
                {
                    movies.length !==0 ? movies.map((val, ind) => {
                        return <Movie key={ind} data={val} />
                    }) : 'No movie found'
                }
            </div>
        </>

    )
}

export default Home