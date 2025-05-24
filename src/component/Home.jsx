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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


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
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDI5ZDZkNmFmMTk4ZWQ2MTgxNWExNiIsImlhdCI6MTc0ODA4MzU2NywiZXhwIjoxNzQ4MDg0NDY3fQ.s_zegYO-y6UFWntyFCZOW6xluCSXK9S8YmMRipINnvg"}`,
        }
      }
    )
      .then((res) => setdata(res.data))
  }, [])

   const exportToExcel = () => {
    const data = filteredUsers.map((user) => ({
      Name: user.name,
      ID: user.empId,
      Designation: user.designation,
      Gender: user.gender,
      'Date of Joining': new Date(user.doj).toLocaleDateString(),
      'Blood Group': user.bloodGroup,
      Phone: user.contactNo,
      Email: user.mailId,
      Address: user.address,
    })); 
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  
    const fileData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  
    saveAs(fileData, 'EmployeeDetails.xlsx');
  };
  
     
  



  return (

    <>


      {/* <Link to="/" className='text-decoration-none'> <GrFormPreviousLink className="leftaw" /> </Link>
            <Link to='/attendance'> <GrFormNextLink className='rightarrow'/> </Link> */}

      <div className='content'>
        <img src={ymc} width={170} className='ymc'></img>
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

      <div>
      <button className="btn mt-3 pt-1 " onClick={exportToExcel}>Export</button>
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
      <div className="row align mt-5">

        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div className="col-md-5 mb-4 mt-4 cardsize" key={user._id}>
              <div className="card  shadow-sm bgclr">
                <div className="card-body d-flex justify-content-between align-items-center ">

                  {/* First letter in circle */}
                  <div className='firstletter'>
                    {user.name[0]}

                  </div>

                  <p className="card-text ms-4">
                    <h5 className="card-title">{user.name}</h5>
                    <strong>ID:</strong> {user.empId}<br />
                    {/* <strong>Username:</strong> {user.name}<br /> */}
                    {/* <strong>Email:</strong> {user.mailId}<br />
                      <strong>Phone:</strong> {user.contactNo}<br /> */}
                    <strong>Designation:</strong> {user.designation}<br />
                    {/* <strong>Doj:</strong> {user.doj}<br/> */}

                  </p>
                  {/* <Link to="/empdetails" state={{ employee: user }} className='text-dark'>  
                   <MdKeyboardArrowRight className='rightarw' /> </Link> */}

                  <Popup  trigger={<MdKeyboardArrowRight className='rightarw' />} modal closeOnDocumentClick contentStyle={{ borderRadius: '12px', padding: '0', width: '85%', maxWidth: '500px' }}  contentClassName="pop">
                    {(close) => (
                      <div className="p-1 bg-white rounded ">

                        <div className='firstletters'>
                          {user.name[0]}

                        </div>

                        <div className='text-center mt-3 empnameid'>
                          <b>{user.name} </b> <br />
                          {user.empId}<br />

                        </div>

                        <h4 className="text-xl font-bold mb-4 text-center">Employee Information</h4>
                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Designation:</strong> {user.designation}<br />
                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Gender:</strong> {user.gender}<br />
                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Date of Joining:</strong> {new Date(user.doj).toLocaleDateString()}<br />
                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Blood Group:</strong> {user.bloodGroup}<br />

                        <h4 className="card-title text-center mt-4 mb-2">Contact Information</h4>

                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Phone:</strong> {user.contactNo}<br />
                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Email:</strong> {user.mailId}<br />
                        <strong style={{ fontSize: "17px", marginLeft: "60px" }}>Address:</strong> {user.address}<br />

                        <div>
                          <button onClick={close} className="mt-4  text-dark bg-warning okbtn ">Ok</button>
                        </div>
                      </div>
                    )}
                  </Popup>


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
export default Home;








