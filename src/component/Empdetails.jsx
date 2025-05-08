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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Empdetails() {
  // const a = useLocation();
  // // const navigate = useNavigate();
  // const employee = a.state?.employee;

  // if (!employee) {
  //   return (
  //     <div className="text-center mt-5">
  //       <p>No employee data found.</p>
  //       <button className="btn btn-warning" onClick={() => navigate(-1)}>Go Back</button>
  //     </div>
  //   );
  // }

  // const exportToExcel = () => {
  //   const data = [
  //     {
  //       Designation: employee.designation,
  //       Gender: employee.gender,
  //       'Date of Joining': new Date(employee.doj).toLocaleDateString(),
  //       'Blood Group': employee.bloodGroup,
  //       Phone: employee.contactNo,
  //       Email: employee.mailId,
  //       Address: employee.address
  //     }
  //   ];

  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Info");
  
  //   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  //   saveAs(dataBlob, 'Employee_Details.xlsx');
  // };


  return (
    <>

      {/* <div className='content'> */}
        {/* <img src={ymc} width={170}></img> */}
        {/* <Link to="/home"> <MdKeyboardArrowLeft className='leftaw' /></Link> */}
        {/* <Link to="/home" className='text-decoration-none'> <button className='btn1 bg-warning '>Employee's Details</button></Link> 
             <Link to='/attendance' className='text-decoration-none'><button className='btn2'>Employee's Attendance</button></Link> 
     */}



        {/* <Popup trigger={<IoMdInformationCircleOutline className='info' />} modal closeOnDocumentClick contentStyle={{ borderRadius: '12px', padding: '0', width: '90%', maxWidth: '400px' }}>
               {(close) => (
                 <div className="p-1 bg-white rounded text-center">
                   <h2 className="text-xl font-bold mb-4">Developer Information</h2>
                   <img src={sct} width={250}></img>
                   <p> <TbWorld className='text-warning' /> https://shinecrafttechnologies.com </p>
                   <p> <IoMail className='text-warning ' /> solutions@shinecrafttechnologies </p>
                   <button onClick={close} className="mt-4  text-dark bg-warning close">Close</button>
                 </div>
               )}
             </Popup> */}

      {/* </div>

      <div className="container mt-5"> */}
        {/* <h2 className="text-center mb-4">Employee Details</h2> */}

        {/* <div className='firstletters'>
          {employee.name[0]}

        </div>

        <div className='text-center mt-3 empnameid'>
          <b>{employee.name} </b> <br />
          {employee.empId}<br />

        </div> */}


        {/* <div className="card shadow p-3 mt-3 bgclrempd rounded">
          <div className="card-body">
            <h5 className="card-title">Employee Information</h5>
            <p className="card-text"style={{ fontSize: "18px" }}>
              <strong style={{ fontSize: "18px" }}>Designation:</strong> {employee.designation}<br />
              <strong style={{ fontSize: "18px" }}>Gender:</strong> {employee.gender}<br />
              <strong style={{ fontSize: "18px" }}>Date of Joining:</strong> {new Date(employee.doj).toLocaleDateString()}<br />
              <strong style={{ fontSize: "18px" }}>Blood Group:</strong> {employee.bloodGroup}<br />
            </p>
          </div>
        </div> */}

        {/* <div className="card shadow p-3 mt-3 bgclrempd rounded">
          <div className="card-body">
            <h5 className="card-title">Contact Information</h5>
            <p className="card-text" style={{ fontSize: "18px" }}>
              <strong style={{ fontSize: "18px" }}>Phone:</strong> {employee.contactNo}<br />
              <strong style={{ fontSize: "18px" }}>Email:</strong> {employee.mailId}<br />
              <strong style={{ fontSize: "18px" }}>Address:</strong> {employee.address}<br />

            </p>
          </div>
        </div> */}

      {/* </div>
      <button className="btn mt-3 " onClick={exportToExcel}>Export</button> */}


    </>
  )
}


export default Empdetails;
