import {useHistory, useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import ViewProduct from './Viewproduct'
import UserCart from './Usercart'
import axios from "axios";

function Userprofile ( ) {

            let [user, setUser]= useState(" ")
            const   [product, setProduct]= useState(0);
            let history = useHistory();
            let paramObj = useParams();
            let [count, setcount] = useState(0)
          let [cd, setCd]= useState([])

     

         let addProductToCart = (productObj)=>{

                let username = localStorage.getItem("username")
                console.log(productObj)
   
                let newObj = {username,productObj}
    
                console.log("product added by the user is ",newObj)

                axios.post("/user/addtocart", newObj)
                .then(res =>{
                  let  resObj = res.data
                  setProduct(product+1)
                   alert(resObj.message)
                })
                .catch(err=>{
                   console.log("err in adding to cart", err)
                })
             }


           

            useEffect(()=>{
                    /*
                        axios.get(`/user/getusers/${paramObj.username}`)
                        .then(res=>{
                                    let userObj = res.data.message;
                                    setUser({ ...userObj })
                        })
                        */
                        let username = localStorage.getItem("username")
                        axios.get(`/user/getcart/${username}`)
                        .then(res=>{
                                    let productsObj = res.data.message;
                                    let products= productsObj[0].products
                                    
                                    let countt=products.length;
                                    
                                    console.log("count isss",countt)
                           
                                  setCd([...productsObj]) 
                                  setcount(countt)
                        },[])
                        .catch(err=>{
                           console.log(err)
                                    alert("something went wrong ")
                        })
                       let userObj = JSON.parse(localStorage.getItem("user"))
                       setUser({...userObj })
            }, [paramObj.username,product])


            return (
                        <div>
                        <h1 className="text-end">Welcome  ,<span className="text-danger">{paramObj.username}</span>
                        <img src={user.ProfileImage}  width="100px" alt="" className="me-3 bg-light" />
                        </h1>
                     
                        <BrowserRouter>
                        <ul className="nav ">
                        <li className="nav-item">
                                    <Link to ="/listofproduct" className="nav-link text-light bg-danger">List of Products</Link>
                                    </li>

                                    <li className="nav-item">
                                    <Link to ="/usercart" className="nav-link text-light bg-danger ms-5 me-5">List Of Cart
                                    <span className="badge text-dark ms-2 bg-light">{count}
                                    </span></Link>
                                    </li>
                        </ul>

                        <Switch>

                                    <Route path="/usercart">
                                    <UserCart product={cd} />

                                    </Route>

                                    <Route path="/listofproduct">
                                    <ViewProduct addProductToCart = {addProductToCart} />
                                    
                                    </Route>
                                    <Route path="/">
                                    <ViewProduct addProductToCart = {addProductToCart} />
                                    
                                    </Route>

                        </Switch>         
                        </BrowserRouter> 
                        </div>
            )
}
export default Userprofile;









                               {/*  <div className="text-end me-2">
                                <button className="btn btn-danger btn-sm float-right" onClick={handlelogout}>Log Out</button>            
                             <h3>Email:<span className="text-danger"> {user.email}</span></h3>
                                </div> */}