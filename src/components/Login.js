import {useForm} from "react-hook-form"
import {useHistory} from "react-router-dom"
import axios from 'axios'

function Login(props){

            let {register ,handleSubmit,formState:{errors}}= useForm();
            
         const history=useHistory();

            const onFormsubmit = (credentials)=> {
                axios.post(`/${credentials.type}/login`,credentials)
                .then(res=>{
                    let resObj=res.data;
                    if(resObj.message==='login-success'){
                        localStorage.setItem("token",resObj.token)
                        localStorage.setItem("user",JSON.stringify(resObj.userObj))
                        props.setUserLoginStatus(true)
                        if(credentials.type==="user"){
                            history.push(`/userpro/${resObj.username}`)

                        }
                        if(credentials.type==="admin"){
                            history.push(`/adminprofile/${resObj.username}`)

                        }
                        
                        
                       
                    }
                    else{
                        alert(resObj.message)
                    }
                })
                .catch(err=>{
                    console.log(err)
                    alert("something went wrong")
                    
                })
             }





            return(
                <form className="w-50 mx-auto bg-light " onSubmit={handleSubmit(onFormsubmit)}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="admin" {...register("type")} value="admin"/>
                        <label className="form-check-label" for="admin">Admin</label>

                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="user" {...register("type")} value="user"/>
                        <label className="form-check-label" for="user">user</label>

                    </div>
                           
         <label htmlFor="un">username </label>
         <input type="text" 
         id="un" 
         placeholder="username"
         {...register("username",{required:true , minLength:5, maxLength:30 })}
         className="form-control mb-3">

         </input>

         {errors.username?.type==="required"  && <p className="text-danger"> * Please enter the username </p>}
         {errors.username?.type==="minLength" && <p className="text-danger">username should be of  Min 5  Char</p>}
         {errors.username?.type==="maxLength" && <p className="text-danger">username should not be more  Max 30 Char</p>}
         

         <label htmlFor="un">password </label>
         <input type="password" 
         id="un" 
         placeholder="password"
         {...register("password",{required:true , minLength:5, maxLength:30 })} 
         className="form-control mb-3">

         </input>

         {errors.username?.type==="required"  && <p className="text-danger"> * Please enter the associate name</p>}
         {errors.username?.type==="minLength" && <p className="text-danger">Associate Name should be of  Min 5  Char</p>}
         {errors.username?.type==="maxLength" && <p className="text-danger">Associate Name should not be more  Max 30 Char</p>}
         


         <button type="submit"  className="btn btn-primary mt-3  me-2">Login</button>





                     </form>
            )
}

export default Login;