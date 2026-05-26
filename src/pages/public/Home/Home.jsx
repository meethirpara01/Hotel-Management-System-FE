import { Link } from "react-router-dom";
import "./Home.scss"

const Home = () => {
  return (
    <div className='home'>
      <section className='section1'>
        <div className="left">
          <div className="textContent">
            <h4>Book Your Stay and Enjoy</h4>
            <h4>Exceptional Comfort</h4>
          </div>

          <div className="bottomContent">
            <div className="content">
              <p>Where hospitality begins and every guest experience matters.</p>
              <p>Manage stays, service, and smiles all in one place.</p>
            </div>
            <div className="btns">
              <Link className='menu' to={"/home"}>Book Now</Link>
              <Link className='menu' to={"/home"}>About Us</Link>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="Square"></div>
        </div>
      </section>
    </div>
  )
}

export default Home;


// https://in.pinterest.com/pin/83387030598801728/
// https://in.pinterest.com/pin/524247212894069602/
// https://in.pinterest.com/pin/1083537991624453679/