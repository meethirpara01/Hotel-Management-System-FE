import React from 'react'
import { useLocation } from 'react-router-dom';
import "./BookingPage.scss";
import { HiOutlineHome } from 'react-icons/hi';
import { bookingActions } from '../../../store/bookingReducer/bookingActions.js';

const BookingPage = () => {
    const location = useLocation();

    if (!location.state) {
        return <Navigate to="/book-now" />;
    }

    const totalNights = Math.ceil((new Date(location.state.userInputs.checkOutDate) - new Date(location.state.userInputs.checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = totalNights * location.state.room.pricePerNight;

    const { confirmRoomBooking } = bookingActions();

    const handleConfirmBooking = async () => {
        await confirmRoomBooking({
            roomId: location.state.room._id,
            checkInDate: location.state.userInputs.checkInDate,
            checkOutDate: location.state.userInputs.checkOutDate,
            guestCount: location.state.userInputs.guestCount
        });
    }
    return (
        <div className="bookingPage">
            <h2>Booking Confirmation</h2>
            <div className="bookingDetails">
                <img src={`http://localhost:3000${location.state.room.images[0]}`} alt="Room Image" />
                <div className="blurred-layer" style={{ backgroundImage: `url(http://localhost:3000${location.state.room.images[0]})` }}></div>
                <div className="content">
                    <div className="headDetails">
                        <h4 className="title">{location.state.room.title}</h4>
                        <div className="segment"><p>{location.state.room.category}</p></div>
                    </div>
                    <div className="roomDetails">
                        <p>Room Number:- {location.state.room.roomNumber}</p>
                        <p>Room Type:- {location.state.room.roomType}</p>
                    </div>
                    <div className="roomDetails">
                        <p>Bed Type:- {location.state.room.bedType}</p>
                        <p>Bed Count:- {location.state.room.bedCount}</p>
                        <p>Capacity:- {location.state.room.capacity} Persons</p>
                    </div>
                    <div className="roomDetails">
                        <p>Check-in Date:- {location.state.userInputs.checkInDate}</p>
                        <p>Check-out Date:- {location.state.userInputs.checkOutDate}</p>
                    </div>
                    <div className="roomDetails">
                        <p>Guest Count:- {location.state.userInputs.guestCount} Persons</p>
                        <p>Total Nights: {totalNights}</p>
                    </div>
                    <div className="priceDetails">
                        <h3>Total Price:  ₹{totalPrice}/-</h3>
                    </div>
                </div>
                <div className="Btns">
                    <button className="goBackbtn" onClick={() => window.history.back()}>Go Back</button>
                    <button className="confirmBtn" onClick={handleConfirmBooking}>Confirm Booking</button>
                </div>
            </div>
        </div>
    )
}

export default BookingPage