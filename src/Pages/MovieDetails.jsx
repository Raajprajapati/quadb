import React, { useEffect, useState } from 'react';
import '../styles/Pages/MovieDetails.css'
import { useParams, Link, useNavigate } from 'react-router-dom';
import Form from '../Components/Form'

const MovieDetails = () => {

    const [showMovie, setShowMovie] = useState(true);
    const params = useParams();
    const [movieData, setData] = useState({});
    const navigate = useNavigate();


    // function to cancel ticket booking or revert to movie details screen
    const cancelTicket = () => {
        setShowMovie(!showMovie)
    }

    // function to get the movie data with given id
    const getMovie = async (id) => {
        try {
            const res = await fetch(`https://api.tvmaze.com/shows/${id}`)

            let data = await res.json();

            if (data?.status === 404) {
                navigate('/')
            }

            setData((prev) => {
                const summary = removeTags(data.summary)
                data = { ...data, summary }
                return { ...prev, ...data }
            })
        }
        catch (error) {
            navigate('/')
        }
    }


    // helper function to remove html tags from the summary
    const removeTags = (str) => {
        if ((str === null) || (str === '') || str === undefined)
            return '';
        else
            str = str.toString();
        return str.replace(/(<([^>]+)>)/ig, '');
    }


    // calling the getmovies at initial render time
    useEffect(() => {
        getMovie(params.id)

    }, [])

    return (
        <>
            {showMovie ?
                <><h2 className='goback'> <Link to='/'> ⬅️ Go Back</Link></h2>
                    <div className='moviedetails'>

                        <div className="left">
                            <img src={movieData?.image?.medium} alt="movie image" />

                        </div>
                        <div className="right">
                            <div className="title">
                                <h2>{movieData.name}</h2>
                            </div>
                            <ul className='details'>

                                <li className="d-item language">
                                    <span className='d-heading'>Language: &nbsp;</span>
                                    {movieData?.language}
                                </li>
                                <li className="d-item genre">
                                    <span className='d-heading'>Genre: &nbsp;</span>
                                    {movieData?.genres?.map((val, ind) => {
                                        return <span key={ind}> {val}</span>
                                    })}
                                </li>

                                <li className="d-item premiered">
                                    <span className='d-heading'>Premiered On: &nbsp;</span>
                                    {movieData.premiered}
                                </li>
                                <li className="d-item summary">
                                    <span className='d-heading'>Summary :&nbsp;</span>
                                    {movieData.summary ? movieData.summary : 'No summary available'}

                                </li>
                                <li className="d-item rate">
                                    <span className='d-heading'>Rating :&nbsp;</span>
                                    <span className=''> ⭐ {movieData?.rating?.average ? `${movieData?.rating?.average}/10` : 'Not Rated'}</span>
                                </li>

                            </ul>
                            <div className="buybtn">
                                <button onClick={cancelTicket}>Book now</button>
                            </div>

                        </div>
                    </div> </> :
                <Form data={movieData} cancelTicket={cancelTicket} />}
        </>

    )
}

export default MovieDetails