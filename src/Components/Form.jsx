import React, { useState } from 'react';
import '../styles/Components/Form.css';

const Form = ({ cancelTicket, data }) => {
    const [quantity, setQuantity] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const today = new Date().toISOString().slice(0, 10);


    // function to handle the ticket booking
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Movie Booked Successfully')
        cancelTicket();
    }


    // function to change the ticket quantity
    const changeQuantity = (changeBy) => {
        if (changeBy === -1 && quantity > 1) {
            setQuantity(quantity - 1)
        }
        if (changeBy === 1 && quantity < 10) {
            setQuantity(quantity + 1)
        }
    }


    return (
        <div className='form'>

            <h1>Ticket Booking</h1>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <div className="movie">
                    <p>Movie: </p>
                    <div className="name">
                        {data?.name} 
                        ({data?.genres?.map((val, ind) => {
                            return <span className='genres' key={ind}> {val}</span>
                        })} )</div>
                </div>

                <div className="date">
                    <p>Date: </p>
                    <input type="date" name="date" id="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div className="time">
                    <p>Time: </p>
                    <div className="timeselect">
                        <input type="radio" name="time" id="time1" required/>
                        <label htmlFor="time1">11:00AM</label>

                        <input type="radio" name="time" id="time2" />
                        <label htmlFor="time2">3:00PM</label>

                        <input type="radio" name="time" id="time3" />
                        <label htmlFor="time3">6:00PM</label>

                        <input type="radio" name="time" id="time4" />
                        <label htmlFor="time4">9:30PM</label>

                        <input type="radio" name="time" id="time5" />
                        <label htmlFor="time5">6:00AM</label>
                    </div>
                </div>
                <div className="quantity">
                    <p>Quantity: </p>
                    <div className="ticketquantity">
                        <button onClick={() => { changeQuantity(-1) }} type='button'>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => { changeQuantity(1) }} type='button'>+</button>
                    </div>
                </div>

                <div className="btns">
                    <button type='submit' className='confirm'>confirm</button>
                    <button className='cancel' type='button' onClick={() => cancelTicket()}>cancel booking</button>
                </div>
            </form>
        </div>
    )
}

export default Form;