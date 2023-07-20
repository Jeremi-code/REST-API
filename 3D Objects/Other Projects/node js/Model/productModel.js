let products= require('../Data/products')
const {v4:uuidv4}=require('uuid')
const{writeDataToFile}=require('../util.js')
function findAll(){
    return new Promise((res,rej)=>{
        res(products)
    }
)}
function findByID(id){
    return new Promise((resolve,reject)=>{
        const product=products.find((p)=> p.id===id)
        resolve(product)
        
    })
}
function create(product){
    return new Promise((resolve,reject)=>{
        const newProduct={id:uuidv4(),...product}
        products.push(newProduct)
        writeDataToFile('./Data/products.json',products)
        resolve(newProduct)
    })
}
function update(id,product){
    return new Promise((resolve,reject)=>{
        const index=products.findIndex((p)=> p.id===id)
        products[index]={id,...product}
        writeDataToFile('./data/products.json',products)
        resolve(products[index])
        
    })
    

}
function deleteProd(index){
    return new Promise((resolve,reject)=>{
        products = products.filter((p)=> p.index!==index)
        writeDataToFile('./data/products.json',products)
        resolve()        
    })

}

module.exports={findAll,findByID,create,update,deleteProd}