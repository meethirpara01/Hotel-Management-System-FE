import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../Book-now/BookNow.scss";
import { DatePicker, Space, theme } from 'antd';
import { roomActions } from "../../../store/roomReducer/roomActions";
import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";


const { RangePicker } = DatePicker;

const BookNow = () => {

  const { availableRooms } = roomActions();

  const rooms = useSelector(state => state.room.rooms);

  useEffect(() => {
    console.log(rooms);

  }, [rooms])


  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const cellRender = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" >
        {current.date()}
      </div>
    );
  };

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(null);

  const handleDateChange = (values, dateStrings) => {
    setCheckInDate(dateStrings[0]);
    setCheckOutDate(dateStrings[1]);
  }

  const handleSubmit = async () => {
    await availableRooms({ CheckInDate: checkInDate, CheckOutDate: checkOutDate, guestCount: Number(guestCount) });
  }


  return (
    <div className='BookNow'>
      <div className="inputContent">
        <div className="textContent">
          <h2>Choose Your stay</h2>
        </div>
        <div className="inputs">
          <Space size={12} vertical>
            <DatePicker.RangePicker className="DatePicker" disabledDate={disabledDate} cellRender={cellRender} onChange={handleDateChange} placeholder={["Check-in Date", "Check-out Date"]} />
          </Space>
          <input className="guestNumber" type="number" placeholder="Number of Guest" onChange={(e) => { setGuestCount(Number(e.target.value)) }} />
          <button className="searchButton" type="submit" onClick={handleSubmit} ><i className="ri-search-line"></i>Search</button>
        </div>
      </div>
      {rooms ? <div className="rooms">
        {rooms.map((room) => {
          return <RoomCard key={room._id} room={room} userInputs={{ checkInDate, checkOutDate, guestCount }} />;
        })}
      </div> : <div>No Available Room</div>}
    </div>
  )
}

export default BookNow