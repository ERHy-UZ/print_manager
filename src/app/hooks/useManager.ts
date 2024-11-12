
import { useContext } from "react";
import { ManagerContext } from "@/context/ManagerContext";

export const useManager = () => {

    const context = useContext(ManagerContext)

    return context
}