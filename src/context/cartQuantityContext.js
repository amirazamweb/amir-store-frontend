import { createContext, useContext, useState } from "react";

const cartQuantityContext = createContext();

const CartQuantityProvider = ({children})=>{
    const [cartQuantityData, setCartQuantityData] = useState({
        brandName : '',
        category : '',
        createdAt : '',
        description : '', 
        price : '',
        productImage : [],
        productName : '', 
        qty : '',
        sellingPrice : '',
        updatedAt : '', 
        _id : '', 
    });


    return(
        <cartQuantityContext.Provider value={[cartQuantityData, setCartQuantityData]}>
          {children}
        </cartQuantityContext.Provider>
    )
}

const useCartQuantityData = ()=>useContext(cartQuantityContext);

export {CartQuantityProvider, useCartQuantityData};