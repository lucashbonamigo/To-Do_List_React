import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Iresponse } from "../Interfaces/Interfaces";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    user: Iresponse|null;
    setUser: Dispatch<SetStateAction<Iresponse | null>>;
    logged: boolean;
    setLogged: (logged: boolean) => void;
}

export const UserContextProvider = ({children}: UserContextProviderProps) =>{
    const [user, setUser] = useState<Iresponse|null>(null);
    const [logged, setLogged] = useState(false);
    return(
        <UserContext.Provider value={{user, setUser, logged, setLogged}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;