import { Dispatch, ReactNode } from "react";

export interface User {
    id: string;
    userName: string;
    email: string;
    token: string;
    imagePath: string;
  }
  
  export interface FriendRequest {
    status: string;
    creator: User;
  }
  
  export interface AuthContextProps {
    auth: User | null;
    setAuth: Dispatch<User>;
  }
  
  export interface AuthProviderProps {
    children: ReactNode;
  }
  

  
export interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FileInput {
  picture: FileList;
} 