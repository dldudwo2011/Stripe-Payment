async function getProduct(key){
 
    const res = await fetch(`https://dmit2008-ed68c-default-rtdb.firebaseio.com/products/${key}.json`)
    const data = await res.json()
     return data;
    
}

export {getProduct}