import { createContext, useContext, useState } from "react";

const bgContext = createContext();

const BgProvider = ({children})=>{
    const [bg, setBg] = useState({darkBg:false, userRole:false, updateProfile:false, orderStatus:false, showUploadProduct:false, showZoomProduct:false, showUpdateProduct:false, showCartQuantity:false});

    return(
        <bgContext.Provider value={[bg, setBg]}>
            {children}
        </bgContext.Provider>
    )
}

const useBg  = ()=>useContext(bgContext);

export {BgProvider, useBg};