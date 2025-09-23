import type { UserDataContextType } from "@/types/ui";
import { createContext } from "react";

export const UserDataContext = createContext<UserDataContextType | null>(null);
