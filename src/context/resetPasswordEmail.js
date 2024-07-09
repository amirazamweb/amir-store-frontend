import { createContext, useContext, useState } from "react";

const resetEmailPasswordContext = createContext();

const ResetPasswordWmailProvider = ({children})=>{
    const [resetEmail, setResetEmail] = useState('');

    return(
        <resetEmailPasswordContext.Provider value={[resetEmail, setResetEmail]}>
            {children}
        </resetEmailPasswordContext.Provider>
    )
}

const useResetEmail = ()=>useContext(resetEmailPasswordContext);

export {ResetPasswordWmailProvider, useResetEmail};