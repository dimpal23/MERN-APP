const exp=require("express")
const adminApi=exp.Router()
adminApi.use(exp.json())
const jwt=require("jsonwebtoken")
const expressErrorHandler=require("express-async-handler")

//login req

adminApi.post("/login",async(req,res,next)=>{
    let adminCollectionObject=req.app.get("adminCollectionObject")
    let credentials=req.body;
    let user=await adminCollectionObject.findOne({username:credentials.username})
    if(user===null){
        res.send({message:"Invalid username"})
    }
    else{
        if(user.password!==credentials.password){
            res.send({message:"Invalid password"})
        }
        else{
            delete user.password;
            let token=await jwt.sign({username:credentials.username},'abcdef',{expiresIn:120})
            res.send({message:"login-success",
            token:token,
            username:credentials.username
            })
        }
    }
})










module.exports=adminApi