import {useForm} from "react-hook-form"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useState } from "react";

function Registration(){

            let {register ,handleSubmit,formState:{errors}}= useForm();
            let [file,setFile]=useState(null)
            const history=useHistory();

            const onFormsubmit = (userObj)=> {

                    //creatr FormData obj
                    let formData=new FormData();

                    //add file to formData
                    formData.append("photo",file,file.name)

                    //add userObj to formData
                    formData.append("userObj",JSON.stringify(userObj))
                    console.log("userobj is ", userObj)
                  
                       
                        axios.post("/user/createusers",formData)
                        .then(res=>{
                            let resObj=res.data
                            alert(resObj.message)
                            history.push('/login')
                        })
                        .catch(err=>{
                            console.log(err);
                            alert("something went wrong")
                        })
                  
        
                }
                const onFileSelect=(e)=>{
                    setFile(e.target.files[0])
                }


            return(
                  
                <div className="bg-light" >
                <form className="mx-auto w-50 mt-4" onSubmit={handleSubmit(onFormsubmit)}>

                <label htmlFor="un">Username</label>
                <input type="text" id="un" className="form-control mb-3" {...register('username')}></input>
     
                <label htmlFor="pw">Password</label>
                <input type="password" id="pw" className="form-control mb-3"{...register('password')}></input>
     
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control mb-3" {...register('email')}></input>
     
                <label htmlFor="dob">Date of birth</label>
                <input type="date" id="dob" className="form-control mb-3" {...register('dateofbirth')}></input>

                <input type="file" name="photo" className="form-control mb-3" onChange={(e)=>{onFileSelect(e)}}></input>
     
     
                 <button type="submit" className="btn btn-primary mt-3 p-2">Register</button>
     
     
            </form>
            </div>

                        




                                  
            )
}

export default Registration;