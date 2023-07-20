const Product = require('../Model/productModel')
const{getPostData}=require('../util')

async function getProducts(req,res){
    try {
        const products= await Product.findAll()
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
        
    }
}
async function getProduct(req,res,id){
    try {
        const products= await Product.findByID(id)
        if (!products){
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify({Message:'Message not found '}))
        }
        else{
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify({products}))

        }
    } 
        catch (error) {
            console.log(error)
        }
        
    }
    async function createProduct(req,res){
        try{
            const body=await getPostData(req)
            const{title,description,price}=JSON.parse(body)
            const product={
                title,
                description,
                price
            }
            const newProduct=await Product.create(product)
            res.writeHead(201,{'Content-Type':'application/json'})
            res.end(JSON.stringify(newProduct))
     
     
        }
        catch(error){
            console.log(error)
        }
    }
    async function updateProduct(req,res,id){
        try{
            const product=await Product.findByID(id)
            if(!product){
                res.writeHead(404,{'Content-Type':'application/json'})
                res.end(JSON.stringify({Message:'Message not found'}))
            }
            else{

                const body=await getPostData(req)
                const {title,description,price}=JSON.parse(body)
                const productData={
                    title:title || product.title,
                    description:description || product.description,
                    price:price || product.price
                }
                const updProduct=await Product.update(id,productData)
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(JSON.stringify({Message:`${updProduct}`}))

            }
        }
    catch(error){
        console.log(error)
    }
}
async function deleteProduct(req,res,id){
    try{
        const product= await Product.findByID(id)
        if(!product){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({Message:'Product not found '}))
        }
        else{
            await Product.deleteProd(id)
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify({Message:`product ${id} has been removed `}))
        }
    }
    catch(error){
        console.log(error)
    }
}
module.exports={getProducts,getProduct,createProduct,updateProduct,deleteProduct}