import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    setDescription: Dispatch<SetStateAction<string>>,
    description: string
    type: "success" | "warning"| "error" | undefined;
    title: string;
    setTitle:Dispatch<SetStateAction<string>>;
    setType: Dispatch<SetStateAction<"success" | "warning"| "error" | undefined>>;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<"success" | "warning"| "error" | undefined>();

    return (
        <UserContext.Provider value={{setDescription, description, setType, setTitle, type, title }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;