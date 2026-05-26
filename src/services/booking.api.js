import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/room",
    withCredentials: true
});


export const createBooking = async ({ roomId, checkInDate, checkOutDate, guestCount, totalAmount }) => {
    console.log({ roomId, checkInDate, checkOutDate, guestCount });
    
    const response = await api.post('/customer/book/' + roomId, { CheckInDate: checkInDate, CheckOutDate: checkOutDate, guestCount: guestCount, totalAmount: totalAmount });
    // console.log("Booking Response:", response.data);
    return response.data;
}

export const myBooking = async () => {
    const response = await api.get('/customer/mybookings');
    // console.log("Booking Response:", response.data);
    return response.data;
}

export const cancelUserBooking = async (bookingId) => {
    
    const response = await api.patch('/customer/cancelBooking/' + bookingId);
    return response.data;
}