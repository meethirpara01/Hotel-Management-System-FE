import './RoomCard.scss';
import { HiOutlineHome } from "react-icons/hi";
import { MdBalcony, MdBed, MdRoomService } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaBeer } from 'react-icons/fa';
import { IoWifiOutline } from "react-icons/io5";
import { MdLiveTv } from "react-icons/md";
import { PiDesk } from "react-icons/pi";
import { MdOutlineBathroom } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { GiClubs } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RoomCard = ({ id, room, userInputs }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    
    
    const handleLeftArrowClick = () => {
        if (currentImageIndex === 0) {
            return;
        }
        setCurrentImageIndex(prev => prev - 1);
    }
    
    const handleRightArrowClick = () => {
        if (currentImageIndex === room.images.length - 1) {
            return;
        }
        setCurrentImageIndex(prev => prev + 1);
    }

    const handleSelectRoomBtn = (room, userInputs) => {
        console.log("Selected Room:", room);
        console.log("User Inputs:", userInputs);
        navigate('/booking', { state: { room, userInputs } });
    }


    return (
        <div key={id} className="room">
            <div className="content">
                <div className="imgOrBackground">
                    <img src={`http://localhost:3000${room.images[currentImageIndex]}`} alt="Room Image" />
                    <div className="available">Available</div>
                    <div className="leftArrow" onClick={handleLeftArrowClick}>
                        ‹
                    </div>
                    <div className="rightArrow" onClick={handleRightArrowClick}>
                        ›
                    </div>
                </div>
                <div className="textContent">
                    <div className="top">
                        <h4>{room.type}</h4>
                        <div className="type">
                            <div className="segment"><HiOutlineHome className="icon" /><p>{room.category}</p></div>
                            <div className="bedType"><p>{room.bedType}</p></div>
                            <div className="roomDetail"><MdBed className="icon" />{room.bedCount}</div>
                            <div className="roomDetail"><IoMdPerson className="icon" />{room.capacity}</div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="left">
                            <div className="LeftIcon"><IoWifiOutline className="icon" />Free WiFi</div>
                            <div className="LeftIcon"><MdLiveTv className="icon" />TV</div>
                            <div className="LeftIcon"><PiDesk className="icon" />Work Desk</div>
                            <div className="LeftIcon"><MdBalcony className="icon" />Balcony</div>
                        </div>
                        <div className="right">
                            <div className="RightIcon"><GiClubs className="icon" />Mini Bar</div>
                            <div className="RightIcon"><MdOutlineBathroom className="icon" />Attached Bathroom</div>
                            <div className="RightIcon"><TbAirConditioning className="icon" />Air Conditioning</div>
                            <div className="RightIcon"><MdRoomService className="icon" />24/7 Room Service</div>
                        </div>
                    </div>
                    <div className="bottom"><p>Spacious upgraded room with premium facilities and comfort.</p></div>
                </div>
            </div>
            <div className="price">
                <div className="amountAndButton">
                    <div className="amount"><h2>₹{room.pricePerNight}</h2><p>(for per night)</p></div>
                    <button type="button" onClick={() => handleSelectRoomBtn(room, userInputs)} className="select">Select</button>
                </div>
                <div className="discount">
                    <ImPriceTags className="discountIcon" />
                    <p>We offer 10% off weeks that are paid in full at the time of booking.</p>
                </div>
            </div>
        </div>
    )
}

export default RoomCard