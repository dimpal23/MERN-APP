const exp = require ("express")
const app  = exp();
const path = require("path")
require('dotenv').config()


app.use(exp.static(path.join(__dirname,"./build/")))
const userApi = require("./APIS/user-api")
const productsApi = require("./APIS/products-api")
const adminApi=require("./APIS/admin-api")

app.use("/user", userApi)
app.use("/product", productsApi)
app.use("/admin",adminApi)
let dburl=process.env.DATABASE_URL
let databaseObject;
const mongoClient=require("mongodb").MongoClient
mongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
  if(err){
    console.log("err in db connect",err)
  }
  else{
    databaseObject=client.db("mydatabase")
   let userCollectionObject=databaseObject.collection("userCollection")
   let productCollectionObject=databaseObject.collection("productcollection")
   let adminCollectionObject=databaseObject.collection("admincollection")
   let userCartCollectionObject=databaseObject.collection("usercartcollection")

    app.set("userCollectionObject",userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)
    app.set("adminCollectionObject",adminCollectionObject)
    app.set("userCartCollectionObject",userCartCollectionObject)

    console.log("DB connection success")
  }
})






/*app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })*/
  app.use((req,res,next)=>{
      res.send({message:`path ${req.url} is invalid`})
  })
  app.use((err,req,res,next)=>{
      res.send({message:err.message})
  })

const port=process.env.PORT||8080;
app.listen(port, ()=>console.log(`server is listening on port `))