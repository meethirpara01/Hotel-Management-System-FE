import { useDispatch } from "react-redux";
import { createBooking } from "../../services/booking.api";

export const bookingActions = () => {

    const dispatch = useDispatch();

    const confirmRoomBooking = async ({ roomId, checkInDate, checkOutDate, guestCount }) => {

        try {
            console.log({ roomId, checkInDate, checkOutDate, guestCount });
            
            const data = await createBooking({ roomId, checkInDate, checkOutDate, guestCount });
            console.log(data);
            return data;
        } catch (error) {
            console.error(error.response?.data?.message || "Booking Failed");
        }
    }

    return { confirmRoomBooking };
}