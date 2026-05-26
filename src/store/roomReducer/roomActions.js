import { useDispatch } from "react-redux";
import { fetchAvailableRoom } from "../../services/room.api";
import { setError, setLoading, setRoom } from "./roomSlice";

export const roomActions = () => {

    const dispatch = useDispatch();

    const availableRooms = async ({ CheckInDate, CheckOutDate, guestCount }) => {

        try {
            dispatch(setLoading(true));

            const data = await fetchAvailableRoom({ CheckInDate, CheckOutDate, guestCount });
            dispatch(setRoom(data.rooms));

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Fetch Available Room is Failed"));
            console.log(error.response?.data?.message || "Fetch Available Room is Failed");
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const clearAvailableRooms = () => {
        try {
            dispatch(setLoading(true));

            dispatch(setRoom([]));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Fetch Available Room is Failed"));
            console.log(error.response?.data?.message || "Fetch Available Room is Failed");
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return {
        availableRooms, clearAvailableRooms
    }
}