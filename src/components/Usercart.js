

function UserCart(props){
       
       

      let  cartData=props.product;
    console.log("card data is ", cartData)


    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>product -Type</th>
                    <th>Date OF Manf</th>
                    <th>product Image</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                 cartData && cartData.map((da,ind)=>{
                     return(
                        da.products.map((data)=>{
                           return(
                                <tr key={ind}>
                            <td>{data.productname}</td>
                            <td>{data.producttype}</td>
                            <td>{data.dateofmanufacture}</td>
                            <td><img src={data.ProfileImage} width="80px" /></td>
                            <td><button className="btn btn-danger btn-sm">Delete</button></td>

    {/* happyy noww aage ka kro */}
                        </tr>
                        )
                        })
                    
                      )
                     
                 })
             }    
            
            </tbody>

        </table>
    )
}
export default UserCart;