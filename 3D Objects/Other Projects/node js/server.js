const http=require("http")
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct}= require('./Controller/ProductControl')

const Server=http.createServer((req,res)=>{
    if( req.url==='/api/products' && req.method==='GET'){
        getProducts(req,res)        
    }
    else if( req.url.match(/\/api\/products\/([0-9]+)/) /*req.url==='/api/products/1'*/ && req.method==='GET'){
        const id = req.url.split('/')[3]
        getProduct(req,res,id)
    }
    else if(req.url==='/api/products' && req.method==='POST'){
        createProduct(req,res);
    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/)  && req.method==='PUT'){
        const id=req.url.split('/')[3] 
        updateProduct(req,res,id)

    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/)  && req.method==='DELETE'){
        const id=req.url.split('/')[3]
        deleteProduct(req,res,id)        
    }
    else {
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:'Message not found'}))
    }
    
})
const port= process.env.port || 5000
Server.listen(port,()=>console.log(`server is running at ${port}`))