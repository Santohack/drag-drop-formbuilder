"use client"

import React, { Dispatch, SetStateAction } from "react";
import { FormElementInstance } from "../FormElements"

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id:string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
    updateElement:(id:string,element:FormElementInstance) => void
}
export const DesignerContext = React.createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: React.ReactNode }) {
    const [elements, setElements] = React.useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = React.useState<FormElementInstance | null>(null);
    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        }); 
      
    }
    const removeElement = (id:string) => {
            
        setElements((prev) => prev.filter((element) => element.id !== id))
    }
    const updateElement = (id:string,element:FormElementInstance) =>{
        
        setElements((prev)=>{
            const newElements = [...prev];
            const index = newElements.findIndex((el) => el.id === id);
            newElements[index] = element;
            return newElements
        })
    }
    return (

        <DesignerContext.Provider value={{  updateElement,selectedElement, setSelectedElement,elements,removeElement, addElement }}>
            {children}
        </DesignerContext.Provider>
    )
}