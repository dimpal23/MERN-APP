import {useParams ,useHistory} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'


function Viewproduct(props){
    let paramsObj=useParams();
    let [product,setProduct]=useState([])
    let [adminoption,setAdminOption]=useState(true)
    console.log("product is", product);
    
    
    
    let history=useHistory()

   useEffect(()=> {
        axios.get("/product/getproducts")
        .then(res=>{
            let productObj=res.data.message;
            console.log("product obj is",productObj)
            setProduct([...productObj])
           
           
            
        })
        .catch(err=>{
            console.log(err)
            alert("something went wrong")
        })

        let usertype=localStorage.getItem("usertype")
        if(usertype==="admin"){
            setAdminOption(true)
        }
        else{
            setAdminOption(false)
        }
        //get data from local storage
        //let productObj=JSON.parse(localStorage.getItem("user"))
    
    },[product.productname])

  
    


    return(
        <div className="row row-col-sm-3 mt-3">
            {
                product.map((element)=>{
                    return(
                        <div className="col-sm-3">
                            <div className="card">
                                <img className="card-img-top text-center" width="200px" src={element.ProfileImage} />
                                <div className="card-body">
                                    <h5 className="card-title">Product Name: {element.productname}</h5>
                                    <h5>Product Type: {element.producttype}</h5>
                                    <h5>DateofManf: {element.dateofmanufacture}</h5>
                                    
                                         { adminoption ?
                                         <div> 
                                             <button className="btn btn-danger float-end">Edit</button>
                                             <button className="btn btn-danger float-end">Delete</button>
                                         </div>:
                                         <button className="btn btn-success float-end" onClick={()=>props.addProductToCart(element)}>Add to cart</button>
                                        }
                                   

                                </div>

                            </div>

                        </div>
                        

                    )
                })
            
           }     
       
        </div>
        
    )

}
export default Viewproduct;