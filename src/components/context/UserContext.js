  import React, { createContext, useContext, useState } from "react";

  const UserContext = createContext();

  export const useUserContext = () => {
    return useContext(UserContext);
  };

  export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    return (
      <UserContext.Provider value={{ users, setUsers }}>
        {children}
      </UserContext.Provider>
    );
  };
