import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    // useEffect

    useEffect(()=>{
        const localExistCart = JSON.parse(localStorage.getItem('amir_store_cart'));
        localExistCart && setCart(localExistCart);
    }, [cart.length])

    return (
        <cartContext.Provider value={[cart, setCart]}>
            {children}
        </cartContext.Provider>
    )
}


const useCart = ()=>useContext(cartContext);

export {CartProvider, useCart};