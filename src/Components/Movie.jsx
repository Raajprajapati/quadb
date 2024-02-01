import React from 'react';
import '../styles/Components/Movie.css'
import { Link } from 'react-router-dom';

const Movie = ({data}) => {
    return (
        <div className='moviecard'>
            <Link to={`/${data.show.id}`}>
                <div className="img">
                    {data?.show?.image?.medium ? <img src={data?.show?.image?.medium} alt="movie image" />: <img src='movie.jpeg' alt="movie image" />}
                    <span className='rating'> ⭐ {data?.show?.rating?.average ? `${data?.show?.rating?.average} /10` : 'NA'}</span>
                </div>
                <div className="title">
                    <h2>{data.show.name}</h2>
                </div>
            </Link>
        </div>
    )
}

export default Movie;