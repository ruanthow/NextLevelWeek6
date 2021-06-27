import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";




interface User{
    id:string;
    name:string;
    photo:string
  }
  
interface AuthContextProps{
    user: User | undefined;
    singInWithGoogle: () => Promise<void>
    
  }
interface AuthContextProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)


export function AuthContextsProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<User>();
    
    useEffect(()=>{
      const unsubcribe = auth.onAuthStateChanged(user =>{
       if(user){
          const {displayName, photoURL, uid} = user
  
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google account')
          }
          setUser({
            id:uid,
            name:displayName,
            photo:photoURL
            
          })
      }
      })
      return () =>{
        unsubcribe()
      }
    },[])
    
    async function singInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider()
      
      const result = await auth.signInWithPopup(provider);
        
      if(result.user){
          const {displayName, photoURL, uid} = result.user
  
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google account')
          }
          setUser({
            id:uid,
            name:displayName,
            photo:photoURL
            
          })
      }
    }
    
    return(
        <AuthContext.Provider value={{user, singInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    );
}