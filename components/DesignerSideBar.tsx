"use client"
import React from 'react'
import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'
import userDesigner from './hooks/userDesigner'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesSidebar from './PropertiesSidebar'

const DesignerSideBar = () => {
  const {elements, addElement, selectedElement, setSelectedElement} = userDesigner()
  return (
   <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
    {!selectedElement && <FormElementsSidebar />}
    {selectedElement && <PropertiesSidebar />}
   </aside>
  )
}

export default DesignerSideBar