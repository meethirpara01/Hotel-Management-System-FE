import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/room",
    withCredentials: true
});


export const createBooking = async ({ roomId, checkInDate, checkOutDate, guestCount }) => {
    console.log({ roomId, checkInDate, checkOutDate, guestCount });
    
    const response = await api.post('/customer/book/' + roomId, { CheckInDate: checkInDate, CheckOutDate: checkOutDate, guestCount: guestCount });
    console.log("Booking Response:", response.data);
    return response.data;
}