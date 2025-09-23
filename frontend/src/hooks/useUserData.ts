import { UserDataContext } from "@/context/UserData/UserData.context"
import { createContext } from "react"

export const useUserData = () => {
  const context = createContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider component");
  }
  
  return context
}