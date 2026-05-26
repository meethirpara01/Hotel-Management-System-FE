import React, { useEffect, useState } from 'react'
import '../MyBookings/MyBookings.scss'
import { useSelector } from 'react-redux';
import BookingCard from './BookingCard';
import { bookingActions } from '../../../store/bookingReducer/bookingActions';

const MyBookings = () => {

  const { userBookings, loading } = useSelector(state => state.bookings);

  const { myBookings } = bookingActions();

  useEffect(() => {
    myBookings();
    console.log(userBookings);
  }, []);

  useEffect(() => {
    setFilter("ALL");
  }, [userBookings]);

  const [filter, setFilter] = useState("ALL");

  const filteredBookings =
    userBookings.filter((booking) => {

      if (filter === "PENDING") {
        return booking.status === "PENDING";
      }

      if (filter === "CONFORMED") {
        return booking.status === "CONFORMED";
      }

      if (filter === "PREVIOUS") {
        return (
          booking.status !== "PENDING" &&
          booking.status !== "CONFORMED"
        );
      }

      return true;
    });

  

  return (
    <div className='MyBookings'>
      <h4>BOOKING LIST</h4>
      <div className="content">
        <div className="buttons">
          <button className='btn' onClick={() => setFilter("ALL")}>ALL</button>
          <button className='btn' onClick={() => setFilter("PENDING")}>PENDING</button>
          <button className='btn' onClick={() => setFilter("CONFORMED")}>CONFORMED</button>
          <button className='btn' onClick={() => setFilter("PREVIOUS")}>PREVIOUS</button>
        </div>
        <div className="bookingCards">
          {filteredBookings.length > 0 ? filteredBookings.map((booking) => {
            return <BookingCard key={booking._id} booking={booking} />
          }) : <div>Their Is No Bookings</div>}
        </div>
      </div>
    </div>
  )
}

export default MyBookings