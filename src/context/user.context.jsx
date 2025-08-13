import { createContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
    userId: 1
});

export const UserContextProvider = ({children}) => {
    const [userId, setUserId] = useState(1)

    return <UserContext.Provider value={{userId, setUserId}}>
        {children}
    </UserContext.Provider>
}


