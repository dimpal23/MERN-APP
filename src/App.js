import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Register from "./components/Registration";
import Login from "./components/Login";
import Userprofile from "./components/Userprofile"
import {useState} from 'react'
import AdminProfile from "./components/AdminProfile";




function App() {

    let [userLoginStatus,setUserLoginStatus]=useState("");
    const logOutUser=()=>{
        localStorage.clear();
        setUserLoginStatus(false)
    }

  return (
    <div className="App">
<BrowserRouter>
<ul className="nav bg-dark text-white justify-content-end p-2">
            <li className="nav-item">
            <Link to ="/home" className="nav-link">Home</Link>
            </li>


            <li className="nav-item">
            <Link to ="/register" className="nav-link">Register</Link>
            </li>

            {
                !userLoginStatus ?
                <li className="nav-item">
                <Link to ="/login" className="nav-link">Login</Link>
                </li> :
    
                <li className="nav-item">
                <Link to ="/logout" className="nav-link" onClick={()=>logOutUser()}>Logout</Link>
                </li>
            }
           

            <li className="nav-item">
            <Link to ="/userpro" className="nav-link">User profile</Link>
            </li>
            
          
          
            
        </ul>

<Switch>
            <Route path="/home">
                <Home />

            </Route>


            <Route path="/register">
                <Register />

            </Route>

            <Route path="/login">
                <Login setUserLoginStatus={setUserLoginStatus}/>

            </Route>

            <Route path="/userpro/:username">
                <Userprofile />

            </Route>
            <Route path="/adminprofile/:username">
                <AdminProfile />

            </Route>
           

        </Switch>


        </BrowserRouter>

    </div>
  );
}

export default App;
