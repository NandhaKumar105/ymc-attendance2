import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();

  //  const [token, setToken] = useState(null);

  const submit = async (e) => {
    e.preventDefault()
    // console.log(email,password)

    try {
      const response = await fetch("https://attendance-eight-sand.vercel.app/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDI5ZDZkNmFmMTk4ZWQ2MTgxNWExNiIsImlhdCI6MTc0NTM4MTExNiwiZXhwIjoxNzQ1MzgyMDE2fQ.t1cUB3zSgOH0ooJQ3p33Hpwenx60NSn2BNAXjiptxrk"}`,

          },
          body: JSON.stringify({ email, password })

        }
      )

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        localStorage.setItem("token", data.accessToken)
        navigate("/home");
      }
      else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }

  }
  // const handleLogin = (newToken) => {
  //   setToken(newToken);
  //   localStorage.setItem('token', newToken); 
  // };






  return (
    <>


      <div className="header">

        <h3 className="text-center mt-3">LOGIN</h3>

        <div className="login">
          <form onSubmit={submit}>
            <label className="em">Email</label> <br />
            <input type="email" placeholder="Enter Your Email" className="mt-2" value={email} onChange={(e) => setemail(e.target.value)}></input> <br />

            <label className="pwd">Password</label> <br />
            <input type="password" placeholder="Enter Your Password" className="mt-2" value={password} onChange={(e) => setpassword(e.target.value)}></input> <br />

            {/* <Link to="/home">  */}
            <button className="fw-bold text-dark" type='submit'>Login</button>
            {/* </Link>  */}
          </form>
        </div>


      </div>


    </>
  )
}
export default Login;