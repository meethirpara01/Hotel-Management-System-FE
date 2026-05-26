import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/room",
    withCredentials: true
});


export const fetchAvailableRoom = async ({ CheckInDate, CheckOutDate, guestCount }) => {
    const response = await api.post('/customer/availableRooms', {CheckInDate, CheckOutDate,guestCount});    
    return response.data;
}