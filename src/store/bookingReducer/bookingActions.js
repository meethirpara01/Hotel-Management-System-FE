import { useDispatch } from "react-redux";
import { cancelUserBooking, createBooking, myBooking } from "../../services/booking.api";
import { setBookings, setLoading, setError } from "./BookingSlice";

export const bookingActions = () => {

    const dispatch = useDispatch();

    const myBookings = async () => {
        try {
            dispatch(setLoading(true));
            const data = await myBooking();

            dispatch(setBookings(data.bookings));
        } catch (error) {
            console.error(error.response?.data?.message || "Booking Failed");
            dispatch(setError(error.response?.data?.message || "Booking Failed"));
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const confirmRoomBooking = async ({ roomId, checkInDate, checkOutDate, guestCount, totalAmount }) => {

        try {
            const data = await createBooking({ roomId, checkInDate, checkOutDate, guestCount, totalAmount });
            return data;
        } catch (error) {
            console.error(error.response?.data?.message || "Booking Failed");
        }
    }

    const cancelBooking = async (bookingId) => {
        const data = await cancelUserBooking(bookingId);
        await myBookings();
    }

    return { confirmRoomBooking, myBookings, cancelBooking };
}