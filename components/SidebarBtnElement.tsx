"use client"
import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
    const { icon:Icon, label } = formElement.designerBtnElelemnt;
    const draggable =  useDraggable({
        id:`designer-btn- ${formElement.type}`,
        data:{
            type:formElement.type,
            isDesignerBtnElement:true
        }

    })
    return (
       <Button
       ref={draggable.setNodeRef}
       variant="outline"
        className={cn("flex gap-2 flex-col h-[80px] w-[80px] curser-grab",
        draggable.isDragging && "ring-2 ring-primary")}
       {...draggable.listeners}
       {...draggable.attributes}
       >
        <Icon  className="h-8 w-8 text-primary cursor-grab" />
        <p className=" text-xs">{label}</p>
       </Button>
    )
}

export default SidebarBtnElement


export const SidebarBtnElementDragOverlay = ({ formElement }: { formElement: FormElement }) => {
    const { icon:Icon, label } = formElement.designerBtnElelemnt;
  
    
    return (
       <Button
     
       variant="outline"
        className="flex gap-2 flex-col h-[80px] w-[80px] curser-grab"
      
       >
        <Icon  className="h-8 w-8 text-primary cursor-grab" />
        <p className=" text-xs">{label}</p>
       </Button>
    )
}

