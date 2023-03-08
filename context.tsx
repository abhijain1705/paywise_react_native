import React, { createContext, ReactNode } from 'react';
import { UserInterface } from './common/interfaces/interface';

type UserContextType = {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

type UserProviderProps = {
  children: ReactNode;
  user: UserInterface | null;
  setUser: () => {}
};

export const UserProvider: React.FC<UserProviderProps> = ({ children, user, setUser }) => {

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};