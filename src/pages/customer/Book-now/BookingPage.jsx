import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import "./BookingPage.scss";
import { HiOutlineHome } from 'react-icons/hi';
import { bookingActions } from '../../../store/bookingReducer/bookingActions';
import { roomActions } from '../../../store/roomReducer/roomActions';

const BookingPage = () => {

    const location = useLocation();
    const { confirmRoomBooking } = bookingActions();
    const { clearAvailableRooms } = roomActions();

    if (!location.state.userInputs.checkInDate) {
        clearAvailableRooms();
        return <Navigate to="/book-now" />;
    }

    const totalNights = Math.ceil((new Date(location.state.userInputs.checkOutDate) - new Date(location.state.userInputs.checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = totalNights * location.state.room.pricePerNight;


    const handleConfirmBooking = async () => {
        await confirmRoomBooking({
            roomId: location.state.room._id,
            checkInDate: location.state.userInputs.checkInDate,
            checkOutDate: location.state.userInputs.checkOutDate,
            guestCount: location.state.userInputs.guestCount,
            totalAmount: totalPrice
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

            {/* <div className="bookingDetails">
                <div className="left">
                    <div className='topImage'>
                        <img src={`http://localhost:3000${location.state.room.images[0]}`} alt="" srcset="" />
                    </div>
                    <div className="buttoImages">
                        <div className="leftImage">
                            <img src={`http://localhost:3000${location.state.room.images[1]}`} alt="" srcset="" />
                        </div>
                        <div className="rightImage">
                            <img src={`http://localhost:3000${location.state.room.images[2]}`} alt="" srcset="" />
                        </div>
                    </div>
                </div>
                <div className="right">
                    <h4 className="title">{location.state.room.title}</h4>
                    <div className="dates">
                        <div className="checkIn">
                            <p>Check-In</p>
                            <h5>{location.state.userInputs.checkInDate}</h5>

                        </div>
                        <div className="checkOut">
                            <p>Check-Out</p>
                            <h5>{location.state.userInputs.checkOutDate}</h5>
                        </div>
                        <div className="guestCount">
                            <p>Number of Guest</p>
                            <h5>{location.state.userInputs.guestCount}</h5>
                        </div>
                    </div>
                    <div className="roomDetails">
                        <div className="roomNumber">
                            <p>Room Number</p>
                            <h5>{location.state.room.roomNumber}</h5>
                        </div>
                        <div className="roomType">
                            <p>Room Type</p>
                            <h5>{location.state.room.roomType}</h5>
                        </div>
                        <div className="bedType">
                            <p>Bed Type</p>
                            <h5>{location.state.room.bedCount}</h5>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default BookingPage