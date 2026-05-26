import { bookingActions } from '../../../store/bookingReducer/bookingActions';
import './BookingCard.scss'

const BookingCard = ({ id, booking }) => {


    const checkInDate = new Date(booking.checkInDate);
    const CHECKINDATE = checkInDate.toLocaleDateString('en-CA');

    const checkOutDate = new Date(booking.checkOutDate);
    const CHECKOUTDATE = checkOutDate.toLocaleDateString('en-CA');
    

    const { cancelBooking } = bookingActions();
    
    const handleCancelBtn = async () => {
        console.log(booking._id);
        
        await cancelBooking(booking._id);
    }

    return (
        <div key={id} className='card'>
            <div className="details">
                <p>Booking Id: </p>
                <h5 className='bookingID'>{booking._id}</h5>
                <p>CheckInDate: {CHECKINDATE}</p>
                <p>CheckOutDate: {CHECKOUTDATE}</p>
                <p>Guest Count: {booking.guestCount}</p>
                <p>Status: {booking.status}</p>
                <div className="roomDetails">
                    <div className='left'>
                        <p>Room No. {booking.roomID.roomNumber}</p>
                        <p>Room Type: {booking.roomID.roomType}</p>
                    </div>
                    <div className="right">
                        <p>Bed Type: {booking.roomID.bedType}</p>
                        <p>Total Amount: {booking.totalAmount}</p>
                    </div>
                </div>
                <div className="userDetails">
                    <p>Customer Name: {booking.userID.name}</p>
                    <p>Email: {booking.userID.email}</p>
                </div>
                {booking.status === "PENDING" || booking.status === "CONFORMED" ? <div className="cancelBtn">
                    <button type='button' onClick={handleCancelBtn}>Cancel</button>
                </div>: ''}
            </div>
        </div>
    )
}

export default BookingCard