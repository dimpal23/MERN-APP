import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useHistory} from "react-router-dom"
import {useState} from 'react'
function Addproduct(){

    let {register,handleSubmit,formState:{errors}}=useForm();
    let [file,setFile]=useState(null)
    const onFormsubmit=(prodObj)=>{

        let formData=new FormData();
        formData.append("photo",file,file.name);

        //add userObj to formData suno 
        formData.append("prodObj",JSON.stringify(prodObj))
        console.log("prodobj is ", prodObj)
        
        axios.post("/product/createproducts",formData)
        .then(res=>{
            let resObj=res.data;
            console.log(resObj);
            alert(resObj.message)
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong")

        })
    }
    const onFileSelect=(e)=>{
        setFile(e.target.files[0]);

    }
    return(
     <div className="bg-light" >
        <form className="mx-auto w-50 mt-4" onSubmit={handleSubmit(onFormsubmit)}>

        <label htmlFor="un">Productname</label>
        <input type="text" id="un" className="form-control mb-3" {...register('productname')}></input>

        <label htmlFor="pw">Product Type</label>
        <input type="password" id="pw" className="form-control mb-3"{...register('producttype')}></input>

       
        <label htmlFor="dob">Date of Manufacture</label>
        <input type="date" id="dob" className="form-control mb-3" {...register('dateofmanufacture')}></input>
        <input type="file" name="photo" className="form-control mb-3" onChange={(e)=>{onFileSelect(e)}}></input>

        <button type="submit" className="btn btn-primary mt-3 p-2">Add</button>
        </form>
   </div>
    )
}
export default Addproduct;