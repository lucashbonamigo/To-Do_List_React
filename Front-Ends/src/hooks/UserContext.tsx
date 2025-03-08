import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const UserContext = createContext<UserContextType>({user: null, logged: false, setUser: ()=> null, setLogged: ()=>null});

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    user: String | null;
    setUser: Dispatch<SetStateAction<null>>;
    logged: boolean;
    setLogged: (logged: boolean) => void;
}

export const UserContextProvider = ({children}: UserContextProviderProps) =>{
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    return(
        <UserContext.Provider value={{user, setUser, logged, setLogged}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;