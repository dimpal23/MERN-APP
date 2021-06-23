import {useParams ,useHistory} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'


function Userprofile(){
    let paramsObj=useParams();
    let[user,setUser]=useState('')
    let history=useHistory()

    useEffect(()=> {
        /*axios.get(`/user/getuser/${paramsObj.username}`)
        .then(res=>{
            let userObj=res.data.message;
            setUser({...userObj})
        })*/
        //get data from local storage
        let userObj=JSON.parse(localStorage.getItem("user"))
        setUser({...userObj})   
    },[paramsObj.username]) 

  
    


    return(
        <div>
        <h1>welcome,<span className="text-primary">{paramsObj.username}</span></h1>

        <h3>{user.email}</h3>
        <img src={user.ProfileImage} width="200px" alt="" />
        

       
       
       
        </div>
    )

}
export default Userprofile;