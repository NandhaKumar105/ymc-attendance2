import React from 'react';
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
import { useDownloadExcel } from 'react-export-table-to-excel';
import { MdKeyboardArrowRight } from "react-icons/md";


function Home() {

  // search filter
  let [search, setsearch] = useState('')
  // api data storing
  let [data, setdata] = useState([]);
  // date picker
  const [selecteddate, setselecteddate] = useState(null);



  //   const tableRef= useRef(null)
  //   const {onDownload}= useDownloadExcel({
  //     currentTableRef:tableRef.current,
  //     filename:"emp-info",
  //     sheet:"emp"
  // })

  const filteredUsers = data.filter(user => {
    const name = user.name?.toLowerCase().trim() || "";
    const empId = user.empId?.toString().toLowerCase().trim() || "";
    const searches = search.toLowerCase().trim();
    const matchesSearch = name.includes(searches) || empId.includes(searches);


    const matchesDate = selecteddate
      ? new Date(user.date).toDateString() === selecteddate.toDateString()
      : true;

    return matchesSearch && matchesDate;
  });


  useEffect(() => {
    // const accessToken = localStorage.getItem("token");

    // if (!accessToken) {
    //   // console.warn
    //     alert("No token found. Redirecting to login.");
    //   navigate("/"); 
    //   return;
    // }


    axios("api/employees/getAllEmployees",
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDI5ZDZkNmFmMTk4ZWQ2MTgxNWExNiIsImlhdCI6MTc0NjE3NTczNywiZXhwIjoxNzQ2MTc2NjM3fQ._TPKf1ZmosSEQBreDdaMkLvSsd_4-NGatTWsKjz5cMA"}`,
        }
      }
    )
      .then((res) => setdata(res.data))
  }, [])



  return (

    <>


      {/* <Link to="/" className='text-decoration-none'> <GrFormPreviousLink className="leftaw" /> </Link>
            <Link to='/attendance'> <GrFormNextLink className='rightarrow'/> </Link> */}

      <div className='content'>
        <img src={ymc} width={170}></img>
        <button className='btn1 bg-warning '>Employee's Details</button>
        <Link to='/attendance' className='text-decoration-none'><button className='btn2'>Employee's Attendance</button></Link>




        <Popup trigger={<IoMdInformationCircleOutline className='info' />} modal closeOnDocumentClick contentStyle={{ borderRadius: '12px', padding: '0', width: '90%', maxWidth: '400px' }}>
          {(close) => (
            <div className="p-1 bg-white rounded text-center">
              <h2 className="text-xl font-bold mb-4">Developer Information</h2>
              <img src={sct} width={250}></img>
              <p> <TbWorld className='text-warning' /> https://shinecrafttechnologies.com </p>
              <p> <IoMail className='text-warning ' /> solutions@shinecrafttechnologies </p>
              <button onClick={close} className="mt-4  text-dark bg-warning close">Close</button>
            </div>
          )}
        </Popup>

      </div>


      <div>
        <IoSearch className="searchicon" />
        <input type="text" placeholder='Search By Name/Id' className='search ' onChange={(e) => setsearch(e.target.value)}></input>
      </div>

      {/* <div className="d-flex justify-content-center my-3 ms-1">
         <label className="fw-bold"></label>
         <DatePicker
           selected={selecteddate}
           onChange={(date) => setselecteddate(date)}
           dateFormat="dd-MM-yyy"
           placeholderText="    Select Date"
           className="form-control dts"
           maxDate={new Date()} />
       </div> */}


      <h3 className='text-center mt-3 ed'>Employee's Details</h3>
      <div className="row">

        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div className="col-md-4 mb-4 mt-4 " key={user._id}>
              <div className="card h-100 shadow-sm bgclr ms-4">
                <div className="card-body d-flex">

                  {/* First letter in circle */}
                  <div className='firstletter'>
                    {user.name[0]}

                  </div>

                  <p className="card-text ms-5">
                    <h5 className="card-title">{user.name}</h5>
                    <strong>ID:</strong> {user.empId}<br />
                    {/* <strong>Username:</strong> {user.name}<br /> */}
                    {/* <strong>Email:</strong> {user.mailId}<br />
                      <strong>Phone:</strong> {user.contactNo}<br /> */}
                    <strong>Designation:</strong> {user.designation}<br />
                    {/* <strong>Doj:</strong> {user.doj}<br/> */}

                  </p>
                  <Link to="/empdetails" state={{ employee: user }} className='text-dark'>   <MdKeyboardArrowRight className='rightarw' /> </Link>


                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>No users found.</p>
        )}
      </div>

    </>
  )
}
export default Home;








