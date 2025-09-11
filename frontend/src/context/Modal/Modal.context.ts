import type { ModalContextType } from "@/types/ui";
import { createContext } from "react";

export const ModalContext = createContext<ModalContextType | null>(null);
