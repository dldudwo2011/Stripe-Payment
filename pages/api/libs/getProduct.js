async function getProduct(key){
 
    const res = await fetch(`https://dmit2008-ed68c-default-rtdb.firebaseio.com/products/${key}.json`)
    const data = await res.json()
    
    //  const item =  Object.values(data).map(product=>{
    //      console.log(product.key)
    //  })

     return data;
    
}

export {getProduct}