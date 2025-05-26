import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import ymc from '../assets/ymc.jpeg';
import { IoMdInformationCircleOutline } from "react-icons/io";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import sct from "../assets/sct.jpeg";
import { TbWorld } from "react-icons/tb";
import { IoMail } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdKeyboardArrowRight } from "react-icons/md";




function Attendance() {

  let [searchatd, setsearchatd] = useState('')
  const [attendance, setattendance] = useState([])
  const [dateatn, setdateatn] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    axios("api/attendance/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then((res) => setattendance(res.data.data))
  }, [])

  // const filteredUsers = attendance.filter(user => {
  //   const matchesName = user.toLowerCase() === "" ? user : user.employee?.name.toLowerCase().includes(searchatd) ||
  //                       user.employee?.empId.toLowerCase().includes(searchatd.toLowerCase());
  //   return matchesName;
  // });

  const filteredUsers = attendance.filter(user => {
    const name = user.employee?.name?.toLowerCase().trim() || "";
    const empId = user.employee?.empId?.toString().toLowerCase().trim() || "";
    const search = searchatd.toLowerCase().trim();
    const matchesSearch = name.includes(search) || empId.includes(search);


    const matchesDate = dateatn
      ? new Date(user.date).toDateString() === dateatn.toDateString()
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <>
      
      <div className="content">
        <img src={ymc} width={170}></img>
        <Link to='/home' className='text-decoration-none'><button className="btn1">Employee's Details</button></Link>
        <button className='btn2  bg-warning'>Employee's Attendance</button>

        <Popup trigger={<IoMdInformationCircleOutline className='info' />} modal closeOnDocumentClick contentStyle={{ borderRadius: '12px', padding: '0', width: '90%', maxWidth: '400px' }}>
          {(close) => (
            <div className="p-1 bg-white rounded text-center">
              <h2 className="text-xl font-bold mb-4">Developer Information</h2>
              <img src={sct} width={250}></img>
              <p> <TbWorld className='text-warning' /> https://shinecrafttechnologies.com </p>
              <p> <IoMail className='text-warning ' /> solutions@shinecrafttechnologies </p>
              <button onClick={close} className="mt-4  text-dark bg-warning">Close
              </button>
            </div>
          )}
        </Popup>

      </div>

      <div>
        <IoSearch className="searchicon" />
        <input type="text" placeholder='Search By Name/Id' className='search' onChange={(e) => setsearchatd(e.target.value)} ></input>

      </div>

      <div className="d-flex justify-content-center my-3 picker">
        <label className="fw-bold"></label>
        <DatePicker
          selected={dateatn}
          onChange={(date) => setdateatn(date)}
          dateFormat="dd-MM-yyy"
          placeholderText="    Select Date"
          className="form-control dts"
          maxDate={new Date()} />
      </div>

      <h3 className='text-center mt-3 ed'>Employee's Attendance</h3>
      <div className="row align mt-5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (

            <div className="col-md-4 mb-4 mt-4" key={user._id}>
              <div className="card h-100 shadow-sm atncard">
                <div className="card-body  d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center flex-grow-1">

                  <div className='firstletter'>
                    {user.employee?.name[0]}
                  </div>

                  
                  <div className="card-text ms-4">
                      <h5 className="card-title"> {user.employee?.name}</h5>
                      <strong>ID:</strong> {user.employee?.empId}<br />
                  </div>
                  </div>
                

                 
                  <Link to="/atndetails" state={{ details: user.employee, check: user.sessions, dates: user.date }} className='text-dark text-decoration-none'>   <MdKeyboardArrowRight className='rightarw' /> </Link>
                 

                </div>
               

                <div className='d-flex atnbgclr pt-2'>
                  <strong className='ms-4 date'>Date:</strong> <p className='ms-1'>{new Date(user.date).toLocaleDateString('en-GB')}</p> 
                  <strong className='ms-4 phone'>Phone:</strong> <p className='ms-1'>{user.employee?.contactNo}</p>
                  <strong className='ms-4 doj'>Doj:</strong> <p className='ms-1'>{new Date(user.employee?.doj).toLocaleDateString()}</p>
                 
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className='text-center tc'>No users found</p>
        )}

      </div>

    </>
  )
}
export default Attendance;









