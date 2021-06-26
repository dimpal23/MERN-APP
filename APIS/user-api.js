const exp=require('express')
const userApi=exp.Router();
userApi.use(exp.json())
const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
//configure cloudinary
cloudinary.config({
    cloud_name: 'ddfysduhl',
    api_key: '764467732477635',
    api_secret: 'yLC-m2Of0sd_6UKI4LSTNkIB1MI'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})








const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const expressErrorHandler=require("express-async-handler")

 userApi.get("/getusers",async(req,res,next)=>{
     let userCollectionObject=req.app.get("userCollectionObject")
     
     let userList=await userCollectionObject.find().toArray()
     res.send({message:userList})
 })
 //get cart data
userApi.get("/getcart/:username",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObject=req.app.get("userCartCollectionObject")
    let un=req.params.username
    let cartList=await userCartCollectionObject.find({username:un}).toArray()
    console.log("cart list is",cartList)
    res.send({message:cartList})
}))
//read all users using promise
/*userApi.get("/getusers", (req, res, next) => {
    userCollectionObject.find().toArray()
        .then(userList => {
            res.send({ message: userList })
        })
        .catch(err => {
            console.log("err in reading user", err)
            res.send({ message: err.message })
            
        })
})*/


 /*userApi.post("/createuser",(req,res,next)=>{
     let newUser=req.body;
     databaseObject.collection("usercollection").insertOne(newUser,(err,success)=>{
         if(err){
             console.log("err in user creation")
         }
         else{
             res.send({message:"user created"})
         }
     })
 })*/
 /*userApi.post('/createuser', (req, res, next) => {
    //get user object
    let newUser = req.body;
    //check username is already existed
    databaseObject.collection("usercollection").findOne({username:newUser.username},(err,userObj)=>{
            if(err){
                console.log("err in reading one user",err)
            }
            //if user is existed
            if(userObj!==null){
                res.send({message:"user already existed"})
            }
            //if user is not existed
            else{
                //insert user
                databaseObject.collection("usercollection").insertOne(newUser,(err,success)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.send({message:"User created"})
                    }
                })
            }
           
    })
})*/
 /*userApi.get("/getusers",(req,res,next)=>{
    //read all users
    databaseObject.collection('usercollection').find().toArray((err,usersList)=>{
        if(err){
            console.log("err in reading users",err)
            res.send({message:err.message})
        }
        else{
            res.send({message:usersList})
        }
    })
})
//read user by username
//read user by username
userApi.get("/getuser/:username",(req,res,next)=>{
    //get username from url param
    let un=req.params.username;
    //search in collection
    databaseObject.collection("usercollection").findOne({username:un},(err,userObject)=>{
        if(err){
            console.log("err in reading one user",err)
            res.send({message:err.message})
        }
        //when user not found
        if(userObject==null){
                res.send({message:"user not found"})
        }
        //if user existed
        else{
            res.send({message:userObject})
        }
    })
 })*/
 userApi.get("/getuser/:username",expressErrorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    
     let un=req.params.username;
     let user=await userCollectionObject.findOne({username:un})
    
         res.send({message:user})
 }))
/*userApi.get("/getuser/:username",(req,res,next)=>{
     let un=req.params.username;
     userCollectionObject.findOne({username:un})
     .then(userObj=>{
         if(userObj==null){
             res.send({message:"user not existed"})
         }
         else{
             res.send({message:userObj})
         }
     })
     .catch(err=>{
         console.log("err is",err)
         res.send({message:err.message})
     })
 })*/
 /*userApi.post("/createuser", (req, res, next) => {
    //get user obj
    let newUser = req.body;
    //seach for existing user
    userCollectionObject.findOne({ username: newUser.username })
        .then(user => {
            //if user is existed
            if (user !== null) {
                res.send({ message: "User already existed" })
            }
            else {
                userCollectionObject.insertOne(newUser)
                    .then((success) => {
                        res.send({ message: "User created" })
                    })
                    .catch(err => res.send(err.message))
            }
        })
})*/
/*userApi.post("/createusers",async(req,res,next)=>{
    let newUser=req.body;
    let user=await userCollectionObject.findOne({username:newUser.username})
    if(user!==null){
        res.send("user already existed")
    }
    else{
        await userCollectionObject.insertOne(newUser)
        res.send({message:"user created"})
    }
})*/
userApi.post("/addtocart",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObject=req.app.get("userCartCollectionObject");
    let userCartObj=req.body;
    let userInCart= await userCartCollectionObject.findOne({username:userCartObj.username})
    if(userInCart===null){
        let products=[];
        products.push(userCartObj.productObj)
        let newUserCartObject={username:userCartObj.username,products:products}
        console.log(newUserCartObject)
        await userCartCollectionObject.insertOne(newUserCartObject)
        res.send({message:"product added to cart"})
    }
    else{
          userInCart.products.push(userCartObj.productObj)
          //update
          await userCartCollectionObject.updateOne({username:userCartObj.username},{$set:{...userInCart}})
          res.send({message:"product addeded to cart"})

    }

}))



userApi.post("/createusers",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    
    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObject.findOne({username:newUser.username})

    if(user!==null){
        res.send({message:"user allready existed"})
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUser.password,7)
        newUser.password=hashedPassword;
        newUser.ProfileImage=req.file.path;


        await userCollectionObject.insertOne(newUser)
        res.send({message:"user created"})
    }
}))
userApi.put("/updateuser/:username",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    
    let modifiedUser=req.body;

    let un=req.params.username;
    let user=await userCollectionObject.findOne({username:un})

    if(user===null){
        res.send({message:"user not esisted"})
    }
    else{
        await userCollectionObject.updateOne({username:modifiedUser.username},{$set: {...modifiedUser}})
        res.send({message:"user updated"})
    }
})
/*userApi.put("/updateuser/:username",(req,res,next)=>{
    let modifiedObj=req.body;
    userCollectionObject.updateOne({username:modifiedObj.username},
                                    {$set:{
                                        email:modifiedObj.email,
                                        age:modifiedObj.age,
                                        city:modifiedObj.city
                                    }})
    .then(success=>{
        res.send({message:"user updated"})
    })
    .catch(err=>{
        console.log("err is",err)
        res.send({message:err.message})
    })                                
})*/
userApi.delete("/deleteuser/:username",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")

    let un=req.params.username;
    let user=await userCollectionObject.findOne({username:un})

    if(user===null){
        res.send({message:"user not existed"})
    }
    else{
        await userCollectionObject.deleteOne({username:un})
        res.send({message:"user removed"})
    }
})

userApi.post("/login",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    
    let credentials=req.body;
    let user=await userCollectionObject.findOne({username:credentials.username})

    if(user===null){
        res.send({message:"invalid username"})
    }
    else{
        let result=await bcryptjs.compare(credentials.password,user.password)
        if(result===false){
            res.send({message:"Invalid password"})
        }
        else{
            delete user.password;
            let token=await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn:120})
            res.send({message:"login-success",
            token:token,
            username:credentials.username,
            userObj:user})
        }
    }
})


module.exports=userApi;