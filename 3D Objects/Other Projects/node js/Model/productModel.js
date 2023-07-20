const products= require('../Data/products')
const {v9:uuidv9}=require('uuid')
const{writeDataToFile}=require('../util.js')
function findAll(){
    return new Promise((res,rej)=>{
        res(products)
    }
)}
function findByID(id){
    return new Promise((res,rej)=>{
        const product=products.find((p)=> p.id===id)
        res(product)
        
    })
}
function create(product){
    return new Promise((resolve,reject)=>{
        const newProduct={id:uuidv9(),...product}
        // const newProduct={id:60,...product}
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
        const delIndex=products.findIndex((p)=>p.id===index)
        resolve(products.remove(delIndex))
        
    })

}

module.exports={findAll,findByID,create,update,deleteProd}