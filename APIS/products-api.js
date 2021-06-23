const exp=require('express')
const productsApi=exp.Router();
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
            folder: 'Amisha',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})




const expressErrorHandler=require("express-async-handler")
productsApi.use(exp.json())

 productsApi.post("/createproducts",multerObj.single('photo'),async(req,res,next)=>{
     let  productCollectionObject=req.app.get("productCollectionObject")
    
    let newProduct=JSON.parse(req.body.prodObj);
    let product=await productCollectionObject.findOne({productname:newProduct.productname})
    if(product!==null){
        res.send("product already existed")
    }
    else{
        newProduct.ProfileImage=req.file.path;
        await productCollectionObject.insertOne(newProduct)
        res.send({message:"product created"})
    }
})

productsApi.get("/getproducts",async(req,res,next)=>{
    let  productCollectionObject=req.app.get("productCollectionObject")

    
    let productList=await productCollectionObject.find().toArray()
    console.log(productList);
    res.send({message:productList})
    

})
module.exports=productsApi ;