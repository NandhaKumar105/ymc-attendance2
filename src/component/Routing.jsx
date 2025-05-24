
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Attendance from "./Attendance";
import Empdetails from "./Empdetails";
import Atndetails from "./Atndetails";

function Routing()
{
    return(
        <>

        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/attendance' element={<Attendance></Attendance>}></Route>
            <Route path='/empdetails' element={<Empdetails></Empdetails>}></Route>
            <Route path='/atndetails' element={<Atndetails></Atndetails>}></Route>


        </Routes>
        
        
        </BrowserRouter>
     
        
        </>
    )
}
export default Routing;






        
        
       