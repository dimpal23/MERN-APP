import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import Addproduct from './Addproduct'
import Viewproduct from './Viewproduct'


function AdminProfile(){
    return(
       <BrowserRouter>
       <ul className="nav nav-pills nav-fill">
           <li className="nav-item">
               <Link to="/addproduct" className="nav-link bg-primary text-white border p-2 m-2">Addproduct</Link>

           </li>
           <li className="col-6">
               <Link to="/viewproduct" className="nav-link bg-success text-white border p-2 m-2">Viewproduct</Link>

           </li>


       </ul>
       <Switch>
           <Route path="/addproduct">
               <Addproduct/>

           </Route>
           <Route path="/viewproduct">
               <Viewproduct/>

           </Route>
       </Switch>



       </BrowserRouter>
    )
}
export default AdminProfile;