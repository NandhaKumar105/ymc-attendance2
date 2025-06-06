
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import ymc from '../assets/ymc.jpeg';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { TbWorld } from "react-icons/tb";
import { IoMail } from "react-icons/io5";
import sct from "../assets/sct.jpeg";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Atndetails() {
  const atn = useLocation();
  // const navigate = useNavigate();
  const atndetails = atn.state.details;
  const session = atn.state.check;
  const da = atn.state.dates;

  return (
    <>

      <div className='content'>

        <Link to="/attendance"> <MdKeyboardArrowLeft className='leftaw' /></Link>

      </div>


      <div className="container mt-5">

        <div className='firstlettersatn'>
          {atndetails?.name[0]}


        </div>

        <div className='text-center mt-3'>
          <b>{atndetails?.name} </b> <br />
          {atndetails?.designation}<br />
        </div>

        <div className="card shadow p-3 mt-3 bgclratn rounded">
          <div className="card-body ">

            <p className="card-text d-flex ">
              <strong>Employee ID: {atndetails?.empId}</strong><br />
              <strong className='ms-3'>Date: {da ? new Date(da).toLocaleDateString('en-GB') : "N/A"} </strong> <br />

              <strong className='ms-3'> Hours:

                {
                  session?.reduce((acc, item) => {
                    const checkIn = item.checkIn ? new Date(item.checkIn) : null;
                    const checkOut = item.checkOut ? new Date(item.checkOut) : null;

                    if (checkIn && checkOut) {
                      const diff = (checkOut - checkIn) / (1000 * 60 * 60); // ms to hrs
                      return acc + diff;
                    }

                    return acc;
                  }, 0).toFixed(2)
                }min
              </strong>

            </p>
          </div>
        </div>


        <div className="card-body ">

          {session?.map((item, index) => (
            <div className="card shadow p-3 mt-3 bgclrempd rounded">
              <div key={index} style={{ marginBottom: "10px" }}>
                <h6>Sessions {index + 1}</h6>
                <strong className='ms-5'>Check-In:</strong> {item.checkIn ? new Date(item.checkIn).toLocaleTimeString() : "No check-in"}

                <strong className='ms-5'>Check-Out:</strong> {item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : "No check-out"}
                <div>
                  <strong className='checkin'></strong>{item.checkInLocation}
                  <strong className='checkout'></strong>{item.checkOutLocation}
                </div>

              </div>
            </div>

          ))}

        </div>
      </div>

    </>
  )
}
export default Atndetails;